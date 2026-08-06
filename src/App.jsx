import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import CursorGlow from './components/CursorGlow/CursorGlow'
import CartDrawer from './components/CartDrawer/CartDrawer'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

const HomePage = lazy(() => import('./pages/HomePage'))
const CollectionsPage = lazy(() => import('./pages/CollectionsPage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function PageLoader() {
  return <div className="page-loader" role="status" aria-label="Loading" />
}

function AppRoutes() {
  const location = useLocation()

  return (
    <div className="route-fade" key={location.pathname}>
      <Suspense fallback={<PageLoader />}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections/:slug" element={<CollectionsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <CursorGlow />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <ErrorBoundary>
        <main id="main">
          <AppRoutes />
        </main>
      </ErrorBoundary>
      <Footer />
      <CartDrawer />
    </div>
  )
}

export default App
