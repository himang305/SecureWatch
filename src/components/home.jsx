import React from 'react'
import Navbar from './navbar'
import Home from '../images/home1.png'
import Security from '../images/security.png'
import c1 from '../images/c1.png'
import c2 from '../images/c2.png'
import c3 from '../images/c3.png'
import c4 from '../images/c4.png'
import c5 from '../images/Rocket.png'
import '../index.css'
import c12 from '../images/c12.png'
import c13 from '../images/c13.png'
import c14 from '../images/c14.png'
import c15 from '../images/c15.png'
import c16 from '../images/c16.png'
import c17 from '../images/c17.png'
import c18 from '../images/c18.png'
import c19 from '../images/c19.jpeg'

function home() {
  return (
    <>
    <div className='p-8 lg:p-16'  style={{'backgroundColor':'#F5F5F4'}}>
    <div id='home_heading' className='p-2 md:p-0 rounded-2xl pt-10 flex flex-col justify-center items-center' style={{'border':'1px solid',
    'borderImageSource': 'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%)'}}>
      {/* <Navbar/> */}
      <button className='rounded-2xl px-4 py-2 text-white bg-black mt-10 flex gap-2'>
        <div> Confidence in every transaction</div>
       <img src={c5} alt="not found" />
        </button>
      <div className='text-5xl mt-10'>Empower Your Transactions with </div>
      <div className='mt-1'>
        <span className='text-[#107F41] text-5xl'>SecureWatch’s</span>
        <span className='text-5xl'> Real-Time Confidence.</span>
      </div>
      <div className='text-[#8F8F8F] mt-10'>Unlock the Future of Transaction Security – Proactive Monitoring, &hearts;</div>
      <div className='text-[#8F8F8F]'>Intuitive Insights, and Seamless Scalability Await You with SecureWatch</div>
      <button className='rounded-2xl px-4 py-2 text-white bg-black mt-10 flex gap-2'>
        <div>
        Start for free</div>
        <div className='my-auto'><svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.58793 9.98251L12.4053 5.16512L7.58793 0.347723L6.6435 1.29316L9.84674 4.4964H0.0976562V5.83384H9.84674L6.6435 9.03708L7.58793 9.98251Z" fill="white"/>
</svg>
</div>
      </button>
      <div className='text-base text-[#707070] mt-5 flex gap-2'>
        <div>Free Plan</div>
        <img src={c19} alt="" className='w-2 h-2 my-auto'/>
        <div>No card required</div>
        </div>
      <div className='mt-10'>
      <img src={Home} alt="" /></div>
      </div>
      <div className='text-3xl lg:text-5xl text-center my-16'>
      Essential Components
      <span className='text-[#43576C]'>&nbsp; 📡 Monitoring &nbsp;</span>
      <span className='text-[#D62C1C]'>🚨 Anomalies &nbsp;</span>
      with Empowering
      <span className='text-[#02B718]'>&nbsp;📊 Dashboards&nbsp;</span>
      </div>
      <div className='grid grid-cols-1 grid-rows-4 w-full md:grid-cols-2 md:grid-rows-2 md:w-4/6 md:mx-auto'>
        <div className='rounded-3xl mx-4' style={{border:'1px solid #E5E7EB'}}>
            <img src={c1} alt="" />
            <div className='text-xl px-4 py-2'>Fortifying Transaction Integrity</div>
            <div className='px-4 py-2 pb-4'>Real-time analysis using advanced algorithms to scrutinize every transaction, ensuring the security of critical transactions within web applications.</div>
        </div>
        <div className='rounded-3xl mt-4 md:mt-0 mx-4' style={{border:'1px solid #E5E7EB'}}>
            <img src={c2} alt="" />
            <div className='text-xl px-4 py-2'>Anomaly Detection System</div>
            <div className='px-4 py-2 pb-4'>Constantly adapting this system triggers instant alerts upon detecting deviations, supporting company-level alerting rules and efficient case management.</div>
        </div><div className='rounded-3xl mt-4 mx-4' style={{border:'1px solid #E5E7EB'}}>
            <img src={c3} alt="" />
            <div className='text-xl px-4 py-2'>Secure Dashboard</div>
            <div className='px-4 py-2 pb-4'> A user-friendly dashboard offering customizable views, real-time analytics, and historical data for  decision-making in monitoring critical transactions.</div>
        </div><div className='rounded-3xl mt-4 mx-4' style={{border:'1px solid #E5E7EB'}}>
            <img src={c4} alt="" />
            <div className='text-xl px-4 py-2'>Compliance and Reporting</div>
            <div className='px-4 py-2 pb-4'>Built-in reporting ensures regulatory compliance, generating comprehensive reports for audits and data integrity commitment.</div>
        </div>
      </div>
      <div className='text-3xl md:text-5xl mt-20 text-center'>Benefits</div>
      <div className='text-[#4B5563] mt-4 text-center'>Empowering Security, Trust, </div>
      <div className='text-[#4B5563] text-center'>Compliance, Growth, and Peace of Mind</div>
      <div className='w-full grid grid-cols-1 grid-rows-5 md:grid-cols-2 md:grid-rows-3 md:w-4/6 mx-auto mt-5'>
        
            <div className='rounded-xl mx-3 p-6' style={{'border':'2px solid #E5E5E5'}}>
                <img src={Security} alt="" />
                <div className='text-3xl'>Proactive Security</div>
                <div>Identify and address potential security threats in real-time with advanced algorithms and continuous monitoring, ensuring the integrity of critical transactions</div>
            </div>
            <div className='rounded-xl mx-3  p-6 mt-4 md:mt-0' style={{'border':'2px solid #E5E5E5'}}>
            <img src={c12} alt="" />
                <div className='text-3xl'>User Confidence</div>
                <div>Build trust with your users by safeguarding their critical transactions, providing a secure environment that fosters confidence and loyalty.</div>
            </div>
            <div className='rounded-xl mt-4 mx-3  p-6' style={{'border':'2px solid #E5E5E5'}}>
                <img src={c13} alt="" />
                <div className='text-3xl'>Peace of Mind</div>
                <div>Focus on business growth while SecureWatch takes care of transaction security, providing you peace of mind and allowing you to concentrate on strategic objectives.</div>
            </div>
            <div className='rounded-xl  mt-4 mx-3  p-6' style={{'border':'2px solid #E5E5E5'}}>
            <img src={c14} alt="" />
                <div className='text-3xl'>Compliance Assurance</div>
                <div>Meet regulatory requirements effortlessly with SecureWatch's built-in reporting features, facilitating audits and demonstrating a commitment to data integrity and compliance.</div>
            </div>
            <div className='rounded-xl  mt-4 mx-3  p-6' style={{'border':'2px solid #E5E5E5'}}>
                <img src={Security} alt="" />
                <div className='text-3xl'>Scalability</div>
                <div>Grow your business with confidence, knowing that SecureWatch's scalable architecture adapts to the evolving needs of your operations, effortlessly.</div>
            </div>
      </div>
      <div className='w-full text-center md:w-1/2 mx-auto text-3xl md:text-5xl mt-14'>Try SecureWatch now, it's free 
and easy to set up</div>
<div className='w-full mx-auto text-center'>
<button className='rounded-full px-4 py-2 text-white mx-auto bg-black my-5'>Sign Up-it's free</button>
    <br />
    <span className='p-2 bg-white text-center rounded-md px-6'>Need help or have questions?</span>
    <div className='mt-14 flex justify-center flex-wrap'>
        <span className='mx-2   '>
            Transaction Monitor
        </span>
        <span className='mx-2 flex gap-2'>
            <img src={c15} alt="" className='w-2 h-2 my-auto' />
            <div>Secure Dashboard</div>
            </span>
        <span className='mx-2 flex gap-2'>
            <img src={c16} alt="" className='w-2 h-2 my-auto'/>
            <div>Anomaly Detection System</div>
            </span>
    </div>
    <div className='mt-2 flex justify-center flex-wrap'>
        <span lassName='mx-2'>
        Alert and Notification System
        </span>
        <span className='mx-2 flex gap-2'>
            <img src={c17} alt=""  className='w-2 h-2 my-auto'/>
            <div>Integration APIs</div>
            </span>
        <span className='mx-2 flex gap-2'>
            <img src={c18} alt="" className='w-2 h-2 my-auto'/>
            <div>Scalable Architecture</div>
            </span>
    </div>
    <div className='mt-2'>Compliance and Reporting</div>
    </div>
    
</div>
    </>
  )
}

export default home
