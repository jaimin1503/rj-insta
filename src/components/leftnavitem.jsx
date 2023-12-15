import React from 'react'

function Leftnavitem({icon,name,action}) {
  return (
    <div className='flex items-center justify-start gap-5 py-3 cursor-pointer' onClick={action} >
        <div className='text-white text-xl'>
            {icon}
        </div>
        <div className='text-black text-xl'>
            {name}
        </div>
    </div>
  )
}

export default Leftnavitem