import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Logout from './components/Logout'
import ProtectedRoute from './components/common/ProtectedRoute'
import ToDoItem from './components/common/ToDoItem'
import ToDoList from './components/ToDoList'
import PageHeader from './components/common/PageHeader'
import PageFooter from './components/common/PageFooter'
import Container from '@material-ui/core/Container'

const Placeholder = ({ text }) => {
  return <h1>{text}</h1>
}

function App() {
  return (
    <div className="App">
      <header>
        <PageHeader />
      </header>

      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <ProtectedRoute path="/todos" component={props => <ToDoList />} />
        <ProtectedRoute
          path="/todo/:todoId"
          component={props => (
            <Placeholder
              text={`Edit todo lists ${props.match.params.todoId}`}
            />
          )}
        />
        <Route
          path="/not-found"
          component={props => <Placeholder text="not found 404" />}
        />
        <Redirect from="/" exact to="/todos" />
        <Redirect to="/not-found" />
      </Switch>

      <footer>
        <PageFooter />
      </footer>
    </div>
  )
}

export default App
