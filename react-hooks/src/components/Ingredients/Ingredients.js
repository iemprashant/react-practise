import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

const Ingredients=()=> {
  const [userIngredients,setUserIngredients]=useState([]);

  const filterIngredientHandler = useCallback(filterIngredient=>{
    setUserIngredients(filterIngredient);
  },[])
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
        <Search onLoadIngredients={filterIngredientHandler}/>
        <IngredientList ingredients={userIngredients}/>
      </section>
    </div>
  );
}

export default Ingredients;
