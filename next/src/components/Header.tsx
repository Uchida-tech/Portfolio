import axios, { AxiosResponse, AxiosError } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useUserState } from '@/hooks/useGlobalState'

const Header = () => {
  const [user] = useUserState()
  const router = useRouter()

  const addNewArticle = () => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/active_recalls'

    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }

    axios({ method: 'POST', url: url, headers: headers })
      .then((res: AxiosResponse) => {
        router.push('/current/active_recalls/edit/' + res.data.id)
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log(e.message)
      })
  }

  return (
    <header className="sticky top-0 bg-white shadow-md z-50">
      <div className="navbar sticky max-w-full px-4">
        <div className="flex-1">
          <Link href="/" className="text-xl font-bold">
            Active Recall
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/" className="btn btn-ghost">
                ホーム
              </Link>
            </li>
            {user.isFetched && (
              <>
                {!user.isSignedIn && (
                  <>
                    <li>
                      <Link href="/sign_in" className="btn btn-ghost">
                        Sign In
                      </Link>
                    </li>
                    <li>
                      <Link href="/sign_up" className="btn btn-ghost">
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
                {user.isSignedIn && (
                  <>
                    <li>
                      <button onClick={addNewArticle} className="btn btn-ghost">
                        新規投稿
                      </button>
                    </li>
                    <li>
                      <Link
                        href="/current/active_recalls"
                        className="btn btn-ghost"
                      >
                        My記事一覧
                      </Link>
                    </li>
                    <li>
                      <Link href="/" className="btn btn-ghost">
                        {user.name}
                      </Link>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header
