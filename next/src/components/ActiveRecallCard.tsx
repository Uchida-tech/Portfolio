type ActiveRecallProps = {
  title: string
  fromToday: string
  userName: string
}

const omit = (text: string) => (len: number) => (ellipsis: string) =>
  text.length >= len ? text.slice(0, len - ellipsis.length) + ellipsis : text

const ActiveRecallCard = (props: ActiveRecallProps) => {
  return (
    <div className="card bg-base-100 shadow-xl p-4">
      <div className="card-body">
        <h3 className="text-lg font-bold leading-snug min-h-[48px]">
          {omit(props.title)(45)('...')}
        </h3>
        <div className="flex justify-between text-sm text-gray-500">
          <p>{props.userName}</p>
          <p>{props.fromToday}</p>
        </div>
      </div>
    </div>
  )
}

export default ActiveRecallCard
