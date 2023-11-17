import Card from "./Card";
const Form = ({ classname, img, alt, heading, onSubmit, children }) => {
  return (
    <>
      <Card classname={`form-container ${classname}`}>
        <img className="form-img" src={img} alt={alt} />
        <h2>{heading}</h2>
        <form onSubmit={onSubmit} className="form">
          {children}
        </form>
      </Card>
    </>
  );
};
export default Form;
