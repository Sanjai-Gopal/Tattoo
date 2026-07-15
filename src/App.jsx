import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import HomePage from './pages/HomePage'
import CollectionsPage from './pages/CollectionsPage'
import ProductDetailPage from './pages/ProductDetailPage'

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections/:slug" element={<CollectionsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
