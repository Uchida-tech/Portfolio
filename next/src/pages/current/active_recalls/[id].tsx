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
  createdAt: string
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

  // Jsonのキー文字列のスネークケースをキャメルケースに変換する
  const article: CurrentArticleProps = camelcaseKeys(data, { deep: true })
  const comments: CommentProps[] = commentData
    ? camelcaseKeys(commentData, { deep: true })
    : []

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
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          <button className="btn btn-ghost" onClick={() => router.back()}>
            Back
          </button>
          <Link
            href={'/current/active_recalls/edit/' + article.id}
            className="btn btn-ghost"
          >
            編集
          </Link>
        </div>
        <div className="card w-full bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold">{article.title}</h2>
            <p className="text-gray-600">
              {article.status} | {article.createdAt}
            </p>
            <div className="collapse collapse-arrow bg-base-100">
              <input type="checkbox" />
              <div className="collapse-title text-lg font-semibold">
                内容を確認する
              </div>
              <div className="collapse-content">
                <p className="mt-4">{article.content}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="card mx-auto w-full bg-white p-6 rounded-lg shadow-lg">
            <div className="text-lg font-semibold mb-6">Try Active Recall!</div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col justify-between h-full space-y-4"
            >
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
                className={`btn btn-primary self-end ${isLoading ? 'loading' : ''}`}
              >
                recall
              </button>
            </form>
          </div>
          <div className="mt-6">
            <div className="collapse collapse-arrow bg-gray-100">
              <input type="checkbox" />
              <div className="collapse-title text-lg font-semibold">
                過去のActiveRecallを確認する（{comments?.length || 0}件）
              </div>
              <div className="collapse-content">
                {comments?.length === 0 ? (
                  <p className="text-gray-600">ActiveRecallはまだありません</p>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {comments.map((c) => (
                      <div
                        key={c.id}
                        className="card w-full bg-base-100 shadow-xl"
                      >
                        <div className="card-body">
                          <h2 className="card-title text-lg font-bold">
                            {c.content}
                          </h2>
                          <p className="text-gray-600">
                            {new Date(c.createdAt).toLocaleString('ja-JP')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentArticleDetail
