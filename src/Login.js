import React, { Component } from 'react'
import db from './db'
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

export default class Login extends Component {

    state = {
        email: 'bad@seller.com',
        password: '123456'
    }

    async handleLogin() {
        const result = await db.login(this.state.email, this.state.password)
        if (result) {
            console.log('in login: ', result)
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <div style={{ padding: 20, backgroundImage: "url(../images/SBackGround.jpg)", height: 1600 }}>
                <center>
                    <h1>Login</h1>
                    <div style={{ backgroundImage: "url(../images/Wings.png)", width: 600, height: 387 }}>
                    </div>
                        <Paper style={{ margin: 50, height: 400, width: 500, backgroundColor: '#edb834', paddingBottom: 20 }}>
                            <Typography variant="headline" component="h3" style={{ paddingTop: 50 }}>
                                <center><input value={this.state.email} placeholder='Email' onChange={e => this.setState({ email: e.target.value })} style={{ height: 30, width: 200, fontSize: 15, textAlign: 'center', borderRadius: 5 }} /></center>
                            </Typography>
                            <Typography component="p" style={{ paddingTop: 50 }}>
                                <center><input value={this.state.password} placeholder='Password' type="password" onChange={e => this.setState({ password: e.target.value })} style={{ height: 30, width: 200, fontSize: 15, textAlign: 'center', borderRadius: 5 }} /></center>
                            </Typography>
                            <Typography component="p" style={{ paddingTop: 80 }}>
                                <center><Button variant="raised" color="primary" onClick={() => this.handleLogin()} style={{ height: 50, width: 150 }}>Login</Button></center>
                            </Typography>
                        </Paper>
                </center>
            </div>
        )
    }
}