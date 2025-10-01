import React from "react";
import Swal from "sweetalert2";
import { Link } from "react-router";
import UpdateCoffee from "./UpdateCoffee";
const CoffeeCard = ({ coffee, coffees, setCoffees }) => {
  const { _id, photo, name, price, taste } = coffee;

  const handleDelete = (_id) => {
    console.log(_id);

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
        //start deleting
          

        fetch(
          `https://coffee-store-server-rust-five.vercel.app/coffees/${_id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to delete");
            }
            return res.json();
          })
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your coffee has been deleted.",
                icon: "success",
              });

              //remove coffees from the state
              const remainingCoffees = coffees.filter((cof) => cof._id !== _id);
              setCoffees(remainingCoffees);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
      }
    });
  };

  return (
    <div className="card card-side bg-base-100 shadow-sm border-2 items-center mt-12 ">
      <figure>
        <img src={photo} alt="Movie" />
      </figure>
      <div className="flex justify-around w-full">
        <div>
          <h2 className="card-title">{name}</h2>
          <p>Price : {price}</p>
          <p>Taste : {taste}</p>
        </div>
        <div className="card-actions justify-end space-y-2 ">
          <div className="join join-vertical">
            <Link to={`/coffee/${_id}`}>
              <button className="btn join-item">View</button>
            </Link>
            <Link to={`/updatecoffee/${_id}`}>
              <button className="btn join-item">Edit</button>
            </Link>
            <button onClick={() => handleDelete(_id)} className="btn join-item">
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
