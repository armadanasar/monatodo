import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

import Login from './components/Login'
import Register from './components/Register'
import Logout from './components/Logout'
import ProtectedRoute from './components/common/ProtectedRoute'
import ToDoList from './components/ToDoList'
import PageHeader from './components/common/PageHeader'
import PageFooter from './components/common/PageFooter'
import EditTodo from './components/EditTodo'
import NotFound from './components/NotFound'

import './App.css'
import Counter from './components/Counter'
import HorizontalScroll from './components/HorizontalScroll'
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header>
          <PageHeader />
        </header>
        
      <Counter/>
      <HorizontalScroll/>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <ProtectedRoute path="/todos" component={ToDoList} />
          <ProtectedRoute path="/todo/:todoId" component={EditTodo} />
          <ProtectedRoute path="/todo/new" component={EditTodo} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/todos" />
          <Redirect to="/not-found" />
        </Switch>
        <footer>
          <PageFooter />
        </footer>
      </div>
    </Provider>
  )
}

export default App
