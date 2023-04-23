import type { Merchant } from '@prisma/client'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '~/utils/api'

interface AppContextProviderProps {
  children: ReactNode
}

interface AppContextProps {
  merchants?: Merchant[]
  selectedMerchant?: Merchant
  selectMerchant: (merchant: Merchant) => void
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps)

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant>()

  const { data: merchants } = api.merchants.getAll.useQuery()

  useEffect(() => {
    if (merchants) {
      setSelectedMerchant(merchants[0])
    }
  }, [merchants])

  function selectMerchant(merchant: Merchant) {
    if (merchant) {
      setSelectedMerchant(merchant)
    }
  }

  return (
    <AppContext.Provider
      value={{
        merchants,
        selectedMerchant,
        selectMerchant,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
