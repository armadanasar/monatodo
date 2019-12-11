import React, { Component } from 'react'
import EditIcon from '@material-ui/icons/Edit'
import { Button, TableRow, TableCell } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import DoneIcon from '@material-ui/icons/Done'
import ClearIcon from '@material-ui/icons/Clear'
import { Done } from '@material-ui/icons'
class ToDoItem extends Component {
  state = {}
  render() {
    const {
      id,
      title,
      note,
      priority,
      isDone,
      deleteTodo,
      editTodo
    } = this.props
    return (
      <TableRow key={id}>
        <TableCell component="th" scope="row">
          {title}
        </TableCell>
        <TableCell align="right">{note}</TableCell>
        <TableCell align="right">
          {isDone ? <DoneIcon /> : <ClearIcon />}
        </TableCell>
        <TableCell align="right">{priority}</TableCell>
        <TableCell align="right">
          <Button
            variant="contained"
            color="primary"
            onClick={() => editTodo(id)}
          >
            <EditIcon />
          </Button>
        </TableCell>
        <TableCell align="right">
          <Button
            variant="contained"
            color="primary"
            onClick={() => deleteTodo(id)}
          >
            <DeleteIcon />
          </Button>
        </TableCell>
      </TableRow>
    )
  }
}

export default ToDoItem
