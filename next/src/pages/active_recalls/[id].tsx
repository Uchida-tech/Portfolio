import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import { fetcher } from '@/utils'

type ArticleProps = {
  title: string
  content: string
  createdAt: string
  updatedAt: string
  user: {
    name: string
  }
}

const ArticleDetail: NextPage = () => {
  const router = useRouter()
  const id = typeof router.query.id === 'string' ? router.query.id : undefined
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/active_recalls/'
  const { data, error } = useSWR(id ? url + id : null, fetcher)

  if (error) return <Error />
  if (!data) return <Loading />

  const article: ArticleProps = camelcaseKeys(data, { deep: true })

  return (
    <div className="container mx-auto p-4">
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold">{article.title}</h2>
          <p className="text-gray-600">
            By {article.user.name} | {article.createdAt}
          </p>
          <p className="mt-4">{article.content}</p>
          <Link href="/" className="btn btn-primary">
            Back to List
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ArticleDetail
