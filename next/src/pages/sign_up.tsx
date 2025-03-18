import axios, { AxiosResponse, AxiosError } from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
//import { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useSnackbarState } from '@/hooks/useGlobalState'

type SignUpFormData = {
  email: string
  password: string
  name: string
}

const SignUp: NextPage = () => {
  const router = useRouter()
  const [, setSnackbar] = useSnackbarState()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpFormData>({
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
    name: {
      required: 'ユーザー名を入力してください。',
    },
  }

  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    const SignUp = async (data: SignUpFormData) => {
      const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/auth'
      const headers = { 'Content-Type': 'application/json' }
      const confirmSuccessUrl =
        process.env.NEXT_PUBLIC_FRONT_BASE_URL + '/sign_in'

      await axios({
        method: 'POST',
        url: url,
        data: { ...data, confirm_success_url: confirmSuccessUrl },
        headers: headers,
      })
        .then((res: AxiosResponse) => {
          localStorage.setItem(
            'access-token',
            res.headers['access-token'] || '',
          )
          localStorage.setItem('client', res.headers['client'] || '')
          localStorage.setItem('uid', res.headers['uid'] || '')
          setSnackbar({
            message: '認証メールをご確認ください',
            severity: 'success',
            pathname: '/',
          })
          router.push('/')
        })
        .catch((e: AxiosError<{ error: string }>) => {
          console.log(e.message)
          setSnackbar({
            message: '不正なユーザー情報です',
            severity: 'error',
            pathname: '/sign_up',
          })
        })
    }
    SignUp(data)
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
          <div className="form-control">
            <label className="label">
              <span className="label-text">ユーザー名</span>
            </label>
            <Controller
              name="name"
              control={control}
              rules={validationRules.name}
              render={({ field }) => (
                <input
                  {...field}
                  type="name"
                  className="input input-bordered w-full"
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
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

export default SignUp
