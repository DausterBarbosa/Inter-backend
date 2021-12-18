import "express-async-errors";

import express from "express";
import cors from "cors";

import globalErrors from "./middlewares/globalErrors";

import routes from "./routes";

import "./database";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(globalErrors);

app.listen(3333);