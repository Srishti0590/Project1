import { NavLink } from "react-router-dom";

import Card from "../../components/ui/Card";
const Spot = ({ id, imageURL, spotName, description, address }) => {
  return (
    <div className="col p-4 justify-self-stretch align-self-stretch" key={id}>
      <Card className="home-container grid grid--2-cols">
        <img src={imageURL} alt="spot" className="home-img spot-img" />
        <div className="spot-contents">
          <h4 className="spot-name">
            <NavLink to={`/location/${id}`}>{spotName}</NavLink>
          </h4>
          <p className="spot-description">{description}</p>
          <p className="spot-address">{address}</p>
        </div>
      </Card>
    </div>
  );
};
export default Spot;
