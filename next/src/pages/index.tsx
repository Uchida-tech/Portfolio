import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import Link from 'next/link'
import useSWR from 'swr'
import ActiveRecallCard from '../components/ActiveRecallCard'
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

const Index: NextPage = () => {
  const url = 'http://localhost:3000/api/v1/active_recalls'

  const { data, error } = useSWR<{ active_recalls: ActiveRecallProps[] }>(
    url,
    fetcher,
  )
  if (error)
    return (
      <div className="flex items-center justify-center">
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            現在、システムに技術的な問題が発生しています。ご不便をおかけして申し訳ありませんが、復旧までしばらくお待ちください。
          </span>
        </div>
      </div>
    )

  if (!data)
    return (
      <div className="flex justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    )

  const activeRecalls = camelcaseKeys(data.active_recalls)

  return (
    <div className="bg-white min-h-screen">
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
      </div>
    </div>
  )
}

export default Index
