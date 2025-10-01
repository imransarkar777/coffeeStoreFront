import React from "react";
import { AuthContext } from "../context/AuthContext";
// import { Swal } from "sweetalert2";
import Swal from "sweetalert2";
import { useContext } from "react";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  console.log(createUser);

  const handleSignUp = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const { email, password, ...restFormData } = Object.fromEntries(
      formData.entries()
    );

    // create user on firebase
    createUser(email, password)
      .then((result) => {
        console.log(result.user);

        const userProfile = {
          email,
          ...restFormData,
          creationTime: result.user?.metadata?.creationTime,
          lastSignInTime: result.user?.metadata?.lastSignInTime,
        };
        console.log(email, password, userProfile);
        //save user  infos to db
        fetch("https://coffeeserver-ujut.onrender.com/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userProfile),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your Account has been Created",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((e) => {
            console.log("Something went wrong: ", e);
            // You can use a SweetAlert for the error too
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: e.message,
            });
          });
      })
      .catch((e) => {
        console.log("something wrong ", e);
      });
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img
              src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
              className="max-w-sm rounded-lg shadow-2xl"
            />
          </div>

          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Create An Account Now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>

          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSignUp} className="fieldset">
                {/* name  */}
                <label className="label">Name</label>
                <input
                  type="text"
                  className="input"
                  name="name"
                  placeholder="Full Name"
                />

                {/* phooto */}
                <label className="label">Photo URL</label>
                <input
                  type="url"
                  className="input"
                  name="photo"
                  placeholder="photo url"
                />

                {/* address  */}
                <label className="label">Address</label>
                <input
                  type="text"
                  className="input"
                  name="address"
                  placeholder="Full Name"
                />

                {/* email  */}
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  name="email"
                  placeholder="Email"
                />

                {/* phone number  */}
                <label className="label">Phone Number</label>
                <input
                  type="number"
                  className="input"
                  name="number"
                  placeholder="Phone number"
                />

                {/* password  */}
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                />

                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn mt-4">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
