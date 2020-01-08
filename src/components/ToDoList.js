import React, { Component } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import ToDoItem from './common/ToDoItem'
import todoApi from '../dataFetch/todos'
import ToDoListToolbar from './ToDoListToolbar'
import { setTodo } from '../redux/todo/todoActions'
import { connect } from 'react-redux'
import { withSnackbar } from 'notistack'

import '../styles/ToDoList.css'

class ToDoList extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    todos: [],
    searchQuery: '',
    filterSelection: 'all'
  }

  async componentDidMount() {
    try {
      let result = await todoApi.getUserTodos()
      result = await result.json()

      this.props.setTodos(result.data)
    } catch ({ message }) {
      console.log(message)
      this.props.enqueueSnackbar('Cannot get user todos')
    }
  }

  render() {
    const { searchQuery, filterSelection } = this.state
    console.log(filterSelection)

    return (
      <div style={{ width: '100%' }}>
        <Paper className="root">
          <ToDoListToolbar
            onSearchQueryChange={this.onSearchQueryChange}
            onSearchFilterSelectionChange={this.onSearchFilterSelectionChange}
            onClickAddNewTodo={this.onClickAddNewTodo}
            searchQueryValue={searchQuery}
            filterSelectionValue={filterSelection}
            onSearchButtonClick={this.onSearchButtonClick}
          ></ToDoListToolbar>
          <Table className="table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell align="right">Note</TableCell>
                <TableCell align="right">Is Done</TableCell>
                <TableCell align="right">Priority</TableCell>
                <TableCell align="right">Edit</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.todos.map((row, idx) => (
                <ToDoItem
                  key={idx}
                  id={row.id}
                  title={row.title}
                  note={row.note}
                  isDone={row.isDone}
                  priority={row.priority}
                  editTodo={() => this.editToDo(row.id)}
                  deleteTodo={() => this.deleteToDo(row.id)}
                />
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }

  onSearchQueryChange = async e => {
    this.setState({ searchQuery: e.target.value })
  }

  onSearchFilterSelectionChange = async e => {
    this.setState({ filterSelection: e.target.value })
  }

  onClickAddNewTodo = () => {
    window.location.href = '/todo/new'
  }

  onSearchButtonClick = async () => {
    try {
      const { searchQuery, filterSelection } = this.state

      let result = await todoApi.getUserTodos(searchQuery, filterSelection)

      result = await result.json()

      this.props.setTodos(result.data)
    } catch ({ message }) {
      console.error(message)
      this.props.enqueueSnackbar('Cannot search user todos')
    }
  }

  editToDo(todoIdx) {
    window.location.href = `/todo/${todoIdx}`
  }

  deleteToDo = async todoIdx => {
    try {
      const targetTodoIdx = this.props.todos.findIndex(
        todo => todo.id === todoIdx
      )

      await todoApi.deleteUserTodo(todoIdx)
      const todos = [...this.props.todos]

      todos.splice(targetTodoIdx, 1)
      this.props.setTodos(todos)
    } catch ({ message }) {
      console.log(message)
      this.props.enqueueSnackbar('Cannot delete user todo')
    }
  }
}

function mapStateToProps(state) {
  return {
    todos: state
  }
}

function mapDispatchToProps(dispatch) {
  return { setTodos: payload => dispatch(setTodo(payload)) }
}

export default withSnackbar(
  connect(mapStateToProps, mapDispatchToProps)(ToDoList)
)
