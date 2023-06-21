
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

import useSelectedItems from "../Hook/UseSelecetedItems";

const SelectedItem = () => {
  const [selectedItems, refetch] = useSelectedItems();

  // const { name, price, instructor } = selectedClasses;

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
        fetch(
          `http://localhost:5000/selectedItems/${item._id}`,
          {
            method: "DELETE",
          }
        )
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

  const total = selectedItems?.reduce((sum, item) => item.price + sum, 0);

  return (
    <div className="w-11/12 mx-auto">
      <div className="uppercase font-semibold flex justify-evenly items-center my-4 bg-orange-600 py-4 text-white rounded-xl">
        <h3 className="text-3xl">Total Items: {selectedItems?.length}</h3>
        <h3 className="text-3xl">Total Price: ${total}</h3>
        
          <button className="btn btn-warning btn-sm">PAY</button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Item</th>
              <th>Doctor</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedItems?.map((i, index) => (
              <tr key={i._id}>
                <th>{index + 1}</th>
                <td>{i.name}</td>
                <td>{i.doctor}</td>
                <td>${i.price}</td>
                <td>
                  <td>
                    <button
                      onClick={() => handleDelete(cls)}
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

export default SelectedItem;
