import React, { Component } from 'react'
import DataList from './DataList'
import db from './db'
import Button from 'material-ui/Button';
import List, { ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { InputLabel } from 'material-ui/Input';
import * as aziz from 'material-ui'
import { CircularProgress } from 'material-ui/Progress';
import purple from 'material-ui/colors/purple';

export default class BidList extends Component {

    state = {
        search: '',
        selectUsername: '',
        username: '',
        amount: '',
        query: 'items',
        item: null
    }

    componentWillMount() {
        db.setListener(`items/${this.props.match.params._id}`, this.handleItem)
    }

    componentWillUnmount() {
        db.removeListener(`items/${this.props.match.params._id}`, this.handleItem)
    }

    handleItem = item => this.setState({ item })

    formatListItem(bid, i) {
        return (
            <aziz.List key={i}>
                <aziz.ListItem>
                Username: {bid.username}, Amount: {bid.amount}
                </aziz.ListItem>
            </aziz.List>
        )
    }

    async handleCreate() {
        if (!this.state.item.highbid || (1 * this.state.amount >= this.state.item.highbid)) {
            let item = this.state.item
            item.highbid = this.state.amount
            await db.collection('items').replaceOne(item._id, item)
            await db.collection('items/' + this.state.item._id + '/bids').createOne({ username: this.state.username, amount: this.state.amount })
        }
        this.setState({ selectUsername: '', username: '', amount: '' })
    }

    render() {
        return (
            this.state.item
                ?
                <div style={{ padding: 10, backgroundColor: 'linear-gradient(40deg, #558dfc 40%, #ef4a4a 80%)' }}>
                    <h2>{this.state.item.description}'s Bids</h2>
                    <aziz.List className='DataList'>
                        <aziz.ListItem>
                            <DataList collection={this.state.query + '/' + this.state.item._id + '/bids'} formatListItem={(bid, i) => this.formatListItem(bid, i)} />
                        </aziz.ListItem>
                    </aziz.List>
                    <p>Operations:</p>
                    <aziz.List>
                        <aziz.ListItem>
                            <form>
                                <FormControl>
                                    <InputLabel>Select User</InputLabel>
                                    <Select style={{ width: 200 }} native value={this.state.username} onChange={e => this.setState({ username: e.target.value })}>
                                        <option></option>
                                        <DataList collection={'users'} formatListItem={(user, i) => <option key={i} value={user._id}>{user._id}</option>} />
                                    </Select>
                                </FormControl>
                            </form>
                            &nbsp;
                            &nbsp;
                            <TextField type='number' placeholder='Amount' value={this.state.amount} onChange={e => this.setState({ amount: e.target.value })} />

                            <aziz.ListItemSecondaryAction>
                                <Button variant="raised" color="primary" size="small" style={{ margin: 3, float: 'right' }} onClick={() => this.handleCreate()}>Create</Button>
                            </aziz.ListItemSecondaryAction>
                        </aziz.ListItem>
                    </aziz.List>
                </div>
                :
                <div>
                    <CircularProgress style={{ color: purple[500], paddingLeft: 600, paddingTop: 650 }} size={50} thickness={7} />
                </div>
        )
    }
}