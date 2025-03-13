import axios, { isAxiosError } from 'axios'
import type { NextPage } from 'next'
import Link from 'next/link'
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
    return data
      ? {
          title: data.title ?? '',
          content: data.content ?? '',
          status: data.status,
        }
      : { title: '', content: '', status: 'draft' }
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
        pathname: router.asPath,
      })
    }

    if (statusChecked && !data.content) {
      return setSnackbar({
        message: '本文なしの記事は公開できません',
        severity: 'error',
        pathname: router.asPath,
      })
    }

    setIsLoading(true)

    try {
      await axios.patch(`${url}${id}`, {
        ...data,
        status: statusChecked ? 'published' : 'studying',
      })
      setSnackbar({
        message: '記事を保存しました',
        severity: 'success',
        pathname: router.asPath,
      })
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        console.error(err.message)
        setSnackbar({
          message: '記事の保存に失敗しました',
          severity: 'error',
          pathname: router.asPath,
        })
      } else {
        console.error('Unexpected error:', err)
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (error) return <Error />
  if (!data) return <Loading />

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* ヘッダー */}
      <div className="navbar bg-base-200 shadow-md mb-4">
        <div className="flex-1">
          <Link href="/current/articles" className="btn btn-ghost">
            ← 戻る
          </Link>
        </div>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="toggle"
              checked={statusChecked}
              onChange={() => setStatusChecked(!statusChecked)}
            />
            <span className="text-sm">公開/下書き</span>
          </label>
          <button
            className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
            onClick={handleSubmit(onSubmit)}
          >
            更新する
          </button>
        </div>
      </div>

      {/* 記事編集エリア */}
      <div className="container mx-auto max-w-3xl bg-white p-6 rounded-lg shadow-lg">
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
          <button
            type="submit"
            className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
          >
            保存する
          </button>
        </form>
      </div>
    </div>
  )
}

export default ArticleEditPage
