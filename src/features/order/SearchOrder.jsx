import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchOrder() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    // Handle form submission logic here
    if (!query) return
    navigate(`/order/${query}`)
    setQuery('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="focus:ring-opacity-50 w-28 rounded-full bg-emerald-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-800 focus:w-72 focus:ring focus:ring-emerald-500 focus:outline-none sm:w-64"
      />
    </form>
  )
}
