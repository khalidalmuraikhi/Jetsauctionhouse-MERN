import React, { Component } from 'react'
import DataList from './DataList'
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

import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Icon from 'material-ui/Icon';

import Ads from './ads'

const styles = theme => ({
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 'auto',
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  //   root: {
  //     width: 500,
  //   },
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: 300,
      width: '100%',
    },
    image: {
      position: 'relative',
      height: 200,
      [theme.breakpoints.down('xs')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
      },
      '&:hover': {
        zIndex: 1,
      },
      '&:hover $imageBackdrop': {
        opacity: 0.15,
      },
      '&:hover $imageMarked': {
        opacity: 0,
      },
      '&:hover $imageTitle': {
        border: '4px solid currentColor',
      },
    },
    imageButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
    },
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
      position: 'relative',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
    },
  });

export class all extends Component {

    state = {
        search: '',
        _id: '',
        description: '',
        buyer: '',
        expiry: '',
        highbid: '',
        users: [],
        category: '',
        query: 'items',
        expanded: false,
        value: 'recents',
        ads: [],
        user: []
    }

    componentWillMount() {
        db.setListener('ads/', this.getAds)
        console.log(this.state.ads)
        // db.setListener('users/' + this.props.match.params._id, this.handleUser)


    }

    componentWillUnmount() {
        db.removeListener('ads', this.getAds)
        // db.removeListener('users/' + this.props.match.params._id, this.handleUser)

    }

    getAds= ads => this.setState({ ads })
    handleUser = user => this.setState({ user })



    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    formatListItem(item, i) {
        const { classes } = this.props;
        return (
            <center>
                <div style={{ paddingBottom: 20 }}>
                    <Card style={{ maxWidth: 1500 }}>
                        <CardHeader
                            title={<h1>{item.name}</h1>}
                            subheader={<h2>{item.category}</h2>}
                        />
                        <CardMedia
                            style={{ height: 800 }}
                            image={item.imageUrl}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography component="p">
                                <strong>Seller: </strong>{item.seller}<br />
                                <strong>Expiry Date: </strong>{item.expiry}<br />
                                <strong>Discription: </strong>{item.description} <br />
                            </Typography>
                        </CardContent>

                        <CardActions style={{ width: 1500 }} disableActionSpacing>
                            <IconButton style={{ width: 200 }}>
                                <Button style={{ width: 200 }} variant="raised" color="primary" size="small" component={Link} to={`/plane_details/${item._id}`}>View Bids / Details</Button>
                            </IconButton>
                                {
                                    db.user
                                    &&
                                    db.user._id === item.seller
                                    &&
                                    <IconButton style={{ width: 100 }}><Button style={{ width: 100 }} variant="raised" color="secondary" size="small" onClick={() => this.handleDelete(item)}>Delete</Button></IconButton>
                                }
                        </CardActions>
                        
                    </Card>

                    {
                        (i%5)==0 && i!=0
                        ?
                        <Ads />
                        :
                        <p></p>
                    }
                </div>
            </center>
        )
    }


    formatAds(item, i) {
        const { classes } = this.props;
        return (
            <center>
                <div style={{ paddingTop: 10 }}>
                    <Card style={{ maxWidth: 1500 }}>
                        <CardHeader
                            title={<h1>{item.name}</h1>}
                            subheader={<h2>{item.category}</h2>}
                        />
                        <CardMedia
                            style={{ height: 800 }}
                            image={item.imageUrl}
                            title="Contemplative Reptile"
                        />
                    </Card>

                    
                </div>
            </center>
        )
    }

    formatAds2(item) {
        const { classes } = this.props;
        let number = Math.floor(Math.random() * (this.state.ads.length - 0)) + 0;
        console.log("random number = "+number)
        return (
            <center>
                <div style={{ paddingTop: 10 }}>
                    <Card style={{ maxWidth: 1500 }}>
                        <CardHeader
                            title={<h1>{item.name}</h1>}
                            subheader={<h2>{item.category}</h2>}
                        />
                        <CardMedia
                            style={{ height: 800 }}
                            image={item.imageUrl}
                            title="Contemplative Reptile"
                        />
                    </Card>
                </div>
            </center>
        )
    }

