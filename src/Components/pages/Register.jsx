import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../authProvider/AuthProvider";
import SocialMediaLogin from "../socialMediaLogin/SocialMediaLogin";

const Register = () => {
  const { createUser, updateUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    const name = data.name;
    const photo = data.photo;
    const gander = data.gander;
    const number = data.number;
    const address = data.address;
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser(name, photo, gander, number, address)
          .then(() => {
            const saveUser = { name: name, email: email, role: "student" };
            fetch("https://musi-quest-server.vercel.app/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(saveUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  reset();
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User created successfully.",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              });
          })
          .catch();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Helmet>
                <title>MusiQuest | Register</title>
            </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content">
          <div className="card flex-shrink-0 shadow-2xl bg-base-100">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    name="name"
                    placeholder="Enter Name"
                    className="input input-bordered"
                  />
                  {errors.name && (
                    <span className="text-red-600">Name is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    name="email"
                    placeholder="Enter Email"
                    className="input input-bordered w-[600px]"
                  />
                  {errors.email && (
                    <span className="text-red-600">Email is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern:
                        /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                    })}
                    name="password"
                    placeholder="Enter password"
                    className="input input-bordered"
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-red-600">Password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-600">
                      Password must be 6 characters
                    </p>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <p className="text-red-600">
                      Password must be less than 20 characters
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-600">
                      Password must have one Uppercase one lower case, one
                      number and one special character.
                    </p>
                  )}
                </div>
                <div className="flex gap-4 justify-between">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Photo URL</span>
                    </label>
                    <input
                      type="url"
                      {...register("Photo", { required: true })}
                      name="Photo"
                      placeholder="Enter Photo"
                      className="input input-bordered"
                    />
                    {errors.Photo && (
                      <span className="text-red-600">Photo is required</span>
                    )}
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Gander</span>
                    </label>
                    <select {...register("gender")}>
                      <option value="female">Male</option>
                      <option value="male">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Phone Number</span>
                    </label>
                    <input
                      type="text"
                      {...register("number", { required: true })}
                      name="number"
                      placeholder="Enter number"
                      className="input input-bordered"
                    />
                    {errors.number && (
                      <span className="text-red-600">Number is required</span>
                    )}
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Address</span>
                  </label>
                  <input
                    type="text"
                    {...register("address", { required: true })}
                    name="address"
                    placeholder="Enter address"
                    className="input input-bordered"
                  />
                  {errors.address && (
                    <span className="text-red-600">Address is required</span>
                  )}
                </div>
                <div className="form-control mt-6">
                  <button className="button">Register</button>
                </div>
              </form>
              <SocialMediaLogin></SocialMediaLogin>
              <p className="text-center">
                New to Here? Please{" "}
                <Link to="/login">
                  <span className="underline text-red-800">login</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
