import React,{useState} from 'react'
import c1 from '../images/backg.png'
import c2 from '../images/ellipse.png'
import { Switch } from '@headlessui/react'
import {Link} from 'react-router-dom'

function Login() {
    const [vis,setVis]=useState('password')
    const handleToggle=()=>{
        if(vis==='password')setVis('text')
        else setVis('password')
    }
    const [enabled, setEnabled] = useState(false)
  return (
    <div className='flex flex-col h-full justify-center items-center md:gap-[50px] md:flex-row lg:gap-[100px]'>
        <div className='w-[30vw] my-auto'>
        <img src={c1} alt="not found" className='my-auto'/>
        </div>
        <div className='my-auto w-1/4'>
            <div className='flex w-[160px] justify-between rounded-full border border-1 border-[#59E296] py-2 px-3'>
                <div>
                    <img src={c2} alt="not found" />
                </div>
                <div className='my-auto text-md font-medium'>Securewatch</div>
            </div>
            <div className='font-bold text-lg'>Nice to see you again</div>
            <form>
                <label htmlFor="userid" className='text-base'>Login</label>
                <br/>
                <input type="text" className='w-full rounded-md py-3 px-4 outline-none font-sans bg-[#f2f2f2]' placeholder='Email or phone number'/>
                <br />
                <label htmlFor="password" className='text-base'>Password</label>
                <br/>
                <div className='rounded-md flex flex-row justify-between bg-[#f2f2f2]'>
                <input type={vis} className='rounded-md py-3 px-4 outline-none font-sans bg-[#f2f2f2]' placeholder='Enter password'/>
                <div className='my-auto px-4 cursor-pointer' onClick={()=>{handleToggle()}}><svg className='cursor-pointer' width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 0.666687C4.36364 0.666687 1.25818 2.92851 0 6.12123C1.25818 9.31396 4.36364 11.5758 8 11.5758C11.6364 11.5758 14.7418 9.31396 16 6.12123C14.7418 2.92851 11.6364 0.666687 8 0.666687ZM8 9.7576C5.99273 9.7576 4.36364 8.1285 4.36364 6.12123C4.36364 4.11396 5.99273 2.48487 8 2.48487C10.0073 2.48487 11.6364 4.11396 11.6364 6.12123C11.6364 8.1285 10.0073 9.7576 8 9.7576ZM8 3.93941C6.79273 3.93941 5.81818 4.91396 5.81818 6.12123C5.81818 7.32851 6.79273 8.30305 8 8.30305C9.20727 8.30305 10.1818 7.32851 10.1818 6.12123C10.1818 4.91396 9.20727 3.93941 8 3.93941Z" fill="#4D4D4D"/>
</svg>
</div>
                </div>
            </form>
            <div className='flex justify-between'>
                <div className='flex'>
                <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${
        enabled ? 'bg-blue-600' : 'bg-gray-200'
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
    <div>Remember me</div>
                </div>
                <div>Forgot Password?</div>
            </div>
            <button className='mx-auto bg-[#28AA61] px-4 py-2 text-white'>Sign in</button>
            <br />
                <button className='mx-auto bg-[#000000] px-4 py-2 text-white'>Sign in with google</button>
                <div className='text-center'>
                    <span >Don't have an account?</span>
                    <Link to='/signup' className='text-blue text-[#28AA61]'>&nbsp; Sign up now</Link>
                </div>
        </div>
    </div>
  )
}

export default Login
