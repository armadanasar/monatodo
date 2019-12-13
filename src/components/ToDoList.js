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
    todos: []
  }

  editToDo(todoIdx) {
    window.location.href = `/todo/${todoIdx}`
  }
  async deleteToDo(todoIdx) {
    try {
      const targetTodoIdx = this.state.todos.findIndex(
        todo => todo.id === todoIdx
      )
      const result = await todoApi.deleteUserTodo(todoIdx)
      const todos = [...this.state.todos]

      if (result.status !== 200) throw new Error(result.text())

      todos.splice(targetTodoIdx, 1)
      this.setState({ todos })
    } catch ({ message }) {
      alert(message)
    }
  }

  async componentDidMount() {
    try {
      let result = await todoApi.getUserTodos()
      result = await result.json()
      console.log(result)
      this.setState({ todos: result.data })
    } catch ({ message }) {
      alert(message)
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div style={{ width: '100%' }}>
        <Paper className={classes.root}>
          <ToDoListToolbar
            onSearchQueryChange={() => console.log('hoho')}
            onSearchFilterSelectionChange={() => console.log('hihi')}
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
              {this.state.todos.map((row, idx) => (
                <ToDoItem
                  key={idx}
                  id={row.id}
                  title={row.title}
                  note={row.note}
                  isDone={row.isDone}
                  priority={row.priority}
                  editTodo={() => this.editToDo(idx)}
                  deleteTodo={() => this.deleteToDo(idx)}
                />
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

export default withStyles(useStyles)(ToDoList)
