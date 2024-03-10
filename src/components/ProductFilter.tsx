import { useState } from 'react'
import dataStore from '../datastore'
import Filters from '@/components/Filters'
import ProductList from '@/components/ProductList'
import { Product } from '@/types/product'

const ProductFilter = () => {
  const [productsList, setProductList] = useState<Product[]>(
    dataStore.getProducts()
  )

  return (
    <div className="bg-gray-200 dark:bg-gray-500 flex justify-center items-center flex-grow">
      <div className="w-full">
        <Filters setProductList={setProductList} />
        <ProductList productsList={productsList} />
      </div>
    </div>
  )
}

export default ProductFilter
