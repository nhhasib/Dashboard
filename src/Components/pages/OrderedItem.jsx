import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../authProvider/AuthProvider";

const OrderedItem = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("access-token");
  const { data: orderedItem = [], refetch } = useQuery(
    ["items/ordered", user?.email],
    async () => {
      const res = await fetch(
        `https://dashboard-server-livid.vercel.app/users/items/ordered/?email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      );
      return res.json();
    }
  );

  const total = orderedItem?.reduce((sum, item) => item.price + sum, 0);

  return (
    <div className="w-11/12 mx-auto">
      <div className="uppercase font-semibold flex justify-evenly items-center my-4 bg-orange-600 py-4 text-white rounded-xl">
        <h3 className="text-3xl">Total ordered item: {orderedItem?.length}</h3>
        <h3 className="text-3xl">Total Payment Done: ${total}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Doctor</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orderedItem?.map((i, index) => (
              <tr key={i._id}>
                <th>{index + 1}</th>
                <td>
                  <img
                    className="rounded-full w-16 h-16"
                    src={i.image}
                    alt=""
                  />
                </td>
                <td>{i.name}</td>
                <td>{i.instructor}</td>
                <td>${i.price}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderedItem;
