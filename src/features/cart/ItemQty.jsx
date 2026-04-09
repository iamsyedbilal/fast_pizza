import { useDispatch } from 'react-redux'
import { decreaseItemQty, increaseItemQty } from './cartSlice'
import Button from '../../ui/Button'

export default function ItemQty({ pizzaId, quantity }) {
  const dispatch = useDispatch()

  return (
    <div className="flex items-center gap-2">
      <Button
        type="small"
        disabled={quantity === 1}
        onClick={() => dispatch(decreaseItemQty(pizzaId))}
      >
        −
      </Button>

      <span className="min-w-8 text-center text-sm font-semibold">
        {quantity}
      </span>

      <Button type="small" onClick={() => dispatch(increaseItemQty(pizzaId))}>
        +
      </Button>
    </div>
  )
}
