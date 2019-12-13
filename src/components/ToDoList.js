import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import ToDoItem from './common/ToDoItem'
import { withStyles } from '@material-ui/styles'
import todoApi from '../dataFetch/todos'
import MaterialTable from 'material-table'
import ToDoListToolbar from './ToDoListToolbar'
import { setTodo } from '../redux/todo/todoActions'
import { connect } from 'react-redux'

const useStyles = theme => ({
  root: {
    margin: '5%'
  },
  table: {
    minWidth: 700
  }
})

function createData(id, title, note, isDone, priority) {
  return { id, title, note, isDone, priority }
}

class ToDoList extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    todos: [],
    searchQuery: '',
    filterSelection: ''
  }

  editToDo(todoIdx) {
    window.location.href = `/todo/${todoIdx}`
  }
  deleteToDo = async todoIdx => {
    try {
      const targetTodoIdx = this.props.todos.findIndex(
        todo => todo.id === todoIdx
      )
      console.log(targetTodoIdx)
      const result = await todoApi.deleteUserTodo(todoIdx)
      const todos = [...this.props.todos]

      if (result.status !== 200) throw new Error(result.text())

      todos.splice(targetTodoIdx, 1)
      // this.setState({ todos })
      this.props.setTodos(todos)
    } catch ({ message }) {
      alert(message)
    }
  }

  async componentDidMount() {
    try {
      let result = await todoApi.getUserTodos()
      result = await result.json()
      console.log(result)
      // this.setState({ todos: result.data })
      this.props.setTodos(result.data)
    } catch ({ message }) {
      alert(message)
    }
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
    const { searchQuery, filterSelection } = this.state
    console.log(searchQuery, filterSelection)
  }
  render() {
    const { searchQuery, filterSelection } = this.state
    const { classes, todos, setTodos } = this.props
    return (
      <div style={{ width: '100%' }}>
        <Paper className={classes.root}>
          <ToDoListToolbar
            onSearchQueryChange={this.onSearchQueryChange}
            onSearchFilterSelectionChange={this.onSearchFilterSelectionChange}
            onClickAddNewTodo={this.onClickAddNewTodo}
            searchQuery={searchQuery}
            filterSelection={filterSelection}
            onSearchButtonClick={this.onSearchButtonClick}
          ></ToDoListToolbar>
          <Table className={classes.table} aria-label="simple table">
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
}

function mapStateToProps(state) {
  return {
    todos: state
  }
}

function mapDispatchToProps(dispatch) {
  return { setTodos: payload => dispatch(setTodo(payload)) }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ToDoList))
