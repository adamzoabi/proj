import React from 'react';
import Joi from 'joi-browser';
import Form from './common/Form';
import PageHeader from './common/PageHeader';
import userService from '../services/userService';
import { Redirect } from 'react-router';

class SignIn extends Form {
    state = {
        data: {
            email:'',
            password:'',
        },
        errors:{},
    }

    schema = {
        email: Joi.string().required().email().label('Email'),
        password: Joi.string().required().min(6).label('Password'),
    }
    
    async doSubmit() {
        const {email, password} = this.state.data;
        try{
            await userService.login(email, password);
            window.location = '/';
        } catch (error) {
            console.log(error);
            if(error.response && error.response.status === 400){
                this.setState({errors: {email: error.respons.data}})
            }
            }
        
    }
    

    
    render() {
        if(userService.getCurrentUser()){
            return <Redirect to="/" />
        }
        return(
            <div className='container'>
                <PageHeader title={'Sign in to Real App'} />
            <div className='row'>
                <div className='col-12'>
                    <form onSubmit={this.handleSubmit} autoComplete='off'>
                        {this.renderInput('email', 'Email', 'email')}
                        {this.renderInput('password', 'Password', 'password')}
                        {this.renderButton('SignIn')}
                    </form>
                </div>
            </div>
            </div>
        );
    }
}


export default SignIn;