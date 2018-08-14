import React, { Component } from 'react'
import DataList from './DataList'
import db from './db'
import Button from 'material-ui/Button';
import List, { ListItem, ListItemSecondaryAction } from 'material-ui/List';

export default class UserItemList extends Component {

    formatListItem(item, i) {
        return (
            <center>
            <ListItem key={i}>
                {item.name}, Highbid: {item.highbid ? item.highbid : 'None'}
                <ListItemSecondaryAction>
                    <Button variant="raised" color="primary" size="small" onClick={() => this.handleExpireNow(item)}>Expire Now</Button>
                </ListItemSecondaryAction>
            </ListItem>
            </center>
        )
    }

    formatListItemExpired(item, i) {
        return (
            <ListItem key={i}>
                {item.name}, Highbid: {item.highbid ? item.highbid : 'None'}
                <ListItemSecondaryAction>
                    <Button variant="raised" color="secondary" size="small" onClick={() => this.handleDelete(item)}>Delete</Button>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }

    async handleExpireNow(item) {
        await db.collection('expired').createOne(item)
        await db.collection('items').deleteOne(item._id)
    }

    async handleDelete(item) {
        await db.collection('expired').deleteOne(item._id)
    }

    render() {
        return (
            <center>
                <div style={{ padding: 10, backgroundColor: 'gray', width: '60%', borderRadius: 10 }}>
                <h2>{this.props.user._id}'s Current Auctions</h2>
                <List className='DataList'>
                    <DataList collection={'users/' + this.props.user._id + '/items'} formatListItem={(item, i) => this.formatListItem(item, i)} />
                </List>
                <div style={{ borderTop: 2 }}>
                <h2>{this.props.user._id}'s Expired Auctions</h2>
                <List className='DataList'>
                    <DataList collection={'users/' + this.props.user._id + '/expired'} formatListItem={(item, i) => this.formatListItemExpired(item, i)} />
                </List>
                </div>
                </div>
            </center>
        )
    }
}