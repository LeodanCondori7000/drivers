import {useState} from 'react'

const Search = ({onSearch}) => {
  const [driver, setDriver] = useState("");

  const handleChange = (event) => {
    setDriver(event.target.value);
  };

  return (
    <div>
      <input onChange={handleChange} type="search" value={driver} />
      <button
        onClick={() => {
          onSearch(driver), setDriver("");
        }}
      >
        Buscar
      </button>
    </div>
  );
}

export default Search