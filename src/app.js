import express from "express";
import cuentasRoutes from "./routes/cuentas.routes.js";
import "./config.js";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use(cuentasRoutes);

export default app;
