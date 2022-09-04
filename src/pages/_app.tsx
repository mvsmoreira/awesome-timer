import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { CyclesContextProvider } from '../contexts/CyclesContext'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { GlobalStyle } from '../styles/global'
import { theme } from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CyclesContextProvider>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </CyclesContextProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default MyApp
