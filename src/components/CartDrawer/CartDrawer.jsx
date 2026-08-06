import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { useCart } from '../../context/CartContext'
import './CartDrawer.css'

function CartDrawer() {
  const {
    items,
    subtotal,
    count,
    isOpen,
    checkoutStep,
    updateQty,
    removeItem,
    closeCart,
    openCheckout,
    completeCheckout,
  } = useCart()
  const closeBtnRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      closeBtnRef.current?.focus()
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined

    const onKey = e => {
      if (e.key === 'Escape') closeCart()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, closeCart])

  if (!isOpen) return null

  return (
    <>
      <div className="cart-overlay" onClick={closeCart} aria-hidden="true" />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping cart">
        <div className="cart-header">
          <h2 className="cart-title">Your Cart ({count})</h2>
          <button
            className="cart-close"
            ref={closeBtnRef}
            onClick={closeCart}
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        {checkoutStep === 'cart' && (
          <>
            <div className="cart-items">
              {items.length === 0 && (
                <div className="cart-empty">
                  <p>Your cart is empty.</p>
                  <Link to="/collections/all" className="cart-shop-link" onClick={closeCart}>
                    Shop All Designs
                  </Link>
                </div>
              )}

              {items.map(item => (
                <div className="cart-item" key={item.slug}>
                  <Link to={`/products/${item.slug}`} className="cart-item-img" onClick={closeCart}>
                    <img src={item.image} alt={item.name} loading="lazy" />
                  </Link>
                  <div className="cart-item-info">
                    <Link
                      to={`/products/${item.slug}`}
                      className="cart-item-name"
                      onClick={closeCart}
                    >
                      {item.name}
                    </Link>
                    <span className="cart-item-price">₹{item.price}</span>
                    <div className="cart-item-controls">
                      <button
                        onClick={() => updateQty(item.slug, item.qty - 1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        −
                      </button>
                      <span className="cart-item-qty">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.slug, item.qty + 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="cart-item-remove"
                    onClick={() => removeItem(item.slug)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-subtotal">
                <span>Subtotal</span>
                <strong>₹{subtotal}</strong>
              </div>
              <button
                className="cart-checkout-btn"
                disabled={items.length === 0}
                onClick={openCheckout}
              >
                Checkout
              </button>
              <button className="cart-continue-btn" onClick={closeCart}>
                Continue Shopping
              </button>
            </div>
          </>
        )}

        {checkoutStep === 'checkout' && (
          <div className="cart-checkout">
            <h3 className="cart-checkout-title">Order Summary</h3>
            <div className="cart-checkout-items">
              {items.map(item => (
                <div className="cart-checkout-row" key={item.slug}>
                  <span>
                    {item.name} × {item.qty}
                  </span>
                  <span>₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>
            <div className="cart-subtotal">
              <span>Total</span>
              <strong>₹{subtotal}</strong>
            </div>
            <p className="cart-checkout-note">
              Shipping and offers are calculated at delivery. This demo store does not
              process real payments.
            </p>
            <button className="cart-checkout-btn" onClick={completeCheckout}>
              Place Order
            </button>
            <button className="cart-continue-btn" onClick={closeCart}>
              Continue Shopping
            </button>
          </div>
        )}

        {checkoutStep === 'done' && (
          <div className="cart-done">
            <div className="cart-done-icon">✓</div>
            <h3 className="cart-done-title">Order Placed</h3>
            <p className="cart-done-text">Thanks for shopping with Chennai Hub!</p>
            <Link to="/collections/all" className="cart-checkout-btn" onClick={closeCart}>
              Continue Shopping
            </Link>
          </div>
        )}
      </aside>
    </>
  )
}

export default CartDrawer
