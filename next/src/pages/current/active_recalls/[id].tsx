import axios, { isAxiosError } from 'axios'
import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import useSWR from 'swr'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import { useUserState, useSnackbarState } from '@/hooks/useGlobalState'
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn'
import { fetcher } from '@/utils'

type CurrentArticleProps = {
  id: number
  title: string
  content: string
  createdAt: string
  status: string
  userID: number
}

type CommentProps = {
  id: number
  content: string
  createdAt: string
}

type CommentFormData = {
  content: string
}

const CurrentArticleDetail: NextPage = () => {
  useRequireSignedIn()
  const [user] = useUserState()
  const [, setSnackbar] = useSnackbarState()
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const id = typeof router.query.id === 'string' ? router.query.id : undefined
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/active_recalls/'
  const commentUrl = id
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/current/active_recalls/${id}/recalls`
    : null

  //投稿データの取得
  const { data, error } = useSWR(
    user.isSignedIn && id ? url + id : null,
    fetcher,
  )
  //コメントデータの取得
  const { data: commentData } = useSWR(commentUrl, fetcher)

  const article: CurrentArticleProps = camelcaseKeys(data, { deep: true })
  const comments: CommentProps[] = commentData || []

  //Hooksは条件の後に記述してはいけない
  const { handleSubmit, control, reset } = useForm<CommentFormData>({
    defaultValues: {
      content: '',
    },
  })

  //コメントを送信する関数
  const onSubmit: SubmitHandler<CommentFormData> = async (data) => {
    if (!data.content || !commentUrl) {
      return setSnackbar({
        message: '本文なしの記事は公開できません',
        severity: 'error',
        pathname: router.asPath,
      })
    }

    setIsLoading(true)

    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }

    const postData = {
      recall: {
        content: data.content,
      },
    }

    axios({
      method: 'POST',
      url: commentUrl,
      data: postData,
      headers: headers,
    })
      .then(() => {
        setSnackbar({
          message: 'ActiveRecalled!',
          severity: 'success',
          pathname: '/current/active_recalls/[id]',
        })
        reset() //フォームを空に
      })
      .catch((err) => {
        if (isAxiosError(err)) {
          console.log(err.message)
          setSnackbar({
            message: 'コンテントの保存に失敗しました',
            severity: 'error',
            pathname: '/current/active_recalls/[id]',
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
    <div className="container mx-auto p-4">
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold">{article.title}</h2>
          <p className="text-gray-600">
            {article.status} | {article.createdAt}
          </p>
          <p className="mt-4">{article.content}</p>
          <Link
            href={'/current/active_recalls/edit/' + article.id}
            className="btn btn-ghost"
          >
            編集
          </Link>
          <Link href="/current/active_recalls" className="btn btn-primary">
            Back to My Article List
          </Link>
        </div>
      </div>
      <div>
        {/* コメント一覧 */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">過去のrecall</h3>
          <div className="card w-full bg-base-100 shadow-xl">
            <ul>
              {comments.map((c) => (
                <li key={c.id} className="border-b py-2">
                  <p>{c.content}</p>
                  <p className="text-sm text-gray-500">{c.createdAt}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container mx-auto max-w-3xl bg-white p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  className="textarea textarea-bordered w-full h-60"
                />
              )}
            />
            <button
              type="submit"
              className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
            >
              recall
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CurrentArticleDetail
