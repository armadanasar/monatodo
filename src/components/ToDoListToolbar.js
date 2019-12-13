import React, { Component } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import '../styles/ToDoListToolbar.css'

class ToDoListToolbar extends Component {
  render() {
    const {
      onSearchFilterSelectionChange,
      onSearchQueryChange,
      onClickAddNewTodo,
      filterSelectionValue: filterSelection,
      searchQueryValue: searchQuery
    } = this.props
    return (
      <div className="toDoListToolbarPane">
        <FormControl className="single-grow">
          <InputLabel id="searchFilterSelectionLabel">Status</InputLabel>
          <Select
            className="searchFilterSelection"
            id="searchFilterSelection"
            labelId="searchFilterSelection"
            value={filterSelection}
            onChange={onSearchFilterSelectionChange}
          >
            <MenuItem value={'all'}>All</MenuItem>
            <MenuItem value={'done'}>Done</MenuItem>
            <MenuItem value={'undone'}>Undone</MenuItem>
          </Select>
        </FormControl>
        <div className="max-grow searchQueryPane">
          <TextField
            className="searchQuery"
            id="searchQuery"
            label="Search field"
            type="search"
            value={searchQuery}
            onChange={onSearchQueryChange}
          />
        </div>

        <div className="toDoListToolbarButtonPane">
          <Button className="searchButton" variant="contained" color="primary">
            Search
          </Button>
          <Button
            className="addNewTodoButton"
            variant="contained"
            color="primary"
            onClick={onClickAddNewTodo}
          >
            Add New Todo
          </Button>
        </div>
      </div>
    )
  }
}

export default ToDoListToolbar
