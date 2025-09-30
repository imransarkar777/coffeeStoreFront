import React from "react";
import { useLoaderData } from "react-router";
import CoffeeCard from "./CoffeeCard";
import { useState } from "react";

const Home = () => {
  const initialCoffees = useLoaderData();
  // console.log(coffees);

  const [coffees, setCoffees] = useState(initialCoffees);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coffees.map((coffee) => (
          <CoffeeCard
            coffee={coffee}
            key={coffee._id}
            setCoffees={setCoffees}
            coffees={coffees}
          ></CoffeeCard>
        ))}
      </div>
    </div>
  );
};

export default Home;
