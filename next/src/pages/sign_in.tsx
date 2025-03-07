import axios, { AxiosResponse, AxiosError } from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
//import { useNotification } from '@/components/NotificationContext'
import { useUserState, useSnackbarState } from '@/hooks/useGlobalState'

type SignInFormData = {
  email: string
  password: string
}

const SignIn: NextPage = () => {
  const router = useRouter()
  const [user, setUser] = useUserState()
  const [, setSnackbar] = useSnackbarState()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignInFormData>({
    defaultValues: { email: '', password: '' },
  })

  const validationRules = {
    email: {
      required: 'メールアドレスを入力してください。',
      pattern: {
        value:
          /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
        message: '正しい形式のメールアドレスを入力してください。',
      },
    },
    password: {
      required: 'パスワードを入力してください。',
    },
  }

  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/auth/sign_in'
    const headers = { 'Content-Type': 'application/json' }

    axios({ method: 'POST', url: url, data: data, headers: headers })
      .then((res: AxiosResponse) => {
        localStorage.setItem('access-token', res.headers['access-token'])
        localStorage.setItem('client', res.headers['client'])
        localStorage.setItem('uid', res.headers['uid'])
        setUser({
          ...user,
          isFetched: false,
        })
        //showNotification('✅ サインインに成功しました！')
        setSnackbar({
          message: 'サインインに成功しました',
          severity: 'success',
          pathname: '/',
        })
        router.push('/')
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log(e.message)
        setSnackbar({
          message: '登録ユーザーが見つかりません',
          severity: 'error',
          pathname: '/sign_in',
        })
      })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="card w-full max-w-sm bg-white shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Sign in</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">メールアドレス</span>
            </label>
            <Controller
              name="email"
              control={control}
              rules={validationRules.email}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  placeholder="you@example.com"
                  className="input input-bordered w-full"
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">パスワード</span>
            </label>
            <Controller
              name="password"
              control={control}
              rules={validationRules.password}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full"
                />
              )}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-full font-bold">
            送信する
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignIn
