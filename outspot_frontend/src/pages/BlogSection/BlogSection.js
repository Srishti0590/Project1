import Blog from "./Blog";
// import addBlogImage from "../../assets/Images/add-blog-img.jpg";
// import addLocationImage from "../../assets/Images/add-location-img.jpg";
// const blogData = [
//   {
//     imageURL: addBlogImage,
//     authorName: "Shiva Adhikari",
//     _id: "1",
//     writtenDate: "2055 / 12 / 07",
//     title: "Hello world",
//     subtitle: "This is hello world",
//     description:
//       "Want to learn about the hello world more then here you can go to learn about it more in next season ",
//   },
//   {
//     imageURL: addLocationImage,
//     authorName: "Aditya Adhikari",
//     _id: "2",
//     writtenDate: "2055 / 12 / 07",
//     title: "Hello world",
//     subtitle: "This is hello world",
//     description:
//       "Want to learn about the hello world more then here you can go to learn about it more in next season ",
//   },
// ];

const BlogSection = ({ heading, blogData }) => {
  return (
    <>
      <section className="container overflow-hidden">
        <h3 className={`home-heading`}>{heading}</h3>

        <div className="row row-cols-1 row-cols-2 row-cols-3 gx-2 gy-5">
          {blogData.map((blog, i) => {
            return (
              <Blog
                src={blog.imageURL}
                key={blog._id}
                author={blog.authorName}
                date={blog.writtenDate}
                id={blog._id}
                subtitle={blog.subtitle}
                title={blog.title}
                description={blog.description}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default BlogSection;
