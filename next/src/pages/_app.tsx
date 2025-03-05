import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import CurrentUserFetch from '@/components/CurrentUserFetch'
import Header from '@/components/Header'
import { NotificationProvider } from '@/components/NotificationContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NotificationProvider>
        <CurrentUserFetch />
        <Header />
        <Component {...pageProps} />
      </NotificationProvider>
    </>
  )
}
