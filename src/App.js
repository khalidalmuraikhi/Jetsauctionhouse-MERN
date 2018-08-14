import React, { Component } from 'react';
import * as UserList from './UserList'
import ItemList from './ItemList'
import Item from './Item'
import Reset from './Reset'
import Register from './Register'
import Login from './Login'
import Logout from './Logout'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import db from './db'
import * as Planes from './planes'

import * as aziz from 'material-ui'

import * as Contacts from './contacts'

import * as Messages from './messages'

import Products from './Products'


export default class App extends Component {

  state = {
    user: null
  }

  componentDidMount() {
    this.authSubscription = db.onAuthStateChanged(user => this.setState({ user }))
  }


  

  componentWillUnmount() {
    this.authSubscription()
  }

  render() {

    return (
      <Router>
        <div style={{ flexGrow: 1 }}>
          <aziz.AppBar position="static" style={{ backgroundColor: 'black' }}>
            <aziz.Toolbar>

              <aziz.Typography style={{ paddingLeft: 10, paddingTop: 5 }} color="inherit" aria-label="Menu">
                {/* <i class="material-icons md-48">face</i> */}
                <img src ="../images/LOGO.png" height='50' width='180' />
              </aziz.Typography>
              
              <aziz.Typography style={{ flex: 1 }} variant="title" color="inherit" >
                <text style={{ paddingLeft: 10 }}>Jets Auction Site</text>
                {/* <aziz.Button color="inherit" component={Link} to='/products'>Jets</aziz.Button> */}
              </aziz.Typography>
              {/* <aziz.Button color="inherit" component={Link} to='/items'>Items</aziz.Button> */}
              <Button color="inherit" component={Link} to='/planes'>planes</Button>

              
              {
                this.state.user
                  ?
                  <div>
                    <aziz.Button color="inherit" component={Link} to='/myitems'>{db.user._id}'s Items</aziz.Button>

                    <aziz.Button color="inherit" component={Link} to='/mycontacts'>my contacts</aziz.Button>
                    
                    <aziz.Button color="inherit" component={Link} to='/users'>Users</aziz.Button>
                    <Reset />
                    <aziz.Button color="inherit" component={Link} to='/logout'>Logout</aziz.Button>
                  </div>
                  :
                  <div>
                    <aziz.Button color="inherit" component={Link} to='/register'>Register</aziz.Button>
                    <aziz.Button color="inherit" component={Link} to='/login'>Login</aziz.Button>
                  </div>
              }
            </aziz.Toolbar>
          </aziz.AppBar>
          <Route exact path="/" component={Planes.all} />
          <Route path="/products" component={Products} />
          <Route path="/items" component={ItemList} />
          <Route path="/myitems" render={props => <ItemList my={true} {...props} />} />
          
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/items/:_id" component={Item} />

          <Route path="/users" component={UserList.all} />
          <Route path="/user/:_id" component={UserList.details} />

          <Route path="/planes" component={Planes.all} />
          <Route path="/plane_create" component={Planes.create} />
          <Route path="/plane_details/:_id" component={Planes.details} />

          <Route path="/mycontacts" component={Contacts.all} />

          <Route path="/messages/:_id" component={Messages.details} />

        </div>
      </Router>
    )
  }
}