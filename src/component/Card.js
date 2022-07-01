import React from 'react';
import { Link } from "react-router-dom";
import cardService from '../services/cardService';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
const Card = ({card}) => {
  

    async function deletehandler(id) {
          console.log(id,card);

        if (window.confirm("Are you sure??")) {           
          await cardService.deletecard(id);
          toast('A card was deleted1');
           setTimeout(toas,3500);
        }      
    }
   function toas() {
   window.location = '/my-cards';
   }
    
    return ( 
        <div className='col-md-6 col-lg-4 mt-3'>
            <div className='card'>
            <Link
            
           // onClick={() => update(card._id)}
                to={`/card/${card._id}/edit`}
                className="btn btn-sm btn-outline-success p-2 pb-3 md-6"
              >
                <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
              </Link>
              <Link
                to="#"
                onClick={() => deletehandler(card._id)}
                className="btn btn-sm btn-outline-danger p-2 pb-3 md-6"
              >
                <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
              </Link>
              
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