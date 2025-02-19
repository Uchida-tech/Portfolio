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
  if (error) return <div>An error has occurred.</div>
  if (!data) return <div>Loading...</div>

  const activeRecalls = camelcaseKeys(data.active_recalls)

  return (
    <div className="bg-blue-100 min-h-screen">
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
