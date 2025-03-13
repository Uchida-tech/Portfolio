import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import { useUserState } from '@/hooks/useGlobalState'
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn'
import { fetcher } from '@/utils'

type CurrentArticleProps = {
  title: string
  content: string
  createdAt: string
  status: string
}

const CurrentArticleDetail: NextPage = () => {
  useRequireSignedIn()
  const [user] = useUserState()
  const router = useRouter()
  const id = typeof router.query.id === 'string' ? router.query.id : undefined
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/active_recalls/'
  const { data, error } = useSWR(
    user.isSignedIn && id ? url + id : null,
    fetcher,
  )

  if (error) return <Error />
  if (!data) return <Loading />

  const article: CurrentArticleProps = camelcaseKeys(data, { deep: true })

  return (
    <div className="container mx-auto p-4">
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold">{article.title}</h2>
          <p className="text-gray-600">
            {article.status} | {article.createdAt}
          </p>
          <p className="mt-4">{article.content}</p>
          <Link href={'/current/articles/edit/' + active_recall.id}></Link>
          <Link href="/current/active_recalls" className="btn btn-primary">
            Back to My Article List
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CurrentArticleDetail
