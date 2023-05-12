import React from 'react'
import { PageContextProvider } from '@/renderer/usePageContext'
import type { PageContext } from '@/renderer/types'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './global.css'

export { Layout }

function Layout({ children, pageContext }: { children: React.ReactNode; pageContext: PageContext }) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        {children}
      </PageContextProvider>
    </React.StrictMode>
  )
}
