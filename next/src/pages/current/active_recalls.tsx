import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import Link from 'next/link'
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
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/active_recalls/'
  const { data, error } = useSWR(user.isSignedIn ? url : null, fetcher)

  if (error) return <Error />
  if (!data) return <Loading />

  const articles: ArticleProps[] = camelcaseKeys(data, { deep: true })

  return (
    <div className="bg-base-200 min-h-screen">
      <div className="max-w-3xl mx-auto p-6">
        {articles.length === 0 ? (
          <p className="text-gray-600">投稿はありません</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/current/active_recalls/` + article.id}
              >
                <div className="card bg-base-100 shadow-xl p-4">
                  <div className="card-body">
                    <h2 className="card-title text-lg font-bold">
                      {article.title}
                    </h2>
                    <p className="text-gray-600">{article.status}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CurrentActiveRecall
