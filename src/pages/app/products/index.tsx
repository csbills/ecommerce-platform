import { useContext, useEffect, useState } from 'react'
import { Block } from '@tremor/react'
import type { Product } from '@prisma/client'
import { AppContext } from '~/contexts/AppContext'
import Layout from '~/components/app/Layout'
import ProductsTable from '~/components/app/ProductsTable'
import { api } from '~/utils/api'

export default function Products() {
  const { selectedMerchant } = useContext(AppContext)
  const [products, setProducts] = useState<Product[]>()

  const { mutate, data } = api.products.getAll.useMutation({
    onSuccess: () => { 
      setProducts(data)
    }
  })

  useEffect(() => {
    if (selectedMerchant && !products) {
      mutate({ merchantId: selectedMerchant.id })
    }
  }, [selectedMerchant])

  if (selectedMerchant && !products) {
    
    if (data) {
      setProducts(data)
    }
  }

  return (
    <Layout>
      <main className="p-5">
        <Block marginTop="mt-6">
          {products && <ProductsTable products={products} />}
        </Block>
      </main>
    </Layout>
  )
}
