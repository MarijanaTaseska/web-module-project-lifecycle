import React from 'react'
import axios from 'axios'
import Form from './Form'
import TodoList from './TodoList'

const URL = 'http://localhost:9000/api/todos'


export default class App extends React.Component {
  state={
    todos:[],
    error:'',
    todoNameInput:'',
    displayCompleted:true,
  }
  inputChange = evt => {
    const {value} = evt.target
    this.setState({...this.state, todoNameInput:value})
  }

  resetForm = () => {
    this.setState({...this.setState,todoNameInput:''})
  }

  setAxiosError = err => this.setState({...this.state, error: err.response.data.message})

  postNewTodo = () =>{
    axios.post(URL, {name:this.state.todoNameInput})
    .then(res =>{
     this.setState({...this.state,todos:this.state.todos.concat(res.data.data)})
      this.resetForm()
    })
    .catch(this.setAxiosError)
  }

  onTodoFormSubmit = evt => {
     evt.preventDefault();
     this.postNewTodo()
  }

  fetchAllTodos = () =>{
  axios.get(URL)
  .then(res => {
  this.setState({ ...this.state, todos: res.data.data})
})
.catch(this.setAxiosError)
  }
  toggleCompleted = id => () =>{
   axios.patch(`${URL}/${id}`)
   .then(res =>{
    this.setState({...this.state, todos: this.state.todos.map(td =>{
      if(td.id !== id) return td
      return res.data.data
    })})
   })
   .catch(this.setAxiosError)
  }
  toggleDisplayCompleted = () => {
    this.setState({...this.state, displayCompleted: !this.state.displayCompleted })
  }
  componentDidMount(){
 this.fetchAllTodos()
  }
  render() {
    return(
      <div>
        <div id='error'>Error:{this.state.error}</div>
       <TodoList 
       todos={this.state.todos}
       displayCompleted={this.state.displayCompleted}
       toggleCompleted ={this.toggleCompleted}
       />
      <Form 
      onTodoFormSubmit={this.onTodoFormSubmit}
      displayCompleted={this.state.displayCompleted}
      inputChange={this.inputChange}
      todoNameInput={this.state.todoNameInput}
      toggleDisplayCompleted={this.toggleDisplayCompleted}
      />
      </div>
    )
  }
}
