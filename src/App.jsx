import { useState } from 'react'
import ProductListingsPage from './pages/ProductListingsPage';
import { CartProvider } from './cart/CartContext';
import Cart from './cart/Cart';
function App() {
  const [count, setCount] = useState(0)

  return (
    <CartProvider>
      <ProductListingsPage />
    </CartProvider>
  )
}

export default App
