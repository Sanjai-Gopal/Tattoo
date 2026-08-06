import { useEffect } from 'react'

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function usePageMeta({ title, description, canonical, image } = {}) {
  useEffect(() => {
    if (title) document.title = title
    if (description) upsertMeta('name', 'description', description)
    if (canonical) upsertCanonical(canonical)
    if (image) {
      upsertMeta('property', 'og:image', image)
      upsertMeta('name', 'twitter:image', image)
    }
  }, [title, description, canonical, image])
}

export default usePageMeta
