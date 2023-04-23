import { HttpMethod } from '@/types'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRef } from 'react'

export default function CreateMerchant() {
  const router = useRouter()
  const session = useSession()
  const user = session.data?.user

  const merchantNameRef = useRef<HTMLInputElement | null>(null)
  const merchantDescriptionRef = useRef<HTMLInputElement | null>(null)

  async function handleCreateMerchant() {
    try {
      const res = await fetch('/api/merchant', {
        method: HttpMethod.POST,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: merchantNameRef.current?.value,
          description: merchantDescriptionRef.current?.value,
          subdomain: merchantNameRef.current?.value
            .replace(' ', '-')
            .toLowerCase(),
          userId: user?.id,
        }),
      })

      if (res.ok) {
        router.push('/')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <main className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            SkyBuy
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Crie sua loja
              </h1>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    value={user?.email || ''}
                    disabled
                    type="email"
                    name="email"
                    id="email"
                    className="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="merchant-name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nome da Loja
                  </label>
                  <input
                    ref={merchantNameRef}
                    type="text"
                    id="merchant-name"
                    placeholder="SkyBuy Store"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="merchant-description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Descrição da Loja
                  </label>
                  <input
                    ref={merchantDescriptionRef}
                    type="text"
                    id="merchant-description"
                    placeholder="descrição"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{' '}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  onClick={() => handleCreateMerchant()}
                  className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Criar
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
