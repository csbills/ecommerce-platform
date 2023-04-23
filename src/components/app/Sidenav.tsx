import Link from 'next/link'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Receipt, Storefront, Tag, Users } from '@phosphor-icons/react'
import { Fragment } from 'react'
import { SelectMerchantButton } from './SelectMerchantButton'
import { Menu, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { CustomersIcon, OrdersIcon, OverviewIcon, ProductsIcon } from 'public/icons'

export function Sidenav() {
  const session = useSession()
  const user = session.data?.user
  const router = useRouter()

  const linkActive = router.pathname.split('/app/')

  const activeClass =
    'text-[#12b76a]'

  const inactiveClass =
    'text-[#101828]'

  return (
    <div className="fixed z-20 left-0 top-[68.5px] bottom-0 w-64 bg-white">
      <div className="flex flex-col px-5 w-full text-gray-700 justify-between h-full pb-5">
        <div className="flex flex-col space-y-2">
          <Link
            href="/"
            className='text-[#98a2b3] flex space-x-2 items-center rounded-full p-2'
          >
            <OverviewIcon />
            <span
              className={
                linkActive[1] === '/' ? activeClass : inactiveClass
              }>
              Overview
            </span>
          </Link>

          <Link href="/products" className='text-[#98a2b3] flex space-x-2 items-center rounded-full p-2'>
            <ProductsIcon />
            <span
              className={
                linkActive[1]?.includes('products') ? activeClass : inactiveClass
              }>
              Produtos
            </span>
          </Link>

          <Link href="/orders" className='text-[#98a2b3] flex space-x-2 items-center rounded-full p-2'>
            <OrdersIcon />
            <span
              className={
                linkActive[1]?.includes('pedidos') ? activeClass : inactiveClass
              }>
              Pedidos
            </span>
          </Link>

          <Link
            href="/costumers"
            className='text-[#98a2b3] flex space-x-2 items-center rounded-full p-2'
          >
            <CustomersIcon />
            <span
              className={
                linkActive[1]?.includes('customers') ? activeClass : inactiveClass
              }>
              Clientes
            </span>
          </Link>

          <Link
            href="/discounts"
            className="flex space-x-2 text-gray-500 items-center rounded-l-full p-2"
          >
            <Tag size={20} />
            <span>Descontos</span>
          </Link>

          <Link
            href="/merchant"
            className={
              linkActive[1]?.includes('merchant') ? activeClass : inactiveClass
            }
          >
            <Storefront size={20} />
            <span>Minha Loja</span>
          </Link>
        </div>

        <Menu as="div" className="relative">
          <div>
            <Menu.Button className="flex items-center text-sm">
              <span className="sr-only">Open user menu</span>
              <Image
                className="h-8 w-8 rounded-full"
                src={user?.image || 'https://avatar.vercel.sh/leerob'}
                height={32}
                width={32}
                alt={`${user?.name || 'placeholder'} avatar`}
              />
              <div className="flex flex-col justify-start items-start">
                <span className="font-bold text-sm text-gray-700 ml-2">
                  {user?.name}
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  {user?.email}
                </span>
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute -right-48 z-10 -mt-10 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {user ? (
                <Menu.Item>
                  {({ active }) => (
                    <>
                      <button
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'flex w-full px-4 py-2 text-sm text-gray-700',
                        )}
                        onClick={() => signOut()}
                      >
                        Sign out
                      </button>
                    </>
                  )}
                </Menu.Item>
              ) : (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'flex w-full px-4 py-2 text-sm text-gray-700',
                      )}
                      onClick={() => signIn('github')}
                    >
                      Sign in
                    </button>
                  )}
                </Menu.Item>
              )}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  )
}
