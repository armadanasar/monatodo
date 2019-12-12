import React, { Component } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

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

class Login extends Component {
  state = {
    email: '',
    password: ''
  }
  handleChange = e => {
    let currentValue = e.target.value
    let inputId = e.target.id

    this.setState({ [inputId]: currentValue })
  }

  authenticateLogin = async () => {
    const { email, password } = this.state

    let { data, statusCode } = await auth.loginUser(email, password)

    if (statusCode === 200) {
      auth.setToken(data.token)
      window.location.href = '/todos'
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <div className={classes.form} noValidate>
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
              autoComplete="current-password"
              onChange={this.handleChange}
              value={this.state.password}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.authenticateLogin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    )
  }
}

export default withStyles(useStyles)(Login)
