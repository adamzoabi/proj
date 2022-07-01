import React from "react";
import EditCard from './EditCard';

const EditCardScreen=({match})=> {
    const cardid = match.params.id;//<div>{cardid}</div>
    return (
      <>
        <main className="main-wrap">
          <EditCard cardid={cardid} />
        
        </main>
      </>
    );
  };
  export default EditCardScreen;
  