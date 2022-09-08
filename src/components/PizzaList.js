import React, { useEffect, useState } from "react";
import Pizza from "./Pizza";

function PizzaList({onEditClick}) {

  const [pizzas, setPizzas] = useState([])

  useEffect(()=>{
    fetch("http://localhost:3001/pizzas")
    .then(res=>res.json())
    .then(returnedPizzas=>{ 
      console.log(returnedPizzas)
      setPizzas(returnedPizzas)
      console.log(pizzas)})
  }, [])


  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Topping</th>
          <th scope="col">Size</th>
          <th scope="col">Vegetarian?</th>
          <th scope="col">Edit</th>
        </tr>
      </thead>
      <tbody>
      {pizzas.map(pizza => <Pizza key = {pizza.id} onEditClick = {onEditClick} topping = {pizza.topping} size = {pizza.size} vegetarian = {pizza.vegetarian}></Pizza>)}
      </tbody>
    </table>
  );
}

export default PizzaList;
