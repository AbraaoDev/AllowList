import express from "express";
import processRoutes from "./routes/processRoutes";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3333;

const corsOptions = {
  origin: "*", // Permite qualquer origem
  methods: "*", // Permite todos os métodos (GET, POST, PUT, DELETE, etc.)
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/", processRoutes);

app.listen(PORT, () => {
  console.log("Server on 🚀!");
});
