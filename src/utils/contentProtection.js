const isEditableTarget = (target) => {
  if (!(target instanceof Element)) {
    return false
  }

  return Boolean(
    target.closest('input, textarea, select, [contenteditable="true"]'),
  )
}

export function installContentProtection() {
  if (typeof window === 'undefined' || window.__contentProtectionInstalled) {
    return
  }

  window.__contentProtectionInstalled = true

  const shield = document.createElement('div')
  shield.className = 'capture-protection-shield'
  shield.setAttribute('aria-hidden', 'true')
  shield.textContent = 'Protected'
  document.body.appendChild(shield)

  let shieldTimer = null

  const showShield = () => {
    document.documentElement.classList.add('is-capture-protected')
    window.clearTimeout(shieldTimer)
    shieldTimer = window.setTimeout(() => {
      document.documentElement.classList.remove('is-capture-protected')
    }, 1800)
  }

  const blockEvent = (event) => {
    if (isEditableTarget(event.target)) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
  }

  document.addEventListener('contextmenu', blockEvent, true)
  document.addEventListener('copy', blockEvent, true)
  document.addEventListener('cut', blockEvent, true)
  document.addEventListener('dragstart', blockEvent, true)
  document.addEventListener('selectstart', blockEvent, true)

  document.addEventListener(
    'keydown',
    (event) => {
      const key = event.key.toLowerCase()
      const protectedShortcut =
        event.key === 'PrintScreen' ||
        ((event.ctrlKey || event.metaKey) &&
          ['c', 's', 'p', 'u'].includes(key)) ||
        ((event.ctrlKey || event.metaKey) &&
          event.shiftKey &&
          ['i', 'j', 'c'].includes(key))

      if (!protectedShortcut) {
        return
      }

      if (!isEditableTarget(event.target)) {
        event.preventDefault()
        event.stopPropagation()
      }

      showShield()

      if (event.key === 'PrintScreen' && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText('').catch(() => {})
      }
    },
    true,
  )

  window.addEventListener('beforeprint', showShield)
}
