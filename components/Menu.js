// React
import { useState } from 'react'

// Components
import Icon from '@/components/Icon'

// Modules
import { motion } from 'framer-motion'

export default ({ children }) => {
  const [hovering, isHovering] = useState(null)
  
  return (
    <>
      <motion.div 
        className='fixed bg-gray-200 cursor-pointer flex h-10 items-center justify-center right-5 rounded top-5 w-10'
        onMouseEnter={() => isHovering(true)}
        onMouseLeave={() => isHovering(false)}
        initial={{
          opacity: 1
        }}
        animate={
          hovering 
          ? { 
            opacity: 0
          } : {
            opacity: 1
          }
        }
      >
        <Icon icon='FaBars' />
      </motion.div>

      {
        hovering &&
        <motion.div 
          className='bg-white fixed p-4 rounded shadow-lg w-1/2 z-50'
          onMouseEnter={() => isHovering(true)}
          onMouseLeave={() => isHovering(false)}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            right: ['1.3rem', '1.25rem'],
            top: ['2rem', '1.25rem'],
            transition: {
              duration: .25
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 2
            }
          }}
        >
          <motion.span
            initial={{
              opacity: 0
            }}
            whileInView={{
              opacity: 1,
              transition: {
                delay: .25
              }
            }}
          >
            {children}
          </motion.span>
        </motion.div>
      }
    </>
  )
}