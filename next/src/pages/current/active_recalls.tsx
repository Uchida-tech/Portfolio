import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import useSWR from 'swr'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import { useUserState } from '@/hooks/useGlobalState'
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn'
import { fetcher } from '@/utils'

type ArticleProps = {
  id: number
  title: string
  status: string
}

const CurrentActiveRecall: NextPage = () => {
  useRequireSignedIn()
  const [user] = useUserState()
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + 'current/active_recalls/'
  const { data, error } = useSWR(user.isSignedIn ? url : null, fetcher)

  if (error) return <Error />
  if (!data) return <Loading />

  const article: ArticleProps = camelcaseKeys(data, { deep: true })

  return (
    <div className="container mx-auto p-4">
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold">{article.title}</h2>
          <p className="text-gray-600">{article.status}</p>
        </div>
      </div>
    </div>
  )
}

export default CurrentActiveRecall
