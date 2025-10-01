import React from "react";
import Swal from "sweetalert2";
const AddCoffee = () => {
  // handle
  //
  const handleAddCoffee = (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);
    const newCoffee = Object.fromEntries(formData.entries());

    console.log(newCoffee);

    // send data to the backend
    // create post in back and then fetch() here
    fetch(
      "https://coffee-store-server-lk2eugtoy-imran-sarkar-setus-projects.vercel.app//coffees",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newCoffee),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          console.log("added on db successfully");
          Swal.fire({
            title: "Coffee added successfull. ",
            icon: "success",
            draggable: true,
          });
          form.reset();
        }
      });
  };

  //return of component

  return (
    <div className="p-24 bg-gray-300">
      <div className="p-12 text-center space-y-4">
        <h1 className="text-6xl">Add Coffee</h1>
        <p>
          It is a long established fact that a reader will be distraceted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using Content here.
        </p>
      </div>
      <form onSubmit={handleAddCoffee}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-300">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              className="input w-full"
              placeholder="Coffee Name"
            />
          </fieldset>

          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
            <label className="label">Price</label>
            <input
              type="number"
              name="price"
              className="input w-full"
              placeholder="Price total"
            />
          </fieldset>

          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
            <label className="label">Supplier</label>
            <input
              type="text"
              name="supplier"
              className="input w-full"
              placeholder="Supplier Name"
            />
          </fieldset>

          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
            <label className="label">Category</label>
            <input
              type="text"
              name="category"
              className="input w-full"
              placeholder="Category Name"
            />
          </fieldset>

          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
            <label className="label">Taste</label>
            <input
              type="text"
              name="taste"
              className="input w-full"
              placeholder="Taste"
            />
          </fieldset>

          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
            <label className="label">Details</label>
            <input
              type="text"
              name="details"
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
            className="input w-full"
            placeholder="photo url"
          />
        </fieldset>

        <input type="submit" className="btn w-full" value="Add Coffee" />
      </form>
    </div>
  );
};

export default AddCoffee;
