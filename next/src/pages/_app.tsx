import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import CurrentUserFetch from '@/components/CurrentUserFetch'
import Header from '@/components/Header'
import Snackbar from '@/components/Snackbar'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CurrentUserFetch />
      <Header />
      <Snackbar />
      <Component {...pageProps} />
    </>
  )
}
