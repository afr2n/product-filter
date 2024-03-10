import Select, { OptionProps, components } from 'react-select'
import { SelectOptionType, MultiValueOptions } from '@/types/forms'
import { generateSlug } from '@/utils/helpers.ts'

type CustomSelectProps = {
  options: SelectOptionType[]
  onChange: (selectedOptions: SelectOptionType | MultiValueOptions) => void
  isMulti?: boolean
  value:
    | SelectOptionType
    | { label: string; value: string }
    | MultiValueOptions
    | string
  placeholder: string
  name: string
}

const CustomOption = (props: OptionProps<SelectOptionType>) => {
  const labelSlug = generateSlug(props.data.label)
  return (
    <components.Option {...props}>
      <div data-testid={`custom-option-${labelSlug}`}>
        <div {...props} />
      </div>
    </components.Option>
  )
}

const customComponents = {
  Option: CustomOption,
}

const CustomSelect = (props: CustomSelectProps) => {
  const { options, onChange, name, placeholder, value, isMulti } = props
  return (
    <Select
      // components={customComponents}
      placeholder={placeholder}
      name={name}
      isMulti={isMulti}
      value={value as SelectOptionType}
      className="w-48 mr-4"
      classNamePrefix="select"
      options={options}
      onChange={onChange as any}
    />
  )
}

export default CustomSelect
