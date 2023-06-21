import { useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

import { AuthContext } from "../authProvider/AuthProvider";

const MyItems = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("access-token");
  const { data: myItems = [], refetch } = useQuery(
    ["myClass", user?.email],
    async () => {
      const res = await fetch(
        `https://dashboard-server-livid.vercel.app/myItems/?email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      );
      return res.json();
    }
  );

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://dashboard-server-livid.vercel.app/myItems/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your items has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <div className="w-11/12 mx-auto">
      
      <div className="uppercase font-semibold flex justify-evenly items-center my-4 bg-orange-600 py-4 text-white rounded-xl">
        <h3 className="text-3xl">Total Items: {myItems?.length}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th> Items Name</th>
              <th>Doctor</th>
              <th>Duration</th>
              <th>Level</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myItems?.map((i, index) => (
              <tr key={i._id}>
                <th>{index + 1}</th>
                <td>{i.name}</td>
                <td>{i.doctor}</td>
                <td>{i.duration}</td>
                <td>{i.level}</td>
                <td>${i.price}</td>
                <td>{i.status}</td>
                <td>
                  <td>
                    <button
                      onClick={() => handleDelete(i)}
                      className="btn btn-ghost text-white bg-red-700"
                    >
                      <FaTrashAlt></FaTrashAlt>
                    </button>
                  </td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyItems;
