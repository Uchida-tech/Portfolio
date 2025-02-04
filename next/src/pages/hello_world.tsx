import type { NextPage } from 'next'
import SimpleButton from '@/components/SimpleButton'

const HelloWorld: NextPage = () => {
  return (
    <>
      <div>Hello Next.js</div>
      <SimpleButton text={'From HelloWorld'} />
    </>
  )
}

export default HelloWorld
