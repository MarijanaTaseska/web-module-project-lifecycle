import React from 'react'

export default class Form extends React.Component {
  render() {
    return(
      <>
        <form onSubmit={this.props.onTodoFormSubmit} id='todoForm'>
          <input 
           onChange={this.props.inputChange} 
           value={this.props.todoNameInput} 
           type='text' 
           placeholder='Type Todo'>
           </input>

          <input type='submit'></input>
        </form>
        <button 
          onClick={this.props.toggleDisplayCompleted}>
          {this.props.displayCompleted ? "Hide" : "Show"} Completed
          </button>
      </>
    )
  }
}
