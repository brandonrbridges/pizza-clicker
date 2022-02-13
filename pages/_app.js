import '../styles/globals.css'

import { AnimatePresence } from 'framer-motion'

export default ({ Component, pageProps }) => {
  return (
    <AnimatePresence
      
      exitBeforeEnter
      initial={true}
    >
      <Component {...pageProps} />
    </AnimatePresence>
  )
}
