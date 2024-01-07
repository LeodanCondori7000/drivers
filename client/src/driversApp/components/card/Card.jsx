import React from 'react';

const Card = ({driver}) => {
  return (
    <div>
      <h2>name: {driver.name + " " + driver.lastname}</h2>
      <img src={driver.image} alt={driver.name + " " + driver.lastname} />
    </div>
  )
}

export default Card;
