import { Link } from 'react-router-dom'

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
      <h2 className="mb-3 text-2xl font-semibold">Your cart is empty</h2>

      <p className="mb-6 text-stone-500">
        Start adding some delicious pizzas 🍕
      </p>

      <Link
        to="/menu"
        className="rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
      >
        Browse Menu
      </Link>
    </div>
  )
}

export default EmptyCart
