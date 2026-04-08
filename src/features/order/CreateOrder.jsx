import { useState } from 'react'
import { Form, redirect, useNavigation, useActionData } from 'react-router-dom'
import { createOrder } from '../../services/apiRestaurant'
import Button from '../../ui/Button'

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
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const cart = fakeCart
  const formErrors = useActionData()

  return (
    <div className="px-4 py-6 sm:px-6">
      <h2 className="mb-6 text-xl font-semibold text-stone-800 sm:text-2xl">
        Ready to order? Let's go!
      </h2>

      <Form method="post" className="space-y-5">
        {/* First Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-stone-700">
            First Name
          </label>
          <input type="text" name="customer" required className="input" />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-stone-700">
            Phone number
          </label>
          <input type="tel" name="phone" required className="input" />

          {formErrors?.phone && (
            <p className="rounded-md bg-red-100 px-3 py-2 text-xs text-red-700">
              {formErrors.phone}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-stone-700">Address</label>
          <input type="text" name="address" required className="input" />
        </div>

        {/* Priority */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-4 w-4 accent-emerald-500"
          />
          <label className="text-sm text-stone-700" htmlFor="priority">
            Want to give your order priority?
          </label>
        </div>

        {/* Hidden cart */}
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />

        {/* Submit */}
        <div>
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting ? 'Placing order...' : 'Order now'}
          </Button>
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
