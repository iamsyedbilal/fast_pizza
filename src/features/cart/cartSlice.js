import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.pizzaId === action.payload.pizzaId,
      )

      if (existingItem) {
        existingItem.quantity++
        existingItem.totalPrice = existingItem.quantity * existingItem.unitPrice
      } else {
        state.cart.push(action.payload)
      }
    },
    deleteItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload)
    },
    increaseItemQty: (state, action) => {
      const item = state.cart.find((item) => item.pizzaId === action.payload)

      item.quantity++
      item.totalPrice = item.quantity * item.unitPrice
    },
    decreaseItemQty: (state, action) => {
      const item = state.cart.find((item) => item.pizzaId === action.payload)

      item.quantity--
      item.totalPrice = item.quantity * item.unitPrice

      // if (item.quantity === 0)
      //   state.cart = state.cart.filter(
      //     (item) => item.pizzaId !== action.payload,
      //   )
    },
    clearCart: (state) => {
      state.cart = []
    },
  },
})

export const {
  addItem,
  deleteItem,
  decreaseItemQty,
  increaseItemQty,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer
