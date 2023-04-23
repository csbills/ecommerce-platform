import { useContext, useRef, useState } from 'react'
import Image from 'next/image'
import { api } from '~/utils/api'
import Layout from '~/components/app/Layout'
import { AppContext } from '~/contexts/AppContext'
import { Alert, Breadcrumbs, Button, Divider, FormControlLabel, Snackbar, Switch, TextField, Typography } from '@mui/material'
import MultipleSelectCheckmarks from '~/components/app/MultipleSelectCheckmarks'
import Link from 'next/link'

export default function CreateProduct() {
  const { selectedMerchant } = useContext(AppContext)
  const [images, setImages] = useState<string[]>([])

  const productNameRef = useRef<HTMLInputElement | null>(null)
  const productDescriptionRef = useRef<HTMLTextAreaElement | null>(null)
  const productPriceRef = useRef<HTMLInputElement | null>(null)

  const { isLoading, mutate } = api.products.create.useMutation({
    onSuccess: () => { }
  })

  function handleCreateProduct() {
    if (productNameRef.current?.value && productPriceRef.current?.value && selectedMerchant) {
      mutate({
        title: productNameRef.current?.value,
        price: parseFloat(productPriceRef.current?.value),
        description: productDescriptionRef.current?.value,
        active: true,
        image: '',
        merchantId: selectedMerchant.id
      })
    }
  }

  return (
    <Layout>
      <Snackbar open={false} autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
      <main className="p-5 grid grid-cols-3 gap-5 relative">
        <div className='col-span-3'>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/products">
              Produtos
            </Link>
            <Typography color="text.primary">Adicionar Produto</Typography>
          </Breadcrumbs>
        </div>
        <div className='col-span-2 flex flex-col space-y-5'>
          <div className='bg-white grid grid-cols-2 p-5 gap-5 rounded-lg shadow'>
            <Typography variant="overline">
              Produto e Estoque
            </Typography>
            <TextField
              id="product-name"
              label="Nome do Produto"
              variant="outlined"
              fullWidth
              size='small'
              ref={productNameRef}
              className='col-span-2'
              required
            />

            <TextField
              id="product-sku"
              label="SKU"
              variant="outlined"
              fullWidth
              size='small'
              helperText="SKU é um código que você cria internamente para ter o controle dos seus produtos com variações."
            />

            <TextField
              id="product-codigo-barra"
              label="Código de Barras"
              variant="outlined"
              fullWidth
              size='small'
              helperText="SKU é um código que você cria internamente para ter o controle dos seus produtos com variações."
            />

            <TextField
              id="product-codigo-barra"
              label="Descrição"
              variant="outlined"
              fullWidth
              multiline
              size='small'
              className='col-span-2'
              minRows={5}
            />
          </div>

          <div className='bg-white grid grid-cols-2 p-5 gap-5 rounded-lg shadow'>
            <Typography variant="overline">
              Preço
            </Typography>
            <TextField
              id="product-price"
              label="Preço"
              variant="outlined"
              fullWidth
              size='small'
              ref={productPriceRef}
              required
              className='col-span-2'
            />
          </div>

          <div className='bg-white grid grid-cols-2 p-5 gap-5 rounded-lg shadow'>
            <Typography variant="overline">
              Galeria de Imagens
            </Typography>
            <div className="flex col-span-2 items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Enviar imagens</span> ou
                    arraste e solte
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG e GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  accept="image/*"
                  multiple
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={() => { }}
                />
              </label>
            </div>
          </div>
        </div>

        <div className='col-span-1 relative'>
          <div className='flex flex-col space-y-5 fixed'>
            <div className='p-5 w-full bg-white rounded-lg shadow flex flex-col space-y-4'>
              <Button variant="contained" color='success' className='bg-green-700'>
                Salvar mudanças
              </Button>
              <Divider />
              <FormControlLabel control={<Switch />} label="Ativado" />
            </div>

            <div className='p-5 w-full bg-white rounded-lg shadow flex flex-col'>
              <Typography variant="overline">
                CATEGORIAS
              </Typography>
              <MultipleSelectCheckmarks />
            </div>

            <div className='p-5 w-full bg-white rounded-lg shadow flex flex-col'>
              <Typography variant="overline">
                PRODUTOS RELACIONADOS
              </Typography>
              <MultipleSelectCheckmarks />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
