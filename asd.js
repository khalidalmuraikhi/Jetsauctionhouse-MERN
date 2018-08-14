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
        _id: '',
        query: 'users'
    }

    formatListUser(user, i) {
        return (
            <ListItem key={i}>
                <h2>{user._id}</h2>
                , Auctions: 
                <span className='Comma'>
                    <DataList collection={'users/' + user._id + '/items'} formatListItem={(item, i) => <span key={i}>{item.name}</span>} />
                </span>


                <ListItemSecondaryAction>
                    <Button variant="raised" color="primary" size="small" component={Link} to={`/user/${user._id}`}>View profile page</Button>
                    {
                        db.user
                        &&
                        <Button variant="raised" color="primary" size="small" onClick={() => this.handleSelect(user)}>Select</Button>
                    }
                    {
                        db.user
                        &&
                        <Button variant="raised" color="secondary" size="small" onClick={() => this.handleDelete(user)}>Delete</Button>
                    }
                </ListItemSecondaryAction>




            </ListItem>
        )
    }

    handleSearchUsers() {
        this.setState({ _id: '', query: 'users/username/' + this.state.search })
    }

    async handleDelete(user) {
        await db.collection('users').deleteOne(user._id)
        this.setState({ select: null, _id: '' })
    }

    handleSelect(user) {
        this.setState({ select: user, _id: user._id })
    }

    async handleCreate() {
        await db.collection('users').createOne({ _id: this.state._id, likes: [] })
        this.setState({ _id: '' })
    }

    async handleFeedback() {
        await db.collection('users').deleteOne(this.state.select._id)
        await db.collection('users').createOne({ _id: this.state._id })
        this.setState({ select: null, _id: '' })
    }

    
    render() {
        return (
            <div style={{ padding: 20, backgroundImage: "url(../images/Pilot.jpg)", backgroundSize: 'cover', height: 1600, width: 3065 }}>
                <div >
                    <center>
                        <div style={{ width: '60%', borderRadius: 5, backgroundColor: 'lightgray', opacity: 0.9 }}>
                            <h1 style={{ fontSize: 50 }}>Users</h1>
                            <div style={{ width: 300 }}>
                                <TextField label='Username' value={this.state.search} onChange={e => this.setState({ search: e.target.value })} style={{ paddingBottom: 10 }} />
                                <Button variant="raised" color="primary" size="small" style={{ float: 'center' }} onClick={() => this.handleSearchUsers()}>Search Users</Button>
                            </div>
                            <List className='DataList'>
                                <DataList collection={this.state.query} formatListItem={(user, i) => this.formatListUser(user, i)} />
                            </List>
                            <div style={{ width: 350 }}>
                                <TextField label='Username' value={this.state._id} onChange={e => this.setState({ _id: e.target.value })} style={{ paddingBottom: 10 }} />
                                <Button size='small' variant="raised" color="primary" style={{ margin: 3, float: 'center' }} onClick={() => this.handleFeedback()}>Update</Button>
                                <Button size='small' variant="raised" color="primary" style={{ margin: 3, float: 'center' }} onClick={() => this.handleCreate()}>Create</Button>
                            </div>
                        </div>
                    </center>
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
        )
    }
}

export class details extends Component {

    state = {
        search: '',
        select: null,
        user: [],
        _id: '',
        query: 'users',
        rate: 0,
        content: '',
        username: '',
        feedbacks: [],
        feedbacksArr: [],
        contactList1: [],
        contactList2: []
    }

    componentWillMount() {
        db.setListener('users/' + this.props.match.params._id, this.handleUser)
        db.setListener('users/' + this.props.match.params._id + '/feedbacks', this.getFeedback)

        db.setListener('users/' + db.user._id + '/contacts', this.getContacts1)
        db.setListener('users/' + this.props.match.params._id + '/contacts', this.getContacts2)
    }

