// React
import { useEffect, useState } from 'react'

// Components
import { motion } from 'framer-motion'

export default ({ upgrade: u, data: d, index: i, onClick }) => {
  const [hovering, isHovering] = useState(false)
  const [style, setStyle] = useState({})

  const setUpdate = () => {
    setStyle({
      background: d.upgrades[i] ? 'bg-blue-400' : 'bg-gray-400',
      border: d.upgrades[i] ? 'border-blue-400' : 'border-gray-400',
      text: d.upgrades[i] ? 'text-blue-500' : 'text-gray-500'
    })
  }

  useEffect(() => {
    return setUpdate()
  }, [d])

  return (
    <button 
      className={`
        border
        ${style.border}
        h-24
        relative 
        rounded 
        ${style.text}
        w-24
      `}
      key={i}
      onClick={() => onClick(i)}
      onMouseEnter={() => isHovering(true)}
      onMouseLeave={() => isHovering(false)}
    >
      {u.name} 
      {
        (hovering && d.upgrades[i]) &&
        <motion.div 
          className={`absolute ${style.background} left-1/2 rounded-sm text-xs transform text-white -translate-x-1/2 w-4/5`}
          initial={{
            opacity: 0,
            bottom: -10
          }}
          whileInView={{
            opacity: 1,
            bottom: -5
          }}
        >
          {
            d.upgrades[i]
            ? `Owned: ${d.upgrades[i].owned}`
            : 'Not owned'
          }
        </motion.div>
      }
    </button>
  )
}