// components/Counter.js

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../redux/actions'; // Import your action creators

const Counter = () => {
  const dispatch = useDispatch();
  const counterValue = useSelector((state) => state.counter.value);

  return (
    <div>
      <p>Counter Value: {counterValue}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default Counter;
