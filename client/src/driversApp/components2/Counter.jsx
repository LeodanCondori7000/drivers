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

// import React from 'react';
// import { connect } from 'react-redux';
// import { increment, decrement } from '../redux/actions';

// class Counter extends React.Component {
//   render() {
//     const { counterValue, increment, decrement } = this.props;

//     return (
//       <div>
//         <p>Counter Value: {counterValue}</p>
//         <button onClick={increment}>Increment</button>
//         <button onClick={decrement}>Decrement</button>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     counterValue: state.counter.value,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     increment: () => dispatch(increment()),
//     decrement: () => dispatch(decrement()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
