const FeatureCard = ({ icon, title, description }) => {
  return (
    <>
      <div className="feature-card">
        <div className="feature-icon">{icon}</div>
        <h3 className="feature-heading">{title}</h3>
        <p className="feature-para">{description}</p>
      </div>
    </>
  );
};
export default FeatureCard;
