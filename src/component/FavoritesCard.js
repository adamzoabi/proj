import React from 'react';
const Card = ({card}) => {
  
/*
    async function deletehandler(id) {
          console.log(id,card);

        if (window.confirm("Are you sure??")) {           
          await cardService.deletefavcard(id);
          toast('A card was deleted1');
           setTimeout(toas,3500);
        }      
    }
   function toas() {
   window.location = '/Favorites-cards';
   }
    */
    return ( 
        <div className='col-md-6 col-lg-4 mt-3'>
            <div className='card'>
              
              
                <img src={card.bizImage} width='100' aly={card.bizName} className='p-2' />
                <div className='card-body'>
                    <h5 className='card-title'>{card.bizName}</h5>
                    <p className='card-text'>{card.bizDescription}</p>
                    <p className='card-text border-top pt-2'>
                        <b>Tel:</b>
                        {card.bizPhone}
                        <br />
                        {card.bizAddress}
                    </p>
                </div>
            </div>
        </div>
     );
}
 
export default Card;