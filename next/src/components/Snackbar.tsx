import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSnackbarState } from '@/hooks/useGlobalState'

const SuccessSnackbar = () => {
  const router = useRouter()
  const [snackbar] = useSnackbarState()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (snackbar.pathname === router.pathname && snackbar.message) {
      setOpen(true)
      setTimeout(() => setOpen(false), 3000)
    }
  }, [snackbar, router])

  // DaisyUI の `toast` 風の `alert` クラスを設定
  const getAlertClass = (severity: string | null) => {
    switch (severity) {
      case 'success':
        return 'alert alert-success'
      case 'error':
        return 'alert alert-error'
    }
  }

  return (
    <div className="toast toast-end z-50">
      {snackbar.severity && open && (
        <div
          className={`${getAlertClass(snackbar.severity)} flex justify-between items-center shadow-lg p-4`}
        >
          <span>{snackbar.message}</span>
        </div>
      )}
    </div>
  )
}

export default SuccessSnackbar
