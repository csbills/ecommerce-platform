import { AppContext } from '~/contexts/AppContext'
import { useContext, Fragment } from 'react'
import { CaretDown, Plus, User } from '@phosphor-icons/react'
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import Image from 'next/image'

export function SelectMerchantButton() {
  const { selectMerchant, selectedMerchant, merchants } = useContext(AppContext)
  return (
    <>
      <Menu as="div" className="relative">
        <Menu.Button className="flex py-5 bg-slate-200 w-full space-x-4 mb-5 items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex flex-shrink-0 items-cente">
              {selectedMerchant?.logo ? (
                <Image
                  src={selectedMerchant.logo}
                  alt="logo"
                  width={24}
                  height={24}
                  quality={100}
                />
              ) : (
                <User size={24} />
              )}
            </div>

            <div className="flex flex-col items-start">
              <span className="text-gray-700 text-sm font-bold">
                {selectedMerchant?.name}
              </span>
              <span className="text-gray-500 text-sm">Free</span>
            </div>
          </div>

          <CaretDown size={16} />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute -right-[125%] top-1/4 z-10 w-64 origin-top-right rounded-md bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {merchants?.map((merchant) => {
              if (merchant.id !== selectedMerchant?.id) {
                return (
                  <Menu.Item key={merchant.id}>
                    <div
                      className="flex space-x-2 items-center border-b h-14 px-4 hover:bg-white cursor-pointer w-64"
                      onClick={() => selectMerchant(merchant)}
                    >
                      {merchant?.logo ? (
                        <Image
                          src={merchant.logo}
                          alt="logo"
                          width={24}
                          height={24}
                          quality={100}
                        />
                      ) : (
                        <User size={24} />
                      )}
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-700">
                          {merchant.name}
                        </span>
                        <span className="text-[10px] text-gray-500">
                          #{merchant.id}
                        </span>
                      </div>
                    </div>
                  </Menu.Item>
                )
              }
            })}
            <Menu.Item>
              <Link
                href={'/merchant/create'}
                className="flex space-x-2 items-center h-14 px-4 hover:bg-white cursor-pointer"
              >
                <div className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center">
                  <Plus size={12} />
                </div>
                <span className="text-xs uppercase text-gray-700">
                  Criar nova Loja
                </span>
              </Link>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}
