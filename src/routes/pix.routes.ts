import {Router} from "express";

import userAuthenticated from "../middlewares/userAuthenticated";
import PixController from "../resources/pix/pix.controller";

const pixRouter = Router();

pixRouter.use(userAuthenticated);

pixRouter.post("/request", PixController.request);
pixRouter.post("/pay/:key", PixController.pay);
pixRouter.get("/transactions", PixController.transactions);

export default pixRouter;