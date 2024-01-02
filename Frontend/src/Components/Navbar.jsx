import '../CSS/Navbar.css';
import LOGO from '../assets/LOGO.png';
import { Link } from 'react-router-dom';


const Navbar = () => {

  return (

    <nav className="navbar">
      <div className="logo">
        <img src={LOGO} alt="Logo" />
      </div>

      <ul className="nav-links">
        <Link to={"/Web3"} style={{listStyle:"none" ,textDecoration:"none"}}><li><a href={"#"}>Web3GPT</a></li></Link>
        <Link to={"/metatool"} style={{listStyle:"none" ,textDecoration:"none"}}><li><a>MetaTool</a></li></Link>
        <Link to={"/mint"} style={{listStyle:"none" ,textDecoration:"none"}}><li><a>NFTPlayground</a></li></Link>
        <Link to={"/ipfs"} style={{listStyle:"none" ,textDecoration:"none"}}><li><a>IPFS</a></li></Link>
      </ul>

      <a href={"https://github.com/Adidem23/EnchantMask"}><button className="pushable">
        <span className="shadow"></span>
        <span className="edge"></span>
        <span className="front" id='munde'>
          Star Repo 🤩
        </span>
      </button></a>

    </nav>
  );

};

export default Navbar;