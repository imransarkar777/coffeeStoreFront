import React from "react";
import { use } from "react";
import { AuthContext } from "../context/AuthContext";

const SignIn = () => {
  const { signInUser } = use(AuthContext);

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const pass = form.password.value;
    console.log(email, pass);

    // send to firebase
    signInUser(email, pass).then((res) => {
      console.log(res.user);
      const signInInfo = {
        email,
        lastSignIntime: res.user?.metadata?.lastSignInTime,
      };
      //update last sign in to the database

      fetch(`https://coffeeserver-ujut.onrender.com/users`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(signInInfo),
      });
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
            <h1 className="text-5xl font-bold">Sign In Now !!</h1>
          </div>

          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSignIn} className="fieldset">
                {/* email  */}
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  name="email"
                  placeholder="Email"
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
                <button className="btn mt-4">Sign In</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
