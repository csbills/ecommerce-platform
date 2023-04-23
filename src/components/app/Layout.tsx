import Head from 'next/head'
import React, { ReactNode } from 'react'
import ResponsiveAppBar from './ResponsiveAppBar'
import { Sidenav } from './Sidenav'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const title = 'Dashboard - SkyBuy'
  const description =
    'Create a fullstack application with multi-tenancy and custom domains support using Next.js, Prisma, and PostgreSQL'
  const logo = '/favicon.ico'

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href={logo} />
        <link rel="shortcut icon" type="image/x-icon" href={logo} />
        <link rel="apple-touch-icon" sizes="180x180" href={logo} />
        <meta name="theme-color" content="#7b46f6" />

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={description} />
        <meta itemProp="image" content={logo} />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={logo} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Vercel" />
        <meta name="twitter:creator" content="@StevenTey" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={logo} />
      </Head>

      <div className="bg-zinc-50 min-h-screen">
        <ResponsiveAppBar />
        <Sidenav />
        <div className="pl-64 mt-[68.5px]">{children}</div>
      </div>
    </>
  )
}
