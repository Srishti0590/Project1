import React from "react";
import { NavLink } from "react-router-dom";

import Footer from "../components/ui/Footer";
import FeatureCard from "../components/ui/FeatureCard";
import Navbar from "../components/ui/Navbar/Navbar";
import { CiBookmark } from "react-icons/ci";
import { BiCommentAdd } from "react-icons/bi";
import { SiWpexplorer } from "react-icons/si";
import { BsDatabaseAdd } from "react-icons/bs";

const LandingPage = () => {
  const featureContent = [
    {
      id: 1,
      title: "Add Spot",
      description:
        "You can add the spot for picnic and camping on your area or locality to promote the local business. This helps to promote the area as well as helps people to explore more places.",
      icon: <BiCommentAdd />,
    },
    {
      id: 2,
      title: "Book Spot",
      description:
        "You can book the spot for picnicking and camping by going through various places and finding the one which is best for your choice. Among hundreds of spots, you are able to choose the destination you prefer.",
      icon: <CiBookmark />,
    },
    {
      id: 3,
      title: "Explore Spot",
      description:
        "You can add choose spot for your picnic or camping event from among hundred of spots posted by other users.You can then contact the spot handlers and book the spot you want for your event.",
      icon: <SiWpexplorer />,
    },
    {
      id: 4,
      title: "Write Blogs",
      description:
        "After visiting some place fun and doing some fun adventure, you might want to share some fun memories among people or for your future self. So, our platform fulfills that as you can also write blog in our site.",
      icon: <BsDatabaseAdd />,
    },
  ];
  return (
    <>
      <Navbar />
      <div className="container-fluid landing-container">
        <div className="landing-content">
          <div className="landing-text text-center">
            <h1 className="heading-primary landing-heading">
              Unleash your inner Adventure with OutSpot
            </h1>
            <p className="para-sm landing-para">
              Ready to explore new and exciting outdoor destinations? OutSpot
              has got you covered. Our curated collection of the best picnic
              spots, camping sites, and more is the perfect place to start your
              next adventure. Start planning your next thrilling outing today
              with OutSpot!
            </p>
            <button className="btn-custom btn--big btn--hero text-uppercase ">
              Begin your journey
            </button>
          </div>
        </div>

        <div className="container py-5 grid grid--4-cols">
          {featureContent.map((feature, i) => {
            return (
              <FeatureCard
                key={feature.id}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            );
          })}
        </div>
        <div className="cta-section">
          <h2 className="heading-secondary">
            Let's start our journey together
          </h2>
          <p className="para-md">
            OutSpot helps user to find and add various picnic and camping spots.
          </p>
          <div className="cta-action">
            <NavLink to="/signup" className="btn-custom cta-signup">
              Signup
            </NavLink>
            <p className="cta-para">
              <span className="cta-or text-uppercase">or</span> Alreay have an
              account?
            </p>
            <NavLink to="/login" className="btn-custom cta-login">
              Login
            </NavLink>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
