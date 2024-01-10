import React from "react";
import { connect } from "react-redux";
import { fetchDrivers } from "../../reduxLogic/actions";
import Cards from "../cards/Cards";

function Home({ drivers, fetchDrivers, searchedDriver }) {
  React.useEffect(() => {
    fetchDrivers();
  }, []);
  console.log(searchedDriver);

  // console.log(drivers);
  if (!drivers.length) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <Cards drivers={drivers} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    drivers: state.drivers.drivers,
    searchedDriver: state.drivers.searchedDriver,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDrivers: () => dispatch(fetchDrivers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
