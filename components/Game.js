// React
import { useEffect, useState } from 'react'

// Next
import Head from 'next/head'

// Components
import Menu from '@/components/Menu'
import Pizza from '@/components/Pizza'
import UpgradeItem from '@/components/UpgradeItem'

// Data
import initialData from '@/data/initial'
import upgrades from '@/data/upgrades'
import toppings from '@/data/toppings'

// Modules
import { CountUp } from 'use-count-up'

export default () => {
  const [data, set] = useState(null)
  const [timer, setTimer] = useState(0)

  const addPizza = () => {
    set(
      prev => ({
        ...prev,
        pizzas: (prev.pizzas + prev.cp),
        stats: {
          ...prev.stats,
          clicks: prev.stats.clicks++
        }
      })
    )
  }
  
  const incrementTimer = () => setTimer(prev => prev += 1)

  const interval = () => setInterval(incrementTimer, 1000)

  const saveGame = () => window.localStorage.setItem('game', JSON.stringify(data))

  const loadGame = () => {
    const data = JSON.parse(window.localStorage.getItem('game')) ?? null

    set({ ...initialData, ...data })
  }

  const purchaseUpgrade = (i) => {
    const upgrade = upgrades[i]
    let userUpgrade = data.upgrades[i]

    if(data.pizzas >= upgrade.cost) {
      if(!userUpgrade) {
        set(
          prev => ({
            ...prev,
            upgrades: [
              ...prev.upgrades,
              {
                upgradeId: i,
                owned: 1
              }
            ],
            cp: (prev.cp += upgrade.power),
            pizzas: (prev.pizzas -= upgrade.cost),
            stats: {
              ...prev.stats,
              upgrades_purchased: (prev.stats.upgrades_purchased += 1)
            }
          })
        )
      } else {
        const temp = data.upgrades
  
        temp[i].owned++
        
        set(
          prev => ({
            ...prev,
            upgrades: temp,
            cp: (prev.cp += upgrade.power),
            pizzas: (prev.pizzas -= upgrade.cost),
            stats: {
              ...prev.stats,
              upgrades_purchased: (prev.stats.upgrades_purchased += 1)
            }
          })
        )
      }
    }
  }

  const purchaseTopping = (i) => {
    const topping = toppings[i]
    let userTopping = data.toppings[i]

    if(data.pizzas >= topping.cost) {
      if(!userTopping) {
        set(
          prev => ({
            ...prev,
            toppings: [
              ...prev.toppings,
              {
                toppingId: i,
                owned: 1
              }
            ],
            pps: (prev.pps += topping.power),
            pizzas: (prev.pizzas -= topping.cost),
            stats: {
              ...prev.stats,
              toppings_purchased: (prev.stats.toppings_purchased += 1)
            }
          })
        )
      } else {
        const temp = data.toppings
  
        temp[i].owned++
        
        set(
          prev => ({
            ...prev,
            toppings: temp,
            pps: (prev.pps += topping.power),
            pizzas: (prev.pizzas -= topping.cost),
            stats: {
              ...prev.stats,
              toppings_purchased: (prev.stats.toppings_purchased += 1)
            }
          })
        )
      }
    }
  }

  useEffect(() => loadGame(), [])
  useEffect(() => saveGame(), [data])

  // Starts the timer on app load
  useEffect(() => {
    interval()

    return () => clearInterval(interval)
  }, [])

  // Runs everytime the timer changes
  useEffect(() => {
    set(
      prev => ({
        ...prev,
        pizzas: (prev.pizzas + prev.pps)
      })
    )
  }, [timer])

  if(!data) {
    return <p>Loading</p>
  } else {
    return (
      <>
        <Head>
          <title>{data.pizzas} Pizzas | Pizza Clicker</title>
        </Head>

        <Menu>
          {/* Upgrades */}
          <p className='font-bold mb-4 text-sm text-left'>Upgrades</p>
          <div className='gap-4 grid grid-cols-6 flex flex-col'>
            {
              upgrades.length > 0 &&
              upgrades.map((upgrade, i) => {
                if(!upgrade.owned) {
                  return <UpgradeItem 
                    key={i} 
                    upgrade={upgrade}
                    data={data}
                    index={i} 
                    onClick={() => purchaseUpgrade(i)} 
                  />
                } else {
                  return null
                }
              })
            }
          </div>
        </Menu>


        <div className='bg-slate-50 h-screen text-center w-full'>
          <div className='bg-slate-200 py-4 w-full'>
            <a className='cursor-pointer mb-4 text-gray-400 text-xs' onClick={() => set(initialData)}>Reset Game Data</a>
            <p className='font-bold text-center text-4xl'>
              <CountUp isCounting end={data.pizzas} duration={1} />
            </p>
            <p className='text-xs'>{data.cp} Pizzas Per Click</p>
            <p className='text-xs'>{data.pps} Pizzas p/s</p>
          </div>
          <div className='p-8'>
            <div className='gap-4 grid grid-cols-3 w-full'>
              <div>
                {/* Topping */}
                <p className='font-bold mb-4 text-sm text-left'>Toppings</p>
                {
                  toppings.length > 0 &&
                  toppings.map((topping, i) => {
                    return (
                      <button 
                        className='border rounded w-full'
                        key={i}
                        data={data}
                        index={i}
                        onClick={() => purchaseTopping(i)}
                      >
                        {topping.name} (cost: {topping.cost}) (owned: {topping.owned})
                      </button>
                    )
                  })
                }
              </div>
              <div className='flex flex-col items-center justify-center'>
                {/* Pizza */}
                <Pizza data={data} onClick={() => addPizza(data.cp)} />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}