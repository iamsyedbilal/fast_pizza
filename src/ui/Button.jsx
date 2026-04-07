import { Link } from 'react-router-dom'

export default function Button({
  children,
  disabled = false,
  onClick,
  className = '',
  to,
}) {
  const tailwindClassName = `w-full rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold tracking-wide text-stone-800 uppercase transition-all duration-200 hover:bg-emerald-300 focus:ring focus:ring-emerald-400 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto ${className} cursor-pointer sm:px-6 sm:py-4`

  if (to)
    return (
      <Link className={tailwindClassName} to={to}>
        {children}
      </Link>
    )

  return (
    <button disabled={disabled} onClick={onClick} className={tailwindClassName}>
      {children}
    </button>
  )
}
