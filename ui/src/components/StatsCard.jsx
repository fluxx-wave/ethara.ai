
const StatsCard = ({title,icon,Value}) =>{
  return (
    <div className='transition ease-in-out p-2 shadow border border-slate-200 w-50 rounded hover:bg-violet-50 hover:text-violet-800 hover:border-violet-300 '>
      <p className='flex items-center' >  <span className='bg-violet-200 p-1 rounded-full mx-1 text-violet-800'> {icon} </span>   {title} </p>
      <p className=' font-bold text-4xl my-1 mx-3 '> {Value} </p>
    </div>
  )

}

export default StatsCard