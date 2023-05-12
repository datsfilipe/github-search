import fetch from 'node-fetch'

export { onBeforeRender }

// eslint-disable-next-line @typescript-eslint/require-await
async function onBeforeRender() {
  const pageProps = {
    repos: {}
  }

  return {
    pageContext: {
      pageProps,
    }
  }
}
