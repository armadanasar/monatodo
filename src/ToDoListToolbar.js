import React, { Component } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'

class ToDoListToolbar extends Component {
  state = {
    searchQuery: '',
    filterSelection: 'all',
    skip: 0,
    limit: 0
  }
  handleChange = e => {
    let currentValue = e.target.value
    let inputId = e.target.id

    this.setState({ [inputId]: currentValue })
  }

  render() {
    const { filterSelection, searchQuery } = this.state
    return (
      <div>
        <TextField
          id="searchQuery"
          label="Search field"
          type="search"
          value={searchQuery}
          onChange={this.handleChange}
        />
        <FormControl className="hahahihi">
          <InputLabel id="searchFilterSelectionLabel">Status</InputLabel>
          <Select
            id="filterSelection"
            labelId="searchFilterSelection"
            value={filterSelection}
            onChange={this.handleChange}
          >
            <MenuItem value={'all'}>All</MenuItem>
            <MenuItem value={'done'}>Done</MenuItem>
            <MenuItem value={'undone'}>Undone</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary">
          Add New Todo
        </Button>
      </div>
    )
  }
}

export default ToDoListToolbar
