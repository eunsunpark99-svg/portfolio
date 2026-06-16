(() => {
  const selectors = [
    '#share-button',
    '#shareBtn',
    '#open-share-modal',
    '.share-button',
    '.share-btn',
  ]
  const closeSelectors = [
    '#close-share-modal',
    '.close-modal',
    '.modal-close',
  ]
  const modal = document.querySelector('#share-modal, .share-modal, .modal')

  selectors.forEach((selector) => {
    document.querySelector(selector)?.addEventListener('click', () => {
      modal?.setAttribute('data-open', 'true')
    })
  })

  closeSelectors.forEach((selector) => {
    document.querySelector(selector)?.addEventListener('click', () => {
      modal?.removeAttribute('data-open')
    })
  })
})()
