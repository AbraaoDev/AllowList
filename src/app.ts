import express from "express";
import processRoutes from "./routes/processRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/", processRoutes);

app.listen(PORT, () => {
  console.log("Server on 🚀!");
});
