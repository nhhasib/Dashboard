import { useContext } from "react";

import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../authProvider/AuthProvider";

const AddItems = () => {
  const { user } = useContext(AuthContext);

  const handleAdditems = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const doctor = form.doctor.value;
    const price = form.price.value;
    const description = form.description.value;
    const duration = form.duration.value;
    const level = form.level.value;
    const itemData = {
      name: name,
      email: email,
      image: photo,
      doctor: doctor,
      price: price,
      description: description,
      duration: duration,
      level: level,
      status: "pending",
    };

    axios
      .post("https://dashboard-server-livid.vercel.app/items", itemData)
      .then((data) => {
        if (data.data.insertedId) {
          // refetch();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Created new items successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
        }
      });
  };

  return (
    <div>
      <h1 className="font-bold text-4xl text-center">Add new item</h1>

      <div className="hero w-4/5 mx-auto bg-base-200">
        <div className="hero-content">
          <div className="card flex-shrink-0 shadow-2xl bg-base-100">
            <div className="card-body">
              <form onSubmit={handleAdditems}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Item name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your item name"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Item Photo URL</span>
                  </label>
                  <input
                    type="url"
                    name="photo"
                    placeholder="Enter your item Photo link"
                    className="input input-bordered"
                  />
                </div>

                <div className="flex justify-between gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Doctor name</span>
                    </label>
                    <input
                      type="text"
                      name="doctor"
                      defaultValue={user?.displayName}
                      placeholder="email"
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Doctor Email</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={user?.email}
                      placeholder="email"
                      className="input input-bordered"
                    />
                  </div>
                </div>
                <div className="flex justify-between gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Duration</span>
                    </label>
                    <input
                      type="text"
                      name="duration"
                      placeholder="Enter duration of class"
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Level</span>
                    </label>
                    <input
                      type="text"
                      name="level"
                      placeholder="Enter class level"
                      className="input input-bordered"
                    />
                  </div>
                </div>
                <div className="flex justify-between gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Price</span>
                    </label>
                    <input
                      type="text"
                      name="price"
                      placeholder="Enter Price"
                      className="input input-bordered"
                    />
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Items Description</span>
                  </label>
                  <input
                    type="text"
                    name="description"
                    placeholder="Write about your class"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control mt-6">
                  <button className="button">Add new item</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItems;
