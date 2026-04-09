import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../cart/cartSlice'
import Button from '../../ui/Button'
import { formatCurrency } from '../../utils/helpers'
import DeleteItem from '../cart/DeleteItem'
import ItemQty from '../cart/ItemQty'

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.cart)
  const currentItem = cart.find((item) => item.pizzaId === id)

  function handleClick() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    }
    dispatch(addItem(newItem))
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-stone-400 capitalize italic">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex w-full items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium text-red-600 uppercase line-through">
              Sold out
            </p>
          )}
          <div className="space-x-2">
            {currentItem && (
              <div className="flex items-center gap-3 sm:gap-8">
                <DeleteItem pizzaId={id} />
                <ItemQty pizzaId={id} quantity={currentItem.quantity} />
              </div>
            )}
            {!currentItem && (
              <Button type="small" disabled={soldOut} onClick={handleClick}>
                Add to cart
              </Button>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}

export default MenuItem
