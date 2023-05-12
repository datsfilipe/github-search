export { render }

import { hydrateRoot } from 'react-dom/client'
import { Layout } from '@/Layout'
import type { PageContextClient } from '@/renderer/types'

// eslint-disable-next-line @typescript-eslint/require-await
async function render(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext
  if (!Page) throw new Error('Client-side render() hook expects pageContext.Page to be defined')
  hydrateRoot(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById('page-view')!,
    <Layout pageContext={pageContext}>
      <Page {...pageProps} />
    </Layout>
  )
}
