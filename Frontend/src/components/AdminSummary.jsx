import React from 'react'
import Summarycard  from './Summarycard'
import {FaUsers,FaMoneyBillWave, FaBuilding,FaFileAlt,FaCheckCircle,FaHourglassHalf, FaTimesCircle } from 'react-icons/fa'

const AdminSummary = () => {
    return(
        
        <div className='p-6'>
            <h3 className ='text-2xl font-bold'>Dashboard Overview</h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
                 <Summarycard icon={<FaUsers />} text="Total Employees" number={250} color="bg-teal-600"/>    { /*no. of department*/}
                 <Summarycard icon={<FaMoneyBillWave />} text="Monthly Salary" number="$654"  color="bg-red-600"/>
                 <Summarycard icon={<FaBuilding />} text="Total Departments" number={5}  color="bg-yellow-600"/> 
                 
            </div>
        

        <div className='mt-12'>
            <h4 className ='text-center text-2xl font-bold'>Leave Details</h4>

             <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                <Summarycard icon={<FaFileAlt />} text="Leave Applied" number={5} color="bg-teal-600"/>     
                <Summarycard icon={<FaCheckCircle />} text="Leave Approved" number={2}  color="bg-green-600"/>
                <Summarycard icon={<FaHourglassHalf />} text="Total Pending" number={4}  color="bg-yellow-600"/> 
                <Summarycard icon={<FaTimesCircle />} text="Leave Rejected" number={1}  color="bg-red-600"/> 
           </div>
        </div>
</div> 

         )
}

export default AdminSummary