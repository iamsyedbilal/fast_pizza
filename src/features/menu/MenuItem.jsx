import { useDispatch } from 'react-redux'
import { addItem } from '../cart/cartSlice'
import Button from '../../ui/Button'
import { formatCurrency } from '../../utils/helpers'

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza
  const dispatch = useDispatch()

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
          <Button type="small" disabled={soldOut} onClick={handleClick}>
            Add to cart
          </Button>
        </div>
      </div>
    </li>
  )
}

export default MenuItem
