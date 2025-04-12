import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { DepartmentButtons } from '../../utils/DepartmentHelper';
import axios from 'axios';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  // Handles removal of a department from UI after deletion
  const onDepartmentDelete = async (id) => {
    const updatedList = departments.filter((dep) => dep._id !== id);
    setDepartments(updatedList);
    setFilteredDepartments(updatedList);
  };

  // Columns for DataTable
  const columns = [
    {
      name: 'S No',
      selector: (row) => row.sno,
      sortable: true,
    },
    {
      name: 'Department Name',
      selector: (row) => row.dep_name,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <DepartmentButtons id={row._id} onDepartmentDelete={onDepartmentDelete} />
      ),
    },
  ];

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Unauthorized: Please log in again.');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/department', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
          }));
          setDepartments(data);
          setFilteredDepartments(data);
        } else {
          alert(response.data.error || 'Failed to fetch departments');
        }
      } catch (error) {
        console.error('Fetch Departments Error:', error);
        alert(error?.response?.data?.error || 'Server error fetching departments');
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  // Search filter
  const filterDepartments = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(searchTerm)
    );
    setFilteredDepartments(filtered);
  };

  return (
    <>
      {depLoading ? (
        <div className="text-center py-5">Loading departments...</div>
      ) : (
        <div className="p-5">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold">Manage Department</h3>
          </div>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search By Department Name"
              className="px-4 py-1 border border-gray-300 rounded"
              onChange={filterDepartments}
            />
            <Link
              to="/admin-dashboard/add-department"
              className="px-4 py-1 bg-teal-600 rounded text-white hover:bg-teal-700 transition"
            >
              Add New Department
            </Link>
          </div>
          <DataTable
            columns={columns}
            data={filteredDepartments}
            pagination
            highlightOnHover
            pointerOnHover
            striped
          />
        </div>
      )}
    </>
  );
};

export default DepartmentList;
