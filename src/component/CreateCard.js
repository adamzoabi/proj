import React from 'react';
import Form from './common/Form';
import PageHeader from './common/PageHeader';
import Joi from 'joi-browser';
import cardService from '../services/cardService';
import { toast } from 'react-toastify';

class CreateCard extends Form {
    state = {
        data:{
            bizName: '',
            bizDescription: '',
            bizAddress: '',
            bizPhone: '',
            bizImage: '',
        },
        errors:{}
    }
    schema = {
        bizName: Joi.string().min(2).max(255).required().label('Name'),
        bizDescription: Joi.string().min(2).max(1024).required().label('Description'),
        bizAddress: Joi.string().min(2).max(400).required().label('Address'),
        bizPhone: Joi.string().min(9).max(10).required().regex(/^0[2-9]\d{7,8}$/).label('Phone'),
        bizImage: Joi.string().min(11).max(1024).uri().allow("").label('Image'),
    };

    async doSubmit() {
        const data = {...this.state.data};
        if(!data.bizImage) {
            delete data.bizImage;
        }

        await cardService.createCard(data);
        toast('A new card was created');
        this.props.history.replace('/my-cards');
    }

    render() { 
        return (
            <div className='container'>
                <PageHeader title='Create a business card' />
            <div className='row'>
                <div className='col-12'>
                    <form onSubmit={this.handleSubmit} autoComplete='off'>
                        {this.renderInput('bizName', 'Business Name')}
                        {this.renderInput('bizDescription', 'Business Description')}
                        {this.renderInput('bizAddress', 'Business Address')}
                        {this.renderInput('bizPhone', 'Business Phone')}
                        {this.renderInput('bizImage', 'Business Image')}
                        {this.renderButton('Create Card')}
                    </form>
                </div>
            </div>
            </div>
        );
    }
}
 
export default CreateCard;