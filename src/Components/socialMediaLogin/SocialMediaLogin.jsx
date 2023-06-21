import React, { useContext } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { AuthContext } from "../authProvider/AuthProvider";

const SocialMediaLogin = () => {
  const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        const saveUser = {
          name: user.displayName,
          email: user.email,
          role: "customer",
        };
        fetch("https://dashboard-server-livid.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "User created and login successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
            }
            navigate("/");
          })
          // navigate('/')
          .catch();
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="flex flex-col mx-auto text-center items-center my-4">
      <div className="gap-4 flex m-2">
        <button
          onClick={handleGoogleLogin}
          className="border-2 border-black rounded-full p-2"
        >
          <p className="text-2xl">
            <FaGoogle></FaGoogle>
          </p>
        </button>
        <button className="border-2 border-black rounded-full p-2">
          <p className="text-2xl">
            <FaGithub></FaGithub>
          </p>
        </button>
      </div>
    </div>
  );
};

export default SocialMediaLogin;
