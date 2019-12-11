import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Logout from './components/Logout'
import ProtectedRoute from './components/common/ProtectedRoute'
import ToDoItem from './components/common/ToDoItem'

const Placeholder = ({ text }) => {
  return <h1>{text}</h1>
}

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <ProtectedRoute
          path="/todos"
          component={props => <Placeholder text="todo lists" />}
        />
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
      <ToDoItem
        id={343}
        title="Main React"
        note="Bikin to do list"
        isDone={false}
        priority={1}
        editTodo={k => console.log(k)}
        deleteTodo={k => console.log(k)}
      />
    </div>
  )
}

export default App
