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


export default class Ads extends React.Component {

    state = {
        ads: null,
        num: 0
    }

    async componentWillMount() {
        await db.setListener('ads/', this.getAds)

    }

    async componentWillUnmount() {
        await db.removeListener('ads', this.getAds)

    }

    getAds = async (ads) => await this.setState({ ads })

    render() {

        let x = this.state.ads

        let num = Math.random() * (4 - 0) + 0;
        num = Math.floor(num);
        console.log(num)

        return (
            <div >

                
                {
                    this.state.ads
                        ?
                        <center>
                            <div style={{ paddingTop: 10 }}>
                            
                                <Card style={{ maxWidth: 1500 }}>
                                    <CardHeader
                                        title={<h1></h1>}
                                        subheader={<h2></h2>}
                                    />
                                    <CardMedia
                                        style={{ height: 800 }}
                                        image={x[num].imageUrl}
                                        title="Contemplative Reptile"
                                    />
                                </Card>
                            </div>
                        </center>
                        :
                        <p>loading ad..</p>
                }


            </div>
        );
    }


}