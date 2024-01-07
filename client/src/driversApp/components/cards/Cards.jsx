import React from 'react';
import Card from '../card/Card'

const Cards = ({drivers}) => {
  return (
    <div>{drivers&&drivers.map(driver=>(<Card key={driver.id} driver={driver} />))}</div>
  )
}

export default Cards
