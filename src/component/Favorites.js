import React, { Component } from 'react';
import cardService from '../services/cardService';
import FavoritesCard from './FavoritesCard';
import PageHeader from './common/PageHeader';

class Favorites extends Component {
    state = {
        cards:[],
    }

    async componentDidMount() {
        const {data} = await cardService.getFavorites();
        console.log("data",data[0].favs);
        if(data.length > 0) {
            this.setState({ cards:data[0].favs });
        }
    }

    render() { 
        const {cards} = this.state;

        return <div className='container'>
            <PageHeader title='My Favorites-cards page' /> 
            <div className='row'>
                <div className='col-12'>
                    <p>Your cards in the list below...</p>
                </div>
            </div>
            <div className='row'>
                {cards.length > 0 && cards.map(card => <FavoritesCard key={card._id} card={card} />)}
            </div>
        </div>;
    }
}
 
export default Favorites;