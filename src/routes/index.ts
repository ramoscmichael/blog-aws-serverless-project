import { Router } from "express";

import authRoute from "./user.route";
import blogRoute from "./blog.route";

const routes = Router();

routes.use("/users", authRoute);
routes.use("/blogs", blogRoute);

export default routes;