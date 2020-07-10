import React from 'react';

import './IngredientList.css';

const IngredientList = props => {
  return (
    <section className="ingredient-list">
      <h2>Loaded Items</h2>
      <ul>
        {props.ingredients.map(ig => (
          <li key={ig.id} >
            <span>{ig.title}</span>
            <span>{ig.amount}</span>
            <span onClick={props.onRemoveItem.bind(this, ig.id)}>X</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;
