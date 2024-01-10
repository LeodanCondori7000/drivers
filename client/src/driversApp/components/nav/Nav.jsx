import Button from "../button/Button";
import Search from "../search/Search";
const Nav = ({ onSearch }) => {
  return (
    <nav>
      <Button link="/driver" text="Create Driver" />
      <Search onSearch={onSearch} />
      <Button link="/home" text="Home" />
      <Button link="/about" text="About" />
    </nav>
  );
};

export default Nav;
