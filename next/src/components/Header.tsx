import Link from 'next/link'
import { useUserState } from '@/hooks/useGlobalState'

const Header = () => {
  const [user] = useUserState()
  return (
    <header className="sticky top-0 bg-white shadow-md z-50">
      <div className="navbar sticky max-w-full px-4">
        <div className="flex-1">
          <Link href="/" className="text-xl font-bold">
            My App
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">ホーム</Link>
            </li>
            {user.isFetched && (
              <>
                {!user.isSignedIn && (
                  <li>
                    <Link href="/sign_in">Sign In</Link>
                  </li>
                )}
                {user.isSignedIn && (
                  <>
                    <li>
                      <Link href="/active_recalls/new">新規投稿</Link>
                    </li>
                    <li>
                      <Link href="/current/active_recalls">My記事一覧</Link>
                    </li>
                    <li>
                      <Link href="/">{user.name}</Link>
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
