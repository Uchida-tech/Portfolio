import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import ActiveRecallCard from '@/components/ActiveRecallCard'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import { fetcher } from '@/utils'

type ActiveRecallProps = {
  id: number
  title: string
  createdAt: string
  fromToday: string
  user: {
    name: string
  }
}

type MetaProps = {
  totalPages: number
  currentPage: number
}

const Index: NextPage = () => {
  const router = useRouter()
  const page = 'page' in router.query ? Number(router.query.page) : 1
  const url =
    process.env.NEXT_PUBLIC_API_BASE_URL + '/active_recalls/?page=' + page

  const { data, error } = useSWR<{
    active_recalls: ActiveRecallProps[]
    meta?: MetaProps
  }>(url, fetcher)
  if (error) return <Error />

  if (!data) return <Loading />

  const activeRecalls = camelcaseKeys(data.active_recalls)
  const meta = camelcaseKeys(data.meta ?? { totalPages: 1, currentPage: 1 })

  const handleChange = (value: number) => {
    router.push('/?page=' + value)
  }

  return (
    <div className="bg-base-200 min-h-screen">
      <div className="max-w-3xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeRecalls.map((activeRecall) => (
            <Link
              key={activeRecall.id}
              href={`/active_recalls/${activeRecall.id}`}
              className="block"
            >
              <ActiveRecallCard
                title={activeRecall.title}
                fromToday={activeRecall.fromToday}
                userName={activeRecall.user.name}
              />
            </Link>
          ))}
        </div>
        <div className="flex justify-center py-6">
          <div className="join">
            <button
              className="join-item btn"
              onClick={() => handleChange(page - 1)}
              disabled={page === 1}
            >
              «
            </button>

            {[...Array(meta.totalPages)].map((_, index) => (
              <button
                key={index}
                className={`join-item btn ${page === index + 1 ? 'btn-active' : ''}`}
                onClick={() => handleChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="join-item btn"
              onClick={() => handleChange(page + 1)}
              disabled={page === meta.totalPages}
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
