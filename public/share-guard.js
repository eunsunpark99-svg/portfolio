(() => {
  const fallbackElement = document.createElement('button')
  fallbackElement.type = 'button'
  fallbackElement.hidden = true

  const shouldUseFallback = (selector) => {
    const value = String(selector || '').toLowerCase()
    return (
      value.includes('share') ||
      value.includes('modal') ||
      value.includes('close') ||
      value.includes('copy')
    )
  }

  const originalQuerySelector = Document.prototype.querySelector
  const originalGetElementById = Document.prototype.getElementById

  Document.prototype.querySelector = function (selector) {
    const result = originalQuerySelector.call(this, selector)
    return result || (shouldUseFallback(selector) ? fallbackElement : null)
  }

  Document.prototype.getElementById = function (id) {
    const result = originalGetElementById.call(this, id)
    return result || (shouldUseFallback(id) ? fallbackElement : null)
  }

  window.onerror = (message, source) => {
    const fileName = source || ''
    const errorMessage = String(message || '')

    if (
      fileName.includes('share-modal.js') ||
      (errorMessage.includes('addEventListener') &&
        errorMessage.includes('null'))
    ) {
      return true
    }

    return false
  }

  window.addEventListener(
    'error',
    (event) => {
      const fileName = event.filename || ''
      const message = event.message || ''

      if (
        fileName.includes('share-modal.js') ||
        (message.includes('addEventListener') && message.includes('null'))
      ) {
        event.preventDefault()
        event.stopImmediatePropagation()
      }
    },
    true,
  )
})()
