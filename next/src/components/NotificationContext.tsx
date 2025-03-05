import { createContext, useContext, useState } from 'react'

type NotificationContextType = {
  showNotification: (message: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
)

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [message, setMessage] = useState<string | null>(null)

  const showNotification = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(null), 3000) // 3秒後に消える
  }

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {message && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded shadow">
          {message}
        </div>
      )}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider',
    )
  }
  return context
}

export default NotificationContext
