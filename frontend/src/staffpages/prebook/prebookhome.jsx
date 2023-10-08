import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Example() {
    const [book, setBook] = useState(false)
    const navigate = useNavigate()



  return (
    <div 
      className="bg-transparent py-24 sm:py-32 bg-cover h-screen" 
      style={{backgroundImage: 'url(https://media.giphy.com/media/2vmiW6mcYgKst3QVDK/giphy.gif)'}}
    >     
      <h1 className=" flex text-4xl justify-center text-white mb-8 component-title">Welcome to Cheeky Dino</h1>
      <div className="flex flex-col justify-between rounded-3xl bg-transparent p-8 ring-1 ring-gray-200 xl:p-10">
        <motion.button onClick={() => navigate('/login')}
          type="button"
          className="w-full px-4 bg-purple-500 text-white py-8 border border-gray-200 rounded-lg shadow-sm hover:border-orange-300 sm:px-6 lg:px-8"
          whileHover={{ scale: 1.1 }}
        >
          Already Booked ? Click Here
        </motion.button>
       
      </div>
    </div>
  )
}