    handleSearchItems() {
        this.setState({ _id: '', name: '', email: '', query: 'items/description/' + this.state.search })
    }

    handleSearchByCategory(event) {

        if (event.target.value == "") {
            this.setState({ _id: '', name: '', email: '', query: 'items/' })
        } else {
            this.setState({ _id: '', name: '', email: '', query: 'items/category/' + event.target.value })

        }

    }

    async handleDelete(item) {
        await db.collection('items').deleteOne(item._id)
        this.setState({ _id: '', name: '', email: '' })
    }

    async handleCreate() {
        await db.collection('items').createOne({ description: this.state.description, seller: db.user._id, expiry: this.state.expiry, bids: [] })
        this.setState({ _id: '', description: '', seller: '', expiry: '' })
    }

    async handleUpdate() {
        await db.collection('items').replaceOne(this.state.select._id, { _id: this.state.select._id, description: this.state.description, seller: db.user._id, expiry: this.state.expiry, bids: this.state.bids })
        this.setState({ _id: '', description: '', seller: '', expiry: '' })
    }

    handleSelect(item) {
        this.setState({ select: item, _id: item._id, description: item.description, seller: item.seller, expiry: item.expiry, bids: item.bids })
    }

    render() {
        return (
            <div style={{ padding: 20, backgroundImage: "url(../images/Background.jpg)" }}>
                <center><h1 style={{ fontSize: 80 }}>Aircrafts</h1></center>
                <center><FormControl style={{ width: 200 }}>
                    <InputLabel>Search By Category</InputLabel>
                    <Select
                        value={this.state.search}
                        // onChange={e => this.setState({ search: e.target.value })}
                        onChange={e => this.handleSearchByCategory(e)}
                    >
                        <MenuItem value={""}>All</MenuItem>
                        <MenuItem value={"Jet"}>Jets</MenuItem>
                        <MenuItem value={"Helicopter"}>Helicopters</MenuItem>
                        <MenuItem value={"War Planes"}>War Planes</MenuItem>
                        <MenuItem value={"Commercial Planes"}>Commercial Planes</MenuItem>
                        <MenuItem value={"Amphibian Planes"}>Amphibian Planes</MenuItem>
                    </Select>
                </FormControl>
                </center>
                <br />
                {
                    db.user
                    &&
                    <center><Button variant="raised" color="primary" size="small" component={Link} to={`/plane_create`}>Create a new bid </Button></center>

                }
                <List className='DataList'>
                    <DataList collection={this.props.my ? 'users/' + db.user._id + '/items' : this.state.query} formatListItem={(item, i) => this.formatListItem(item, i)} />
                </List>

 

                <Ads />

                
            



            </div>
        )
    }
}


export class details extends Component {

    state = {
        amount: '',
        item: null
    }

    componentWillMount() {
        db.setListener('items/' + this.props.match.params._id, this.handleItem)
    }

    componentWillUnmount() {
        db.removeListener(`items/${this.props.match.params._id}`, this.handleItem)
    }

    handleItem = item => this.setState({ item })

    formatListItem(bid, i) {
        return (
            <ListItem key={i}>
                Username: {bid.username}, Amount: {bid.amount}
            </ListItem>
        )
    }

    async handleBid() {
        if (!this.state.item.highbid || (1 * this.state.amount >= this.state.item.highbid)) {
            let item = this.state.item
            item.highbid = this.state.amount
            await db.collection('items').replaceOne(item._id, item)
            await db.collection('items/' + this.state.item._id + '/bids').createOne({ username: db.user._id, amount: this.state.amount })
        }
        this.setState({ amount: '' })
    }

