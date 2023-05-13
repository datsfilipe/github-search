import React from 'react'
import { PageContextProvider } from '@/renderer/usePageContext'
import type { PageContext } from '@/renderer/types'
import { Toaster } from 'react-hot-toast'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './global.css'

export { Layout }

function Layout({ children, pageContext }: { children: React.ReactNode; pageContext: PageContext }) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <main className="flex flex-col items-center justify-center min-h-screen p-4">
          <Toaster/>
          {children}
        </main>
      </PageContextProvider>
    </React.StrictMode>
  )
}
