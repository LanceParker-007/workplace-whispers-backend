import app from "./app.js";
import config from "./config.js";
import connectDB from "./db/db.js";

connectDB()
  .then(() => {
    app.listen(config.PORT || 5000, () => {
      console.log(`Server is up and running on ${config.PORT || 5000}`);
    });

    // To handel errors ar application level
    app.on("error", (error) => {
      console.log("ERROR in app !!! ", error);
      throw error;
    });
  })
  .catch((err) => {
    console.log(`Failed to start App !!! ${err}`);
  });