    render() {
        return (
            this.state.item
            &&
            <center>
            <div style={{ padding: 10, backgroundColor: 'lightblue', width: '60%' }}>
                <center>
                    <h1>{this.state.item.name}</h1>
                    <h2>{this.state.item.category}</h2>
                    {
                        (this.state.item.imageUrl)
                        ? 
                        <img src={this.state.item.imageUrl} width="800" height="500" /> 
                        :
                        "No image"
                    }
                    <h3>Expairy Date: {this.state.item.expiry}</h3>
                    <List className='DataList'>
                        <DataList collection={'items/' + this.state.item._id + '/bids'} formatListItem={(bid, i) => this.formatListItem(bid, i)} />
                    </List>
                </center>
                {
                    db.user
                        ?
                        <TextField type='number' placeholder='Enter Your Bid' value={this.state.amount} onChange={e => this.setState({ amount: e.target.value })} />
                        :
                        <p></p>
                }
                {
                    db.user
                    &&
                    <Button variant="raised" color="primary" size="small" style={{ margin: 3, float: 'right' }} onClick={() => this.handleBid()}>Create a new bid</Button>
                }
            </div>
            </center>
        )
    }
}


export class create extends Component {

    state = {
        search: '',
        _id: '',
        description: '',
        buyer: '',
        expiry: '',
        highbid: '',
        users: [],
        query: 'items',
        name: '',
        imageUrl: '',
        category: ''
    }

    formatListItem(item, i) {
        return (
            <ListItem key={i}>
                {item.description} ({item.seller}, {item.expiry})
                , Bids:
                <span className='Comma'>
                    {(item.bids && item.bids.length !== 0) ? item.bids.map((bid, i) => <span key={i}>{bid.amount} ({bid.username})</span>) : <span>None</span>}
                </span>
                <ListItemSecondaryAction>
                    {
                        db.user
                        &&
                        db.user._id === item.seller
                        &&
                        <Button variant="raised" color="primary" size="small" onClick={() => this.handleDelete(item)}>Delete</Button>
                    }
                    {
                        db.user
                        &&
                        <Button variant="raised" color="primary" size="small" onClick={() => this.handleSelect(item)}>Select</Button>
                    }
                    <Button variant="raised" color="primary" size="small" component={Link} to={`/items/${item._id}`}>Details</Button>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }



    async handleCreate() {
        await db.collection('items').createOne({ name: this.state.name, description: this.state.description, category: this.state.category, imageUrl: this.state.imageUrl, seller: db.user._id, expiry: this.state.expiry, bids: [] })
        this.setState({ _id: '', description: '', seller: '', expiry: '' })
    }



    render() {
        return (
            <div style={{ padding: 10, backgroundColor: 'pink' }}>
                {
                    db.user
                    &&
                    <div>
                        <p>Add a new bid:</p>
                        <TextField label='Name' value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                        <br />
                        <TextField label='Description' value={this.state.description} onChange={e => this.setState({ description: e.target.value })} />
                        <br />
                        <TextField type='date' label='Expiry' value={this.state.expiry} onChange={e => this.setState({ expiry: e.target.value })} />
                        <br />
                        <FormControl >
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={this.state.category}
                                onChange={e => this.setState({ category: e.target.value })}
                            >
                                <MenuItem value={"Jet"}>Jet</MenuItem>
                                <MenuItem value={"Helicopter"}>Helicopter</MenuItem>
                                <MenuItem value={"War Planes"}>War Planes</MenuItem>
                                <MenuItem value={"Commercial Planes"}>Commercial Planes</MenuItem>
                                <MenuItem value={"Amphibian Planes"}>Amphibian Planes</MenuItem>
                            </Select>
                        </FormControl>

                        <br />


                        <TextField label='ImageUrl' value={this.state.imageUrl} onChange={e => this.setState({ imageUrl: e.target.value })} />
                        <br />
                        <Button variant="raised" color="primary" size="small" style={{ margin: 3, float: 'right' }} onClick={() => this.handleCreate()} component={Link} to='/planes'>Create</Button>
                    </div>
                }
            </div>
        )
    }
}