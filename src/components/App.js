import React, {useState, useEffect, useRef} from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {

  // Pizza State and fetch
  const [pizzas, setPizzas] = useState([])
  const pizzaEditId = useRef(null)

  useEffect(()=>{
    fetch("http://localhost:3001/pizzas")
    .then(res=>res.json())
    .then(returnedPizzas=> setPizzas(returnedPizzas))
  }, [])

  // Controlled Form Data state
  const initialState= {
    topping: "",
    size: "Small",
    vegetarian: true

  }

  const [formData, setFormData]= useState(initialState)


  // Handling Form Changes and Edit Pizza clicks
  function handleFormChange(e){

    
    let value = e.target.value
    if (e.target.name === "vegetarian"){
      value = !formData.vegetarian
    }
    
    setFormData({
      ...formData,
      [e.target.name]: value,
    })
  }

  function onEditClick(pizza){
    pizzaEditId.current = pizza.id
    setFormData({
      ...formData,
      topping: `${pizza.topping}`,
      size: `${pizza.size}`,
      vegetarian: pizza.vegetarian
    })
  }

  //   Handling Form Submit and updating Pizza List
  
  function handleSubmit(e){
    e.preventDefault();
    fetch(`http://localhost:3001/pizzas/${pizzaEditId.current}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "topping": `${formData.topping}`,
        "size": `${formData.size}`,
        "vegetarian": formData.vegetarian
      })
    })
    .then(res=> res.json())
    .then((patchedPizza)=> updatePizzas(patchedPizza))
  }

  function updatePizzas(patchedPizza){
    let updatedPizzas= pizzas.map((pizza)=> {
      if (pizza.id === patchedPizza.id){
        return patchedPizza
      }
      else {
        return pizza
      }
    })
    setPizzas(updatedPizzas)

  }
  return (
    <>
      <Header />
      <PizzaForm handleSubmit= {handleSubmit} handleFormChange = {handleFormChange} formData = {formData}/>
      <PizzaList pizzas = {pizzas} onEditClick= {onEditClick}/>
    </>
  );
}

export default App;
