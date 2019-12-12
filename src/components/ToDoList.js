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

const useStyles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  }
})

function createData(id, title, note, isDone, priority) {
  return { id, title, note, isDone, priority }
}

const rows = [
  createData(1, 'Frozen yoghurt', 'hahahihi', true, 1),
  createData(2, 'makan seafood', 'hahahihi', false, 1),
  createData(3, 'write tests for search', 'get the app runnning', true, 3),
  createData(4, 'Frozen yoghurt', 'hahahihi', false, 2),
  createData(5, 'Frozen yoghurt', 'hahahihi', true, 1)
]
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
    //do the dao and then delete it visually
    try {
      const todo = this.state.todos[todoIdx]
      const result = await todoApi.deleteUserTodo(todo.id)
      const todos = [...this.state.todos]

      if (result.status !== 200) throw new Error(result.text())

      todos.splice(todoIdx, 1)
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
      <div>
        <Paper className={classes.root}>
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
