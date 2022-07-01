import React from "react";
import Form from './common/Form';
import PageHeader from './common/PageHeader';
import Joi from 'joi-browser';
import cardService from '../services/cardService';
import { toast } from 'react-toastify';


class EditCard extends Form {
    constructor(props) {
        super(props);
       console.log(props)
        this.state = {
        data:{
            bizName: '',
            bizDescription: '',
            bizAddress: '',
            bizPhone: '',
            bizImage: '',
            
        },
        errors:{},
    }
   
}
    schema = {
        bizName: Joi.string().min(2).max(255).required().label('Name'),
        bizDescription: Joi.string().min(2).max(1024).required().label('Description'),
        bizAddress: Joi.string().min(2).max(400).required().label('Address'),
        bizPhone: Joi.string().min(9).max(10).required().regex(/^0[2-9]\d{7,8}$/).label('Phone'),
        bizImage: Joi.string().min(11).max(1024).uri().allow("").label('Image'),
    };

    async componentDidMount() {

        const idid =this.props.cardid;
        console.log(idid,"props to param");
        const {data} = await cardService.getCard(idid);
        console.log(data,"api data collect"); 

        if(data){
            this.setState({ data:{"bizName": data["bizName"],
                "bizDescription": data["bizDescription"],
                "bizAddress": data["bizAddress"],
                "bizPhone": data["bizPhone"],
                "bizImage": data["bizImage"]
             }
            });
        }
        
    }

    async  doSubmit() {
        const idid =this.props.cardid;
        const data = {...this.state.data};
        if(!data.bizImage) {
            delete data.bizImage;
        }

        await cardService.updateCard(
            idid,
            {"bizName": data["bizName"],
                "bizDescription": data["bizDescription"],
                "bizAddress": data["bizAddress"],
                "bizPhone": data["bizPhone"],
                "bizImage": data["bizImage"]
             }

            );
        toast('A card was updated succefully');
        setTimeout(toas,3000); 
        function toas() {
        window.location = '/my-cards';
         } 
      }
    
       
    render() { 
        

        return (
            
            <div className='container'>
                <PageHeader title='Edit and update a business card' />
            <div className='row'>

                <div className='col-12'>
                    <form onSubmit={this.handleSubmit} autoComplete='off'>
                        {this.renderInput('bizName', 'Business Name')}
                        {this.renderInput('bizDescription', 'Business Description')}
                        {this.renderInput('bizAddress', 'Business Address')}
                        {this.renderInput('bizPhone', 'Business Phone')}
                        {this.renderInput('bizImage', 'Business Image')}
                        {this.renderButton('Update Card')}
                    </form>
                    

                </div>
            </div>
            </div>
        );
    }
}
 
export default EditCard;