    componentWillUnmount() {
        db.removeListener(`users/${this.props.match.params._id}`, this.handleUser)
        db.removeListener('users/' + this.props.match.params._id + '/feedbacks', this.getFeedback)

        db.removeListener('users/' + db.user._id + '/contacts', this.getContacts1)
        db.removeListener('users/' + this.props.match.params._id + '/contacts', this.getContacts2)
    }

    handleUser = user => this.setState({ user })

    getFeedback = feedbacksArr => this.setState({ feedbacksArr })

    getContacts1 = contactList1 => this.setState({ contactList1 })

    getContacts2 = contactList2 => this.setState({ contactList2 })



    formatListItem(item, i) {
        return (
            <ListItem key={i}>

                Name : {item.username} , rating:  {item.rating}/5, Message: {item.content}

            </ListItem>
        )
    }



    async handleFeedback() {

        if (db.user._id == null) {
            alert("please log in to leave a comment")
        }
        let id = db.user._id;
        let feedback = {
            username: id,
            rating: this.state.rate,
            content: this.state.content,
        }

        if (this.state.user._id == db.user._id) {
            alert("you cant give feedback to yourself")
            return;
        }

        console.log("feedback = " + this.state.feedbacksArr)

        let index = this.state.feedbacksArr.findIndex(x => x.username == id);


        if(index >= 0){
            alert("you have already rated")
            return;
        }

        await db.collection('users/' + this.state.user._id + '/feedbacks').createOne({ username: db.user._id, content: this.state.content, rating: this.state.rate })
    }


    async handleAddContacts() {

        if (db.user._id == null) {
            alert("please log in ")
        }


        let id = db.user._id;


        if(this.props.match.params._id == id){
            alert("cant added yourself")
            return;
        }


        let index1 = this.state.contactList1.findIndex(x => x.username == this.props.match.params._id);

        console.log("index 1: = " + index1)


        if(index1 == -1){
            // if its find something
            await db.collection('users/' + db.user._id + '/contacts').createOne({ username: this.state.user._id })

            // alert("you have already added the user")
            // return;
        }

        if(index1 != -1){

            alert("you have already added the user")
            return;
        }




        let index2 = this.state.contactList2.findIndex(x => x.username == id);

        console.log("index 2: = " + index2)


        if(index2 == -1){
            await db.collection('users/' + this.state.user._id + '/contacts').createOne({ username: db.user._id })
            
        }

        this.props.history.push('/mycontacts')

    }

    render() {

        return (
            <div>
                <div style={{ padding: 10, backgroundColor: 'gold' }}>
                    <aziz.Button style={{ margin: 3, float: 'right' }} color="primary" variant='raised' onClick={() => this.handleAddContacts()}>Add the user</aziz.Button>

                    <h2>{this.props.match.params._id} Profile page</h2>

                    <h1>{this.state.user._id}</h1>
                    <h1>{this.state.user.password}</h1>

                    {/* <List className='DataList'>
                        <DataList collection={"users/maria@test.com/feedbacks"} formatListItem={(user, i) => this.formatListUser(user, i)} />
                    </List> */}

                    {/* <DataList collection={'users/' + user._id + '/feedbacks'} formatListItem={(item, i) => <span key={i}>{feedbacks}</span>} /> */}

                    <List className='DataList'>
                        <DataList collection={'users/' + this.props.match.params._id + '/feedbacks'} formatListItem={(item, i) => this.formatListItem(item, i)} />
                    </List>




                    <div style={{ padding: 10, backgroundColor: 'white' }}>


                        <FormControl >
                            <InputLabel>Rate</InputLabel>
                            <Select
                                value={this.state.rate}
                                onChange={e => this.setState({ rate: e.target.value })}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Select>
                        </FormControl>


                        <br />
                        <aziz.TextField label='Message' value={this.state.content} onChange={e => this.setState({ content: e.target.value })} />
                        <br />
                        <aziz.Button style={{ margin: 3, float: 'right' }} color="primary" variant='raised' onClick={() => this.handleFeedback()}>Give a feedback</aziz.Button>
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
        )
    }
}


