import { useRouteError } from 'react-router-dom'
import LinkButton from './LinkButton'

function NotFound() {
  const error = useRouteError()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-4 text-center">
      <h1 className="mb-4 text-4xl font-bold text-stone-800">
        Something went wrong 😢
      </h1>
      <p className="mb-6 text-stone-600">
        {error?.data || error?.message || 'Page not found.'}
      </p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  )
}

export default NotFound
