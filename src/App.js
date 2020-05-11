import React, { Component } from 'react'
import ValidationComponent from './ValidationComponent';
import CharComponent from './CharComponent';

class App extends Component {
  state={
    userInput: ''
  }
  inputChangeHandler=(event)=>{
    this.setState({ userInput: event.target.value});
  }
  deleteCharHandler=(index)=>{
    const text = this.state.userInput.split('');
    text.splice(index,1);
    const updatedtext = text.join('');
    this.setState({userInput: updatedtext});
  };
  render() {
    const {userInput}=this.state;
    const CharList = this.state.userInput.split('').map((ch,index)=>{
      return <CharComponent 
                character={ch}
                key ={index}
                clicked={()=>this.deleteCharHandler(index)}/>
    });
    return (
      <div>
        <h1>Assignment</h1>
        <ol>
          <li>Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).</li>
          <li>Create a new component (=> ValidationComponent) which receives the text length as a prop</li>
          <li>Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
          <li>Create another component (=> CharComponent) and style it as an inline box (=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
          <li>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
          <li>When you click a CharComponent, it should be removed from the entered text.</li>
        </ol>
        <h1>Solution</h1>
        <p>Write Your Text here</p>
        <input type="text" 
        onChange={this.inputChangeHandler} 
        value={userInput}/>
        <p>Text Length : {userInput.length}</p>
        <ValidationComponent length={userInput.length}/>
        {CharList}
      </div>
    )
  }
}

export default App
