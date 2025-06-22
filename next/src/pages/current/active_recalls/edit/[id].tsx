import axios, { isAxiosError } from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState, useMemo } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import useSWR from 'swr'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import { useUserState, useSnackbarState } from '@/hooks/useGlobalState'
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn'
import { fetcher } from '@/utils'

type ArticleProps = {
  title: string
  content: string
  status: string
}

type ArticleFormData = {
  title: string
  content: string
}

const ArticleEditPage: NextPage = () => {
  useRequireSignedIn()
  const router = useRouter()
  const [user] = useUserState()
  const [, setSnackbar] = useSnackbarState()
  const [statusChecked, setStatusChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/current/active_recalls/`
  const { id } = router.query
  const { data, error } = useSWR(
    user.isSignedIn && id ? url + id : null,
    fetcher,
  )

  const article: ArticleProps = useMemo(() => {
    if (!data) {
      return {
        title: '',
        content: '',
        status: false,
      }
    }
    return {
      title: data.title == null ? '' : data.title,
      content: data.content == null ? '' : data.content,
      status: data.status,
    }
  }, [data])

  const { handleSubmit, control, reset } = useForm<ArticleFormData>({
    defaultValues: article,
  })

  useEffect(() => {
    if (data) {
      reset(article)
      setStatusChecked(article.status === '公開中')
    }
  }, [data, article, reset])

  const onSubmit: SubmitHandler<ArticleFormData> = async (data) => {
    if (!data.title) {
      return setSnackbar({
        message: '記事の保存にはタイトルが必要です',
        severity: 'error',
        pathname: router.pathname, //現在のパスの取得(idは取得しない)
      })
    }

    if (statusChecked && !data.content) {
      return setSnackbar({
        message: '本文なしの記事は公開できません',
        severity: 'error',
        pathname: router.pathname,
      })
    }

    setIsLoading(true)

    const patchUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL + '/current/active_recalls/' + id

    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }

    const status = statusChecked ? 'published' : 'studying'

    const patchData = { ...data, status: status }

    axios({
      method: 'PATCH',
      url: patchUrl,
      data: patchData,
      headers: headers,
    })
      .then(() => {
        setSnackbar({
          message: '記事を保存しました',
          severity: 'success',
          pathname: router.pathname,
        })
        router.push('/current/active_recalls')
      })
      .catch((err) => {
        if (isAxiosError(err)) {
          console.log(err.message)
          setSnackbar({
            message: '記事の保存に失敗しました',
            severity: 'error',
            pathname: router.pathname,
          })
        }
      })
      .finally(() => {
        setIsLoading(false) // 成功・失敗のどちらでもローディングを解除
      })
  }

  if (error) return <Error />
  if (!data) return <Loading />

  return (
    <div className="min-h-screen bg-gray-100 p-4 mx-auto">
      <div className="container mx-auto p-4">
        <button className="btn btn-ghost" onClick={() => router.back()}>
          Back
        </button>
        <div className="card mx-auto w-full bg-white p-6 rounded-lg shadow-lg">
          {/* 記事編集エリア */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="タイトル"
                  className="input input-bordered w-full text-lg"
                />
              )}
            />
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  placeholder="本文を入力"
                  className="textarea textarea-bordered w-full h-60"
                />
              )}
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="toggle"
                  checked={statusChecked}
                  onChange={() => setStatusChecked(!statusChecked)}
                />
                <span className="text-sm">下書き/公開</span>
              </label>
              <button
                className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                onClick={handleSubmit(onSubmit)}
              >
                保存する
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ArticleEditPage
