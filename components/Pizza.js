// React
import { useRef, useState } from 'react'

// Next
import Image from 'next/image'

// Modules
import { motion } from 'framer-motion'
import useMouse from '@react-hook/mouse-position'

export default ({ data, onClick }) => {
  const [digits, setDigits] = useState([])
  
  const mouseRef = useRef(null)

  const mouse = useMouse(mouseRef)

  const spawnDigit = (n, x, y) => {
    setDigits(prev => {
      if(prev !== undefined) {
        return [...prev, { n, x, y }]
      } else {
        return [{n, x, y}]
      }
    })

    return setTimeout(() => {
      return setDigits(prev => {
        if(prev.length > 0) {
          return prev.slice(1)
        } else {
          return []
        }
      })
    }, 2000)
  }

  return (
    <motion.div 
      ref={mouseRef}
      className='cursor-pointer h-52 relative rounded-full w-52'
      onClick={e => { onClick(); spawnDigit(data.cp, mouse.x, mouse.y)}}
      initial={{
        scale: 0.95
      }}
      whileHover={{
        scale: 1.05
      }}
      whileTap={{
        scale: 1.1
      }}
    >
      <Image src='/assets/pizza.svg' layout='fill' objectFit='cover' />
      {
        (digits && digits.length > 0) &&
        digits.map(
          (digit, i) => <ClickNumber key={i} n={digit.n} x={mouse.x} y={mouse.y} />
        )
      }
    </motion.div>
  )
}

const ClickNumber = ({ n, x, y }) => {
  return (
    <motion.div 
      className='absolute font-bold pointer-events-none text-shadow-lg text-white z-50' 
      initial={{
        left: x,
        opacity: 1,
        top: y
      }}
      animate={{
        opacity: 0,
        top: [y, y + -75],
      }}
      transition={{
        delay: 0.1,
        duration: 1.5
      }}
    >
      +{n}
    </motion.div>
  )
}