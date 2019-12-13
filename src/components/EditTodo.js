import React, { Component } from 'react'
import todos from '../dataFetch/todos'
import Container from '@material-ui/core/Container'

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
    return <Container fixed></Container>
  }
}

export default EditTodo
