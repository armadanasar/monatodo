import React, { Component } from 'react'
import todos from '../dataFetch/todos'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withSnackbar } from 'notistack'

import '../styles/EditTodo.css'

class EditTodo extends Component {
  state = {
    title: '',
    priority: '',
    note: '',
    todoId: 0
  }

  errorMessages = {
    TITLE_IS_REQUIRED: 'Title is required',
    NOTE_IS_REQUIRED: 'Note is required',
    INVALID_PRIORITY: 'Empty priority',
    INVALID_PRIORITY_VALUE: 'Invalid priority number',
    UNKNOWN_EDIT_TODO_ERROR: 'Cannot submit edit todo'
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

  handleChange = e => {
    let currentValue = e.target.value
    let inputId = e.target.id

    this.setState({ [inputId]: currentValue })
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
      message = this.composeEditTodoErrorMessage(message)
      this.props.enqueueSnackbar(message)
    }
  }

  composeEditTodoErrorMessage = errorMessage => {
    if (errorMessage.match(/title.*empty/gi))
      return this.errorMessages.TITLE_IS_REQUIRED
    if (errorMessage.match(/note.*empty/gi))
      return this.errorMessages.NOTE_IS_REQUIRED
    if (errorMessage.match(/priority.*number/gi))
      return this.errorMessages.INVALID_PRIORITY
    if (errorMessage.match(/priority.*must be one of/gi))
      return this.errorMessages.INVALID_PRIORITY_VALUE
    else return this.errorMessages.UNKNOWN_EDIT_TODO_ERROR
  }
}

export default withSnackbar(EditTodo)
