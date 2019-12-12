import React, { Component } from 'react'
import { CssBaseline, Avatar } from '@material-ui/core'
import { LockOpenOutlined } from '@material-ui/icons'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import auth from '../dataFetch/auth'

import { withStyles } from '@material-ui/styles'

const useStyles = theme => ({
  paper: {
    margin: '10%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: '8dp',
    backgroundColor: '#e91e63'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: '8dp'
  },
  submit: {
    margin: '6px 0px 4px'
  }
})

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: ''
  }
  handleChange = e => {
    let currentValue = e.target.value
    let inputId = e.target.id

    this.setState({ [inputId]: currentValue })
  }

  registerUser = async () => {
    const { name, email, password } = this.state

    let { data, statusCode } = await auth.registerUser(name, email, password)

    if (statusCode === 200) {
      auth.setToken(data.token)
      console.log('mihokaneko', data.token)
      // window.location = '/todos'
    } else if (statusCode === 500) {
      if (data.message.match(/email or password un match/gi)) {
        console.log('salah password')
      }
    } else {
      console.log('login failure')
    }
  }

  render() {
    const { classes } = this.props
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOpenOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>

          <div className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              onChange={this.handleChange}
              value={this.state.name}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoFocus
              onChange={this.handleChange}
              value={this.state.username}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={this.handleChange}
              value={this.state.password}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.registerUser}
            >
              Register
            </Button>
          </div>
        </div>
      </Container>
    )
  }
}

export default withStyles(useStyles)(Register)
