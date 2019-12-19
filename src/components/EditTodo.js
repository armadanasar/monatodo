import React, { Component } from 'react'
import todos from '../dataFetch/todos'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import x from '../styles/EditTodo.css'
import { withSnackbar } from 'notistack'

class EditTodo extends Component {
  state = {
    title: '',
    priority: '',
    note: '',
    todoId: 0
  }

  componentDidMount = async () => {
    try {
      let todoId = this.props.match.params.todoId

      if (todoId !== 'new') {
        let result = await todos.getUserTodoById(todoId)

        result = await result.json()
        this.setState({ ...result.data })
      }

      this.setState({ todoId })
    } catch ({ message }) {
      console.log(message)
      this.props.enqueueSnackbar('Cannot fetch todo detail')
    }
  }

  saveTodoEdit = async () => {
    try {
      let todoId = this.state.todoId
      let todo = { ...this.state }

      if (todoId !== 'new') {
        await todos.updateUserTodo(todoId, todo)
      } else {
        await todos.createNewUserTodo(todo)
      }
      window.location.href = '/todos'
    } catch ({ message }) {
      console.log(message)
      this.props.enqueueSnackbar('Cannot save todo')
    }
  }

  handleChange = e => {
    let currentValue = e.target.value
    let inputId = e.target.id

    this.setState({ [inputId]: currentValue })
  }

  render() {
    const { title, priority, note } = this.state
    return (
      <Container maxWidth="sm" className="editTodoContainer">
        <TextField
          id="title"
          className="editTodoTextField"
          label="Title"
          value={title}
          onChange={this.handleChange}
        />
        <TextField
          id="note"
          className="editTodoTextField"
          label="Note"
          value={note}
          onChange={this.handleChange}
        />
        <TextField
          id="priority"
          className="editTodoTextField"
          label="Priority"
          value={priority}
          onChange={this.handleChange}
          type="number"
          inputProps={{ min: 1, max: 3 }}
          min="1"
          max="3"
        />

        <div>
          <Button
            variant="contained"
            color="primary"
            className="submitButton"
            onClick={this.saveTodoEdit}
          >
            Submit
          </Button>
        </div>
      </Container>
    )
  }
}

export default withSnackbar(EditTodo)
