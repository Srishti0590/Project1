import React from "react";
import Spot from "./Spot";
// import addBlogImage from "../../assets/Images/add-blog-img.jpg";
// import addLocationImage from "../../assets/Images/add-location-img.jpg";
// const SpotData = [
//   {
//     imageURL: addBlogImage,
//     spotName: "Gorkha Durbar",
//     address: "Gorkha",
//     _id: "1",
//     writtenDate: "2055 / 12 / 07",
//     title: "Hello world",
//     subtitle: "This is hello world",
//     description:
//       "Want to learn about the hello world more then here you can go to learn about it more in next season ",
//   },
//   {
//     imageURL: addLocationImage,
//     spotName: "Butwal Fulbari",
//     address: "Butwal",
//     _id: "2",
//     writtenDate: "2055 / 12 / 07",
//     title: "Hello world",
//     subtitle: "This is hello world",
//     description:
//       "Want to learn about the hello world more then here you can go to learn about it more in next season ",
//   },
// ];
const SpotSection = ({ sectionHeading, spotData }) => {
  return (
    <section className="container overflow-hidden">
      <h3 className="home-heading">{sectionHeading}</h3>

      <div className="row row-cols-1 row-cols-mid-1 row-cols-lg-2 gx-2 gy-5">
        {spotData.map((data) => {
          return (
            <Spot
              key={data._id}
              id={data._id}
              imageURL={data.imageURL}
              spotName={data.name}
              description={data.description}
              address={data.address}
            />
          );
        })}
      </div>
    </section>
  );
};
export default SpotSection;
