import {
  Card,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  Title,
  Text,
  Button,
} from '@tremor/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import type { Product } from '@prisma/client'
import { Plus } from '@phosphor-icons/react'

interface ProductsTableProps {
  products: Array<Product>
}

export default function ProductsTable({ products }: ProductsTableProps) {
  const router = useRouter()
  return (
    <Card>
      <div className="flex items-center w-full justify-between">
        <div className="space-y-0.5">
          <Title>Produtos</Title>
          <Text>Adicione produtos a sua loja</Text>
        </div>
        <Button icon={Plus} onClick={() => router.push('/products/create')}>
          Criar produto
        </Button>
      </div>
      <Table marginTop="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Produto</TableHeaderCell>
            <TableHeaderCell textAlignment="text-center">
              Preço (R$)
            </TableHeaderCell>
            <TableHeaderCell textAlignment="text-center">
              Estoque
            </TableHeaderCell>
            <TableHeaderCell textAlignment="text-center">
              Vendas
            </TableHeaderCell>
            <TableHeaderCell textAlignment="text-center">
              Vendas (R$)
            </TableHeaderCell>
            <TableHeaderCell textAlignment="text-center">
              Status
            </TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="flex items-center space-x-2">
                  {product.image && (
                    <Image
                      src={product.image}
                      alt="Product Image"
                      width={48}
                      height={48}
                      quality={100}
                    />
                  )}
                  <span>{product.title}</span>
                </div>
              </TableCell>
              <TableCell textAlignment="text-center">{product.price}</TableCell>
              <TableCell textAlignment="text-center">3</TableCell>
              <TableCell textAlignment="text-center">12</TableCell>
              <TableCell textAlignment="text-center">
                {product.price * 3}
              </TableCell>
              <TableCell>
                <div className="flex justify-center">
                  {product.active ? (
                    <div className="bg-green-200 flex rounded px-2 py-1 items-center space-x-2">
                      <div className="rounded-full w-3 h-3 bg-green-500" />
                      <span className="text-xs text-green-700">Ativo</span>
                    </div>
                  ) : (
                    <div className="bg-red-200 flex rounded px-2 py-1 items-center space-x-2">
                      <div className="rounded-full w-3 h-3 bg-red-500" />
                      <span className="text-xs text-red-700">Inativo</span>
                    </div>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
