// log the pageview with their URL
export const pageview = (url) => {
  window.gtag('config', 'G-QT8H01JMZV', {
    page_path: url,
  })
}

// log specific events happening.
export const event = ({ action, params }) => {
  window.gtag('event', action, params)
}
