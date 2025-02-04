import type { NextPage } from 'next'
import SimpleButton from '@/components/SimpleButton'

const HelloWorld: NextPage = () => {
  const handleOnClick = () => {
    console.log('Clicked from hello_world')
  }

  return (
    <>
      <div>Hello Next.js</div>
      <SimpleButton text={'From HelloWorld'} onClick={handleOnClick} />
    </>
  )
}

export default HelloWorld
