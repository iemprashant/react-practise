import React, { useState,useCallback } from 'react';
import ErrorModal from '../UI/ErrorModal'
import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

const Ingredients=()=> {
  const [userIngredients,setUserIngredients]=useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [error,setError]=useState();

  const filterIngredientHandler = useCallback(filterIngredient=>{
    setUserIngredients(filterIngredient);
  },[])

  const addIngredientHandler= ingredient=>{
    setIsLoading(true);
    fetch('https://react-hooks-65421.firebaseio.com/ingredients.json',{
      method:'POST',
      body:JSON.stringify(ingredient),
      headers:{'Content-Type': 'application/json'}
    })
    .then(response =>{
      setIsLoading(false);
      return response.json()
    })
    .then(responseData=>{
      setUserIngredients(prevIngredients=>[
        ...prevIngredients,
        { id:responseData.name,...ingredient}
      ]);
    })
  };
  const removeIngredientHandler = ingredientId => {
    setIsLoading(true);
    fetch(
      `https://react-hooks-65421.firebaseio.com/ingredients/${ingredientId}.json`,
      {
        method: 'DELETE'
      }
    ).then(response => {
      setIsLoading(false);
      setUserIngredients(prevIngredients =>
        prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
      );
    }).catch(error =>setError(error.message));
  };
  const clearErrorHandler=()=>{
    setError(null);
    setIsLoading(false);
  }
  return (
    <div className="App">
      {error && <ErrorModal onClose={clearErrorHandler}>{error}</ErrorModal>}
      <IngredientForm 
      onaddingredient={addIngredientHandler} 
      onRemoveItem={()=>{}}
      loading={isLoading}/>
      <section>
        <Search onLoadIngredients={filterIngredientHandler}/>
        <IngredientList 
        ingredients={userIngredients}
        onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}


export default Ingredients;
