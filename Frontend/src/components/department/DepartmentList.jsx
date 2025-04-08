import React from 'react'
import {Link } from 'react-router-dom'
import DataTable from 'react-dat-table-component'
import { columns } from "../../utils/DepartmentHelper";
import axios from "axios";

const DepartmentList = () => {
    const[departments, setDepartments] = useState ([])
    const [depLoading, setDepLoading] = useState(false)
   
    useEffect(() => {
        const fetchDepartments = async () => {
            setDepLoading(true)
            try {
                const responce = await axios.get('http://localhost:5000/api/department',{
                   headers:{
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                   }
                })
                if(responce.data.success){
                let sno = 1;
                    const data = await responce.data.departments.map((dep) => (
                        {
                            _id: dep._id,
                            sno: sno++,
                            dep_name: dep.dep_name,
                            action:<DepartmentButtons _id={dep._id}/>,
                        }
                    ));
                    setDepartments(data);    
                }
            }catch(error){
                if(error.response && !error.response.data.success){
                    alert(error.response.data.error)
                }
            }finally{
              setDepLoading(false)  
            }
        };
        fetchDepartments();
    },[]) 


    return (
        <>{depLoading ? <div>Loading...</div>:

        <div className='p-5'>
            <div className='text-center'>
                <h3 className='text-2xl font-bold'>Manage Department</h3>
            </div>
            <div className="flex justify-between items-center">
                <input 
                type="text" 
                placeholder='Search By Dep Name' 
                className='px-4 py-0.5 border'/>
                <Link 
                to="/admin-dashboard/add-department" 
                className='px-4 py-1 bg-teal-600 rounded text-white'>
                Add New Department
                </Link>
            </div>
            <div clasName="mt-5">
                <DataTable
                   columns={columns}
                   data={departments}
                />
            </div>
        </div>
        }</>
    );
}

export default DepartmentList