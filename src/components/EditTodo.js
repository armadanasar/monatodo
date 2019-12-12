import React, { Component } from 'react'
import todos from '../dataFetch/todos'

class EditTodo extends Component {
  state = { todo: {} }

  async componentDidMount() {
    let todoId = this.props.match.params.todoId
    try {
      let result = await todos.getUserTodoById(todoId)
      if (result.status !== 200)
        throw new Error(`unable to fetch todo id ${todoId}`)
      result = await result.json()
      this.setState({ todo: result.data })
    } catch ({ message }) {
      console.log(message)
    }
  }

  render() {
    return <div>{JSON.stringify(this.state.todo)}</div>
  }
}

export default EditTodo
