import React, { Component } from 'react';
import PageHeader from './common/PageHeader';
import cardService from '../services/cardService';
import MainCard from './MainCard';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { cards:[], }
    }
    async componentDidMount() {
        const {data} = await cardService.getallCards();
      //  console.log(data);
        
        if(data.length > 0) {
            this.setState({ cards:data });
        }
    }

    filterContent(cards, searchTerm) {
        const result = cards.filter(
          (card) =>
            card.bizName.toLowerCase().includes(searchTerm) ||
            card.bizDescription.toLowerCase().includes(searchTerm) ||
            card.bizPhone.toLowerCase().includes(searchTerm) ||
            card.bizAddress.toLowerCase().includes(searchTerm)

        );
        this.setState({ cards: result });
      }
        handleTextSearch  = async (e) => {
        
        const searchTerm = e.currentTarget.value;
         await cardService.getallCards().then((res) => {
        console.log(res.data);
        

          if (res.data) {
          this.filterContent(res.data, searchTerm);
            
          }
        });
      };
    render() { 
        const {cards} = this.state;
        
        return ( 
            <div className='container'>
                <PageHeader title='Adam Home Page' />
                <div className="col-lg-3 mt-2 mb-2">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              name="searchTerm"
              onChange={this.handleTextSearch}
            ></input>
          </div>
                <div className='row'>
                    <div className='col-12'>
                    <p>list of all cards below...</p>
                    </div>
                </div>
                <div className='row'>
                {cards.length > 0 && cards.map(card => <MainCard key={card._id} card={card} />)}
            </div>
            </div>
         );
    }
}
 
export default Home;