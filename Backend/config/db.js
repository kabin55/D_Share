import mongoose from "mongoose";

export function connectToDB() {
  const url = process.env.MONGO_URL;
  mongoose
    .connect(url)
    .then(() => {
      console.log(`Connected to database`);
    })
    .catch((err) => console.log(`error connecting to database ${err.message}`));
}
