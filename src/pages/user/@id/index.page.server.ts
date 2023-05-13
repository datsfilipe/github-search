import { type PageContext } from '@/renderer/types'
import fetch from 'node-fetch'

export { onBeforeRender }

async function onBeforeRender(pageContext: PageContext) {
  const id = pageContext.routeParams?.id as string 
  const user = await fetch(`https://api.github.com/user/${id}`).then(res => res.json()) as GhUser

  const pageProps = {
    user
  }

  return {
    pageContext: {
      pageProps,
    }
  }
}
