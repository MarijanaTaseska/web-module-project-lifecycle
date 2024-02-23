import React from 'react'
import Todo from "./Todo"

export default class TodoList extends React.Component {
  render() {
    return (
      <div id='todos'>
      <h2>Todos</h2>
      {
        this.props.todos.reduce((accum,td) => {
          if(this.props.displayCompleted || !td.completed) return accum.concat(
            <Todo
            key={td.id} 
            toggleCompleted={this.props.toggleCompleted}
            todo={td}
            />
          )
          return accum
        },[])

      }
    </div>
    )
  }
}
