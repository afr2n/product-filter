import dataStore from '../datastore'
import { Property, Product, PropertyValue } from '@/types/product'

type ProductListProps = {
  productsList: Product[]
}

const ProductList = (props: ProductListProps) => {
  const { productsList } = props
  const propertiesList: Property[] = dataStore.getProperties()

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md container mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-accent-1 uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {propertiesList.map((property: Property) => (
                <th
                  key={property.id}
                  className="px-6 py-3 text-white uppercase"
                >
                  {property.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {productsList.length === 0 ? (
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4" colSpan={propertiesList.length}>
                  <b>No products to display</b>
                </td>
              </tr>
            ) : (
              productsList.map((product: Product) => (
                <tr
                  key={product.id}
                  data-testid="product-item"
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  {propertiesList.map((property: Property) => {
                    const propertyValue = product.property_values.find(
                      (pv: PropertyValue) => pv.property_id === property.id
                    )
                    return (
                      <td key={property.id} className="px-6 py-4 capitalize">
                        {propertyValue ? propertyValue.value : ''}
                      </td>
                    )
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductList
