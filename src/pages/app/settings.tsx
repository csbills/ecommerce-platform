import toast from 'react-hot-toast'
import { HttpMethod } from '@/types'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Loader from '@/components/app/Loader'

export default function AppSettings() {
  const { data: session } = useSession()

  const [saving, setSaving] = useState<boolean>(false)
  const [data, setData] = useState<any | null>(null)

  useEffect(() => {
    if (session)
      setData({
        ...session.user,
      })
  }, [session])

  async function saveSettings(data: any | null) {
    setSaving(true)
    const response = await fetch('/api/save-settings', {
      method: HttpMethod.POST,
      body: JSON.stringify({
        ...data,
      }),
    })
    if (response.ok) {
      setSaving(false)
      toast.success(`Changes Saved`)
    }
  }

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-10 sm:px-20 mt-10 mb-16">
        <h1 className="font-cal text-5xl mb-12">Settings</h1>
        <div className="mb-28 flex flex-col space-y-12">
          <div className="space-y-6">
            <h2 className="font-cal text-2xl">Name</h2>
            <div className="border border-gray-700 rounded-lg flex items-center max-w-lg overflow-hidden">
              <input
                className="w-full px-5 py-3 font-cal text-gray-700 bg-white border-none focus:outline-none focus:ring-0 rounded-lg placeholder-gray-400"
                type="text"
                name="name"
                placeholder="Your awesome name"
                value={data?.name || ''}
                onInput={(e) =>
                  setData({
                    ...data,
                    name: (e.target as HTMLTextAreaElement).value,
                  })
                }
              />
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="font-cal text-2xl">Email</h2>
            <div className="border border-gray-700 rounded-lg flex items-center max-w-lg overflow-hidden">
              <input
                className="w-full px-5 py-3 font-cal text-gray-700 bg-white border-none focus:outline-none focus:ring-0 rounded-lg placeholder-gray-400"
                type="email"
                name="email"
                placeholder="panic@thedis.co"
                value={data?.email || ''}
                onInput={(e) =>
                  setData({
                    ...data,
                    email: (e.target as HTMLTextAreaElement).value,
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-6">
            <form
              action="/api/stripe/create-checkout-session"
              method={HttpMethod.POST}
            >
              <input
                type="hidden"
                name="lookup_key"
                value={'price_1MloezFmt9GEeEyVDgcYGEL7'}
              />
              <button type="submit">Subscription</button>
            </form>

            <form
              action="/api/stripe/create-portal-session"
              method={HttpMethod.POST}
            >
              <input
                type="hidden"
                id="session-id"
                name="session_id"
                value={
                  'cs_test_a16HaKR0J7ikbQd2yAZRv6w2EAWNb1j5ebYBGr180jSMdp3kUGkXz2lBTA'
                }
              />
              <button type="submit">Manage your billing information</button>
            </form>
          </div>
        </div>
      </div>
      <footer className="h-20 z-20 fixed bottom-0 inset-x-0 border-solid border-t border-gray-500 bg-white">
        <div className="max-w-screen-xl mx-auto px-10 sm:px-20 h-full flex justify-end items-center">
          <button
            onClick={() => {
              saveSettings(data)
            }}
            disabled={saving}
            className={`${
              saving
                ? 'cursor-not-allowed bg-gray-300 border-gray-300'
                : 'bg-black hover:bg-white hover:text-black border-black'
            } mx-2 w-36 h-12 text-lg text-white border-2 focus:outline-none transition-all ease-in-out duration-150`}
          >
            {saving ? <Loader /> : 'Save Changes'}
          </button>
        </div>
      </footer>
    </>
  )
}
