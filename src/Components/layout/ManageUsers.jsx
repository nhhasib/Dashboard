import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const token = localStorage.getItem("access-token");
  const { data: users = [], refetch } = useQuery(["allUsers"], async () => {
    const res = await fetch("http://localhost:5000/allUsers", {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.json();
  });

  const handleAdmin = (user) => {
    fetch(`http://localhost:5000/users/admin/${user._id}`, {
      method: "PATCH",
      headers: {
        authorization: `bearer ${token}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${user.name} make admin successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  const handleDoctor = (user) => {
    fetch(
      `http://localhost:5000/users/doctor/${user._id}`,
      {
        method: "PATCH",
        headers: {
          authorization: `bearer ${token}`,
        }
      }
    )
      .then((res) => res.json())
      .then((data) => {
        
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${user.name} make instructor successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleCustomer = (user) => {
    fetch(`http://localhost:5000/users/customer/${user._id}`, {
      method: "PATCH",
      headers: {
        authorization: `bearer ${token}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${user.name} make student successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    };
    
    return (
        <div className="w-11/12 mx-auto">
      {/* <Helmet>
                <title>MusiQuest | All Users</title>
            </Helmet> */}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-lg">
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>User Role</th>
              <th>Change Role</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role == "admin"
                    ? "Admin"
                    : user.role == "doctor"
                    ? "Doctor"
                    : "Customer"}
                </td>
                <td>
                  <div className="flex items-center gap-4">
                    {user.role == "admin" ? (
                      <div className="flex gap-4 items-center">
                        <button
                          onClick={() => handleDoctor(user)}
                          className="button"
                        >
                          Instructor
                        </button>
                        <button
                          onClick={() => handleCustomer(user)}
                          className="button"
                        >
                          Student
                        </button>
                      </div>
                    ) : user.role === "doctor" ? (
                      <div className="flex gap-4 items-center">
                        <button
                          onClick={() => handleAdmin(user)}
                          className="button"
                        >
                          Admin
                        </button>
                        <button
                          onClick={() => handleCustomer(user)}
                          className="button"
                        >
                          Student
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-4 items-center">
                        <button
                          onClick={() => handleAdmin(user)}
                          className="button"
                        >
                          Admin
                        </button>
                        <button
                          onClick={() => handleDoctor(user)}
                          className="button"
                        >
                          Instructor
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default ManageUsers;