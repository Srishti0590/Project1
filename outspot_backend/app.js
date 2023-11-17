const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(cors());

require("./database/connection");

app.use("/images", express.static(path.join(__dirname, "/images")));

app.use("/users", require("./routes/userRoute"));

app.use("/spots", require("./routes/spotRoute"));
app.use("/bookings", require("./routes/bookingRoute"));

app.use("/blogs", require("./routes/blogRoutes"));

app.use("/reviews", require("./routes/reviewRoute"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
