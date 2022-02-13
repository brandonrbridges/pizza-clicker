// React
import { createElement } from 'react'

// Modules
import * as Icons from 'react-icons/fa'

export default ({ icon, className, onClick }) => {
  const Icon = createElement(Icons[icon])

  return <span className={className} onClick={onClick}>{Icon}</span>
}