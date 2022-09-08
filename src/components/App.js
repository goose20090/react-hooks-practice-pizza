import React, {useState} from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {

  const initialState= {
    topping: "",
    size: "Small",
    vegetarian: true

  }

  const [formData, setFormData]= useState(initialState)

  function handleFormChange(e){
    console.log(e.target.name)
    console.log(formData.vegetarian)
    let value = e.target.value
    if (e.target.name === "vegetarian"){
      value = ![formData.vegetarian]
      console.log(value)
    }

    setFormData({
      ...formData,
      [e.target.name]: value
    
    })
  }

  function onEditClick(e){
    let clickedPizzaRow = e.target.parentNode.parentNode.childNodes
    let clickedPizzaTopping = clickedPizzaRow[0].textContent
    let clickedPizzaSize = clickedPizzaRow[1].textContent
    let clickedPizzaVeg
    if (clickedPizzaRow[2].textContent === "Yes"){
       clickedPizzaVeg = true
    }
    else { clickedPizzaVeg = false}

    setFormData({
      ...formData,
      topping: `${clickedPizzaTopping}`,
      size: `${clickedPizzaSize}`,
      vegetarian: clickedPizzaVeg
    })
  }
  return (
    <>
      <Header />
      <PizzaForm handleFormChange = {handleFormChange} formData = {formData}/>
      <PizzaList onEditClick= {onEditClick}/>
    </>
  );
}

export default App;
