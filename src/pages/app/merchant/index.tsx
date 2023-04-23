import Layout from '@/components/app/Layout'
import { useContext } from 'react'
import { AppContext } from 'contexts/AppContext'
import { Details } from '@/components/app/MerchantDetailsForm/Details'
import { Currency } from '@/components/app/MerchantDetailsForm/Currency'
import { LogoUpload } from '@/components/app/MerchantDetailsForm/LogoUpload'

export default function Merchant() {
  const { selectedMerchant } = useContext(AppContext)
  return (
    <Layout>
      <main className="p-5">
        <div className="grid grid-cols-3 gap-5 border-zinc-300">
          {/* Detalhes do comerciante bloco */}
          <Details />
          <LogoUpload />
          <Currency />
          <div className="flex bg-white p-5 flex-col space-y-2 rounded-lg">
            <h2 className="text-zinc-700 text-sm">ID DO COMERCIANTE</h2>
            <div className="flex py-2 px-4 bg-zinc-100 rounded border border-zinc-300 justify-between">
              <span>#{selectedMerchant?.id}</span>
              <button className="bg-black text-white text-[10px] px-2 py-1 rounded-full">
                COPIAR
              </button>
            </div>
            <p className="text-[10px] text-zinc-500">
              Este é o seu ID de comerciante exclusivo. Podemos solicitá-lo
              quando você entrar em contato conosco.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  )
}
