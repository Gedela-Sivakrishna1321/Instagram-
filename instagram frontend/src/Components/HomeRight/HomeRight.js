import React from 'react'
import SuggestionCard from './SuggestionCard'

const HomeRight = () => {
  return (
    <div className='' >
        <div>
            <div className='flex items justify-between'>
                <div className='flex items-center'>
                    <div>
                      <img className='w-12 h-12 rounded-full' src="https://cdn.pixabay.com/photo/2023/10/01/12/00/robin-8287309_640.jpg" alt="" />
                    </div>

                    <div className='ml-3'>
                        <p>Full Name</p>
                        <p className='opacity-70' >username</p>
                    </div>
                </div>

                <div>
                  <p className='text-blue-700 font-semibold'>Switch</p>
                </div>
                
            </div>

            <div className='space-y-5 mt-10'>
                  {[1,1,1,1].map((item, index) => <SuggestionCard key={index} />)}
            </div>
        </div>
    </div>
  )
}

export default HomeRight