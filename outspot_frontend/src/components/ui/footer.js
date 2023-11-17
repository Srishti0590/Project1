import { AiFillFacebook } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
const Footer = () => {
  return (
    <footer className="d-flex footer">
      <p className="footer-text">Follow us on:</p>
      <ul className="footer-logos">
        <li>
          <AiFillFacebook />
        </li>
        <li>
          <AiFillTwitterCircle />
        </li>
        <li>
          <AiOutlineInstagram />
        </li>
      </ul>
      <p className="footer-copytext">
        <span className="d-block text-center footer-author">
          Developed By: Shiva Adhikari
        </span>
        Copyright &copy; {new Date().getFullYear()} OutSpot All Rights Reseverd.
      </p>
    </footer>
  );
};
export default Footer;
