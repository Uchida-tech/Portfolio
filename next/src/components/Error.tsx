const Error = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div role="alert" className="alert alert-error w-4/5 max-w-2xl">
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
}

export default Error
