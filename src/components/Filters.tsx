import { useState, useMemo } from 'react'
import dataStore from '../datastore'
import {
  getPropertyTypesForOperator,
  getValueInputForOperator,
} from '@/utils/helpers'
import {
  PropertyValue,
  Property,
  Operator,
  Product,
  OperatorWithValidTypes,
} from '../types/product'
import { productFilterSchema, ProductFilterSchema } from '@/schema/product'
import { useFormWithSchema } from '@/utils/forms'
import CustomSelect from '@/components/Forms/CustomSelect'
import CustomInput from '@/components/Forms/CustomInput'
import CustomButton from '@/components/Forms/CustomButton'
import { SelectOptionType, MultiValueOptions } from 'src/types/forms'

type FiltersProps = {
  setProductList: (arg0: Product[]) => void
}

type Timeout = ReturnType<typeof setTimeout>

const Filters = (props: FiltersProps) => {
  const { setProductList } = props
  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    reset,
    formState: {},
  } = useFormWithSchema(productFilterSchema)
  const formValues = getValues()
  const [timer, setTimer] = useState<Timeout>()
  const [forceRerender, setForceRerender] = useState(false)

  const memoizedDataStoreOperators = useMemo(() => {
    return dataStore.getOperators().map((operator: Operator) => {
      const validPropertyType = getPropertyTypesForOperator(operator.id)
      const validValueInput = getValueInputForOperator(operator.id)
      return {
        ...operator,
        validPropertyType,
        validValueInput,
      }
    })
  }, []) // Empty dependency array indicates that the memoized value should only be recalculated once

  const [operatorOptions, setOperatorOptions] = useState<SelectOptionType[]>([])
  const [valueOptions, setValueOptions] = useState<SelectOptionType[]>([])
  const [validValueInputType, setValidValueInputType] = useState<string>('')
  const [selectedValues, setSelectedValues] = useState<MultiValueOptions>([])

  const memoizedPropertiesOptions = useMemo(() => {
    return dataStore.getProperties().map((property: Property) => {
      return {
        label: property.name,
        value: property.id,
        type: property.type,
      }
    })
  }, []) // Empty dependency array indicates that the memoized value should only be recalculated once

  const getValidOperators = (propertyType: string) => {
    const filteredOperators = memoizedDataStoreOperators.filter(
      (operator: OperatorWithValidTypes) =>
        operator?.validPropertyType.includes(propertyType)
    )
    const options = filteredOperators.map(
      (operator: OperatorWithValidTypes) => {
        return {
          label: operator.text,
          value: operator.id,
          validValueInput: operator.validValueInput,
        }
      }
    )
    setOperatorOptions(options)
    setSelectedValues([])
    setValidValueInputType('')
  }

  const getValidValues = (operator: SelectOptionType) => {
    if (operator.validValueInput === 'multiSelect') {
      const products = dataStore.getProducts()
      const propValues = new Set()
      products.forEach((product: Product) => {
        const categoryProperty = product.property_values.find(
          (property: PropertyValue) =>
            property.property_id === formValues.property
        )
        if (categoryProperty && categoryProperty.value !== '') {
          propValues.add(categoryProperty.value)
        }
      })
      const propValuesOptions = Array.from(propValues).map((item) => {
        return {
          label: item,
          value: item,
        }
      })
      setValueOptions(propValuesOptions as SelectOptionType[])
    } else if (operator.validValueInput === 'noValueInput') {
      const updatedFormValues = formValues
      updatedFormValues['propertyValue'] = ''
      updatedFormValues['operator'] = operator.value
      setTimeout(() => {
        handleProductFilter(updatedFormValues)
      }, 100)
    }
  }

  const handleMultiSelect = (data: MultiValueOptions) => {
    if (data.length) {
      const selectedVals = data.map((item) => item?.value)
      clearTimeout(timer)
      const newTimer = setTimeout(() => {
        const updatedFormValues = formValues
        updatedFormValues['propertyValue'] = selectedVals
        handleProductFilter(updatedFormValues)
      }, 1000)

      setTimer(newTimer)
      setValue('propertyValue', selectedVals)
      setSelectedValues(data)
    }
  }

  const handleChange = (
    id: 'property' | 'operator',
    data: SelectOptionType
  ) => {
    setValue(id, data.value)
    if (id === 'property' && data.type) {
      setValue('operator', '')
      setValue('propertyValue', '')
      setValue('propertyType', data.type)
      getValidOperators(data.type)
      setForceRerender(!forceRerender)
    } else if (id === 'operator' && data.validValueInput) {
      setValue('propertyValue', '')
      getValidValues(data)
      const newValueInput = data.validValueInput
      setValidValueInputType(newValueInput)
      setForceRerender(!forceRerender)
    }
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer)
    const newTimer = setTimeout(() => {
      const updatedFormValues = formValues
      updatedFormValues['propertyValue'] = e.target.value
      handleProductFilter(updatedFormValues)
    }, 1000)

    setTimer(newTimer)
  }

  const renderValidValueInput = (
    validInput: string,
    valueOptions: SelectOptionType[]
  ) => {
    if (validInput === 'input') {
      return (
        <div data-testid="value-input">
          <CustomInput
            register={register}
            fieldName="propertyValue"
            onChangeInput={onChangeInput}
            placeholder={'Enter Value'}
          />
        </div>
      )
    } else if (validInput === 'multiSelect') {
      return (
        <div data-testid="value-select">
          <CustomSelect
            name="value"
            placeholder="Select Value"
            isMulti
            value={selectedValues}
            options={valueOptions}
            onChange={handleMultiSelect as any}
          />
        </div>
      )
    } else {
      return null // can handle other cases if needed
    }
  }

  const clearFilter = () => {
    setValidValueInputType('')
    setValueOptions([])
    setOperatorOptions([])
    setProductList(dataStore.getProducts())
    reset()
  }

  const filterProducts = (
    propertyId: number,
    operatorId: string,
    value: string | string[]
  ) => {
    return dataStore.getProducts().filter((product: Product) => {
      // Find the property value object with the specified property ID
      const propertyValue = product.property_values.find(
        (prop: PropertyValue) => prop.property_id === propertyId
      )

      // Apply the filtering logic based on the operator
      switch (operatorId) {
        case 'equals':
          return propertyValue?.value == value
        case 'greater_than':
          return Number(propertyValue?.value) > Number(value)
        case 'less_than':
          return Number(propertyValue?.value) < Number(value)
        case 'any':
          return !!propertyValue?.value // Any value matches
        case 'none':
          return propertyValue === undefined // No value matches
        case 'in':
          return propertyValue?.value
            ? value.includes(propertyValue?.value)
            : false // Check if the value array includes the property value
        case 'contains':
          if (Array.isArray(value)) {
            // Check if any of the values in the array match (case-insensitive)
            return value.some((item) => {
              // Check if propertyValue.value is a string
              if (typeof propertyValue?.value === 'string') {
                // Perform case-insensitive comparison
                return item.toLowerCase() === propertyValue.value.toLowerCase()
              }
              return false // Handle case where propertyValue.value is not a string
            })
          } else {
            // If value is not an array, treat it as a single string
            // Check if propertyValue.value is a string
            if (typeof propertyValue?.value === 'string') {
              // Perform case-insensitive containment check
              return propertyValue.value
                .toLowerCase()
                .includes(value.toLowerCase())
            }
            return false // Handle case where propertyValue.value is not a string
          }
        default:
          return false // Unsupported operator
      }
    })
  }

  const handleProductFilter = (data: ProductFilterSchema) => {
    console.log('handleSubmit', data)
    const filteredProducts = filterProducts(
      data.property,
      data.operator,
      data.propertyValue as string | string[]
    )
    console.log('filteredProducts', filteredProducts)
    setProductList(filteredProducts)
  }

  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit((data) => handleProductFilter(data))}
    >
      <div className="bg-gray-600 container mx-auto p-4 flex items-center justify-between">
        <div className="flex flex-md-nowrap flex-wrap ">
          <div data-testid="property-select" className="mb-2">
            <CustomSelect
              name="property"
              placeholder="Select Property"
              options={memoizedPropertiesOptions}
              value={
                memoizedPropertiesOptions.find(
                  (i: PropertyValue) =>
                    parseInt(i.value) === formValues.property
                ) || ''
              }
              onChange={(data) =>
                handleChange('property', data as SelectOptionType)
              }
            />
          </div>
          {operatorOptions?.length ? (
            <div data-testid="operator-select" className="mb-2">
              <CustomSelect
                name="operator"
                placeholder="Select Operator"
                options={operatorOptions}
                value={
                  operatorOptions.find(
                    (i: SelectOptionType) => i.value === formValues.operator
                  ) || ''
                }
                onChange={(data) =>
                  data && handleChange('operator', data as SelectOptionType)
                }
              />
            </div>
          ) : null}
          {renderValidValueInput(validValueInputType, valueOptions)}
        </div>
        <div>
          <CustomButton dataTestId='clear-filter' type="button" onClick={clearFilter} btnText="Clear" />
        </div>
      </div>
    </form>
  )
}

export default Filters
