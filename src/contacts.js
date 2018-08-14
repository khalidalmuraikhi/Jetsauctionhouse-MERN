import React, { Component } from 'react'
import DataList from './DataList'
import LikedList from './LikedList'
import UserItemList from './UserItemList'
import db from './db'
import Button from 'material-ui/Button';
import List, { ListItem, ListItemSecondaryAction } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import { Link } from "react-router-dom";
import * as aziz from 'material-ui'

///
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});



export class all extends Component {

    state = {
        search: '',
        select: null,
        query: 'users',
        contactList1: []
    }


    componentWillMount() {
        db.setListener('users/' + db.user._id + '/contacts', this.getContacts1)
    }

    componentWillUnmount() {
        db.removeListener('users/' + db.user._id + '/contacts', this.getContacts1)
    }


    getContacts1 = contactList1 => this.setState({ contactList1 })

    formatListUser(user, i) {
        return (
            <ListItem key={i}>
                {user.username}
                <ListItemSecondaryAction>
                    <Button variant="raised" color="primary" size="small" component={Link} to={`/messages/${user.username}`}>Send a message</Button>
                    <Button variant="raised" color="secondary" size="small" onClick={() => this.handleDeleteContact(user.username)} style={{ marginLeft: 5 }}>Remove</Button>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }

    // handleSearchUsers() {
    //     this.setState({ _id: '', query: 'users/username/' + this.state.search })
    // }

    // async handleDelete(user) {
    //     await db.collection('users').deleteOne(user._id)
    //     this.setState({ select: null, _id: '' })
    // }

    // handleSelect(user) {
    //     this.setState({ select: user, _id: user._id })
    // }

    // async handleCreate() {
    //     await db.collection('users').createOne({ _id: this.state._id, likes: [] })
    //     this.setState({ _id: '' })
    // }

    // async handleUpdate() {
    //     await db.collection('users').deleteOne(this.state.select._id)
    //     await db.collection('users').createOne({ _id: this.state._id })
    //     this.setState({ select: null, _id: '' })
    // }

    async handleDeleteContact(val) {
        // await db.collection('users').deleteOne(user._id)

        console.log("val = " + val)
        console.log("user = " + db.user._id)
        
        await db.collection('users/' + db.user._id+ '/contacts').deleteOne( val)

    }

    

    render() {
        return (
            <center>
            <div style={{ padding: 20, backgroundImage: "url(../images/Birds.jpg)", backgroundSize: 'cover', height: 1600, width: 3060 }}>
                <div style={{ padding: 10, backgroundColor: '#6fd6fc', width: '60%', borderRadius: 10 }}>
                    <h1 style={{ fontSize: 50 }}>My Contacts List</h1>
                    <div style={{ width: '50%' }}>
                        <List className='DataList'>
                            <h2><DataList collection={'users/' + db.user._id + '/contacts'} formatListItem={(user, i) => this.formatListUser(user, i)} /></h2>
                        </List>
                    </div>
                </div>
                {
                    this.state.select
                        ?
                        <div>
                            <UserItemList user={this.state.select} />
                            <LikedList user={this.state.select} />
                        </div>
                        :
                        <div></div>
                }
            </div>
            </center>
        )
    }
}




