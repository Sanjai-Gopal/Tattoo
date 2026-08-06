/* oxlint-disable react/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'chennaihub-cart'

function loadCart() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)
  const [isOpen, setIsOpen] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState('cart')

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* storage full / unavailable — cart stays in memory */
    }
  }, [items])

  const addItem = (product, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.slug === product.slug)
      if (existing) {
        return prev.map(i =>
          i.slug === product.slug ? { ...i, qty: i.qty + qty } : i,
        )
      }
      return [
        ...prev,
        {
          slug: product.slug,
          name: product.name,
          price: product.salePrice,
          image: product.images[0],
          qty,
        },
      ]
    })
  }

  const updateQty = (slug, qty) => {
    setItems(prev =>
      prev.map(i => (i.slug === slug ? { ...i, qty: Math.max(1, qty) } : i)),
    )
  }

  const removeItem = slug => {
    setItems(prev => prev.filter(i => i.slug !== slug))
  }

  const clear = () => setItems([])

  const openCart = () => {
    setCheckoutStep('cart')
    setIsOpen(true)
  }

  const closeCart = () => setIsOpen(false)

  const openCheckout = () => {
    setCheckoutStep('checkout')
  }

  const completeCheckout = () => {
    setItems([])
    setCheckoutStep('done')
  }

  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items])
  const subtotal = useMemo(
    () => items.reduce((n, i) => n + i.price * i.qty, 0),
    [items],
  )

  const value = {
    items,
    count,
    subtotal,
    isOpen,
    checkoutStep,
    addItem,
    updateQty,
    removeItem,
    clear,
    openCart,
    closeCart,
    openCheckout,
    completeCheckout,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return ctx
}
