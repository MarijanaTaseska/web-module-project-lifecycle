import React from 'react'
import axios from 'axios'


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
        <div id='todos'>
          <h2>Todos</h2>
          {
            this.state.todos.reduce((accum,td) => {
              if(this.state.displayCompleted || !td.completed) return accum.concat(
                <div key={td.id} onClick={this.toggleCompleted(td.id)}>{td.name} {td.completed ? "✔" : " "}</div>
              )
              return accum
            },[])

          }
        </div>
        <form onSubmit={this.onTodoFormSubmit} id='todoForm'>
          <input onChange={this.inputChange} value={this.state.todoNameInput} type='text' placeholder='Type Todo'></input>
          <input type='submit'></input>
        </form>
        <button onClick={this.toggleDisplayCompleted}>{this.state.displayCompleted ? "Hide" : "Show"} Completed</button>
      </div>
    )
  }
}
