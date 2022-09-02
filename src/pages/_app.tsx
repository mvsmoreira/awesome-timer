import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { GlobalStyle } from '../styles/global'
import { theme } from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default MyApp
