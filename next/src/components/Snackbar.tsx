import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSnackbarState } from '@/hooks/useGlobalState'

const SuccessSnackbar = () => {
  const router = useRouter()
  const [snackbar, setSnackbar] = useSnackbarState()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (snackbar.pathname == router.pathname) {
      setOpen(true)
    }
    setTimeout(() => setOpen(false), 3000)
  }, [snackbar, router])

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
    setSnackbar({ message: null, severity: null, pathname: null })
  }

  const getAlertClass = (severity: string | null) => {
    switch (severity) {
      case 'success':
        return 'alert alert-success'
      case 'error':
        return 'alert alert-error'
    }
  }

  return (
    <>
      {snackbar.severity && open && (
        <div
          className={`fixed bottom-5 right-5 z-50 ${getAlertClass(snackbar.severity)} shadow-lg`}
        >
          <div className="flex items-center justify-between w-full p-3">
            <span>{snackbar.message}</span>
            <button onClick={handleClose} className="btn btn-sm btn-ghost ml-4">
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default SuccessSnackbar
