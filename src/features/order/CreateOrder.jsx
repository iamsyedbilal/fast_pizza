import { useState } from 'react'
import { Form, redirect, useNavigation, useActionData } from 'react-router-dom'
import { createOrder } from '../../services/apiRestaurant'

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  )

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
]

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const cart = fakeCart
  const formErrors = useActionData()

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form method="post">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Placing order...' : 'Order now'}
          </button>
        </div>
      </Form>
    </div>
  )
}

export async function createOrderAction({ request }) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  // Normally, we would do the validation in the backend, but since we don't have a real backend, we'll do it here. If there are errors, we return them, and they will be available in the component through the useActionData hook. If there are no errors, we return null, which means the action was successful.
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
  }

  const errors = {}
  if (!isValidPhone(data.phone)) {
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you.'
  }

  if (Object.keys(errors).length > 0) return errors

  // Here we would normally send the data to the server, but since we don't have a real backend, we'll just log it to the console
  // console.log(order)

  const createdOrder = await createOrder(order)

  return redirect(`/order/${createdOrder.id}`)
}

export default CreateOrder
