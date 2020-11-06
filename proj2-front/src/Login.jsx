import React, { Component, useImperativeHandle } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.cadastro = this.cadastro.bind(this)

        this.state = {lista: [
            {username: "Manu"},
            {username: "Lu"}
        ], usuario: {username: '', password: ''}}

    }

    cadastro() {
        axios.post('http://localhost:3003/users/login', this.state.usuario)
            .then(resp => {
                if(resp.data == true ){
                    this.setState((state) => {
                    return {
                        redirectToReferrer: true
                    }
                    })
                    return;
                }
                console.log(resp)
            })
            .catch(erro => console.log(erro))

    }

    handleChange(event) {
        var handleState = (state, event) => {
            state.usuario[event.target.name] = event.target.value
            return state
        }
        this.setState(handleState(this.state, event))
    }

    render() {
        if (this.state.redirectToReferrer === true) {
            return (
                <Redirect to="/AllCountries" />
            )
        }

        return (
            <div>
                <h1>Login</h1>
                <label>Username:</label><br />
                <input name="username" value={this.state.usuario.username} onChange={this.handleChange} /><br />
                <label>Password:</label><br />
                <input type="password" name="password" value={this.state.usuario.password} onChange={this.handleChange} /><br />
                <button onClick={this.cadastro}>Registrar</button>
            </div>
        )

    }
}