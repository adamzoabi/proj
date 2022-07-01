import React, { Component } from 'react';
import PageHeader from './common/PageHeader';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className='container'>
                <PageHeader title='Real App About page'/>
                <div className='row'>
                    <div className='col-12'>
                        <p> This is my About Page</p>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default About;