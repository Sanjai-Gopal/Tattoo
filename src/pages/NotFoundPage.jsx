import { Link } from 'react-router'
import usePageMeta from '../hooks/usePageMeta'

function NotFoundPage() {
  usePageMeta({
    title: 'Page Not Found | Chennai Hub',
    description: 'The page you are looking for does not exist.',
    canonical: 'https://tattoo-sooty.vercel.app/',
  })

  return (
    <div className="container not-found">
      <p className="error-code">404</p>
      <h1>Page Not Found</h1>
      <p>That page doesn&apos;t exist or may have moved.</p>
      <Link to="/" className="shop-all-btn">
        Back to Home
      </Link>
    </div>
  )
}

export default NotFoundPage
