import Link from 'next/link'

const Header = () => {
  return (
    <div className="navbar bg-base-200 shadow-md px-4">
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
          <li>
            <Link href="/active_recalls">記事一覧</Link>
          </li>
          <li>
            <Link href="/active_recalls/new">新規投稿</Link>
          </li>
          <li>
            <Link href="/login">ログイン</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header
