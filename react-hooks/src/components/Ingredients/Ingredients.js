import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

const Ingredients=()=> {
  const [userIngredients,setUserIngredients]=useState([]);

  useEffect(()=>{
    fetch('https://react-hooks-65421.firebaseio.com/ingredients.json')
    .then(response =>{
      return response.json()
    })
    .then(responseData=>{
      const loadingIngredients=[];
      for (const key in responseData){
        loadingIngredients.push({
          id:key,
          title:responseData[key].title,
          amount:responseData[key].amount,
        });
      }
      setUserIngredients(loadingIngredients);
    })
  },[]); 
  const addIngredientHandler= ingredient=>{
    fetch('https://react-hooks-65421.firebaseio.com/ingredients.json',{
      method:'POST',
      body:JSON.stringify(ingredient),
      headers:{'Content-Type': 'application/json'}
    })
    .then(response =>{
      return response.json()
    })
    .then(responseData=>{
      setUserIngredients(prevIngredients=>[
        ...prevIngredients,
        { id:responseData.name,...ingredient}
      ]);
    })
  }
  return (
    <div className="App">
      <IngredientForm onaddingredient={addIngredientHandler} onRemoveItem={()=>{}}/>

      <section>
        <Search />
        <IngredientList ingredients={userIngredients}/>
      </section>
    </div>
  );
}

export default Ingredients;
