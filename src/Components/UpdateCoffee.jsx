import React from "react";
import { useLoaderData } from "react-router";
// import UpdateCoffee from './UpdateCoffee';
import { Swal } from "sweetalert2";

const UpdateCoffee = () => {
  
  
    const { _id, supplier, name, price, category, taste, photo, details } =
    useLoaderData();

  const handleUpdateCoffee = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedCoffee = Object.fromEntries(formData.entries());
    // console.log(updatedCoffee);

    // send coffeeto db
    fetch(`http://localhost:3000/coffees/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedCoffee),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Updates has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div>
      <h2>Update Coffee</h2>

      <div className="p-24 bg-gray-300">
        <div className="p-12 text-center space-y-4">
          <h1 className="text-6xl">Update Coffee</h1>
        </div>
        <form onSubmit={handleUpdateCoffee}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-300">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                defaultValue={name}
                className="input w-full"
                placeholder="Coffee Name"
              />
            </fieldset>

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
              <label className="label">Price</label>
              <input
                type="number"
                name="price"
                defaultValue={price}
                className="input w-full"
                placeholder="Price total"
              />
            </fieldset>

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
              <label className="label">Supplier</label>
              <input
                type="text"
                name="supplier"
                defaultValue={supplier}
                className="input w-full"
                placeholder="Supplier Name"
              />
            </fieldset>

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
              <label className="label">Category</label>
              <input
                type="text"
                name="category"
                defaultValue={category}
                className="input w-full"
                placeholder="Category Name"
              />
            </fieldset>

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
              <label className="label">Taste</label>
              <input
                type="text"
                name="taste"
                defaultValue={taste}
                className="input w-full"
                placeholder="Taste"
              />
            </fieldset>

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
              <label className="label">Details</label>
              <input
                type="text"
                name="details"
                defaultValue={details}
                className="input w-full"
                placeholder="Details"
              />
            </fieldset>
          </div>

          <fieldset className="fieldset my-6 bg-base-200 border-base-300 rounded-box  border p-4">
            <label className="label">Photo Url</label>
            <input
              type="text"
              name="photo"
              defaultValue={photo}
              className="input w-full"
              placeholder="photo url"
            />
          </fieldset>

          <input type="submit" className="btn w-full" value="Add Coffee" />
        </form>
      </div>
    </div>
  );
};

export default UpdateCoffee;
