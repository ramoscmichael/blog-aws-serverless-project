import { Router } from "express";
import { DB } from "../db";
import { UserService } from "../services";
import { securedRoute, sendResponseJson } from "../util";
import { LoginInfo, User } from "../model";

const dao = new DB();
const userSvc = new UserService(dao);
const router: Router = Router();

const privateRoute: Router = Router();
const publicRoute: Router = Router();

privateRoute.use(securedRoute());

publicRoute.post("/signin", (req, res) => {
    const login:LoginInfo = req.body;
    const data = userSvc.generateAccessToken(login);
    return sendResponseJson(data.then(token => ({ token })), res);
});

publicRoute.post("/signup", (req, res) => {
    const user = req.body;
    const data = userSvc.createUser(user)
    return sendResponseJson(data, res);
});

privateRoute.get("/", (req: any, res) => {
    const auth = req.auth;
    const data = userSvc.getUserById(auth.id);
    return sendResponseJson(data, res);
});

privateRoute.post("/", (req: any, res) => {
    const auth = req.auth;
    const user: User = req.body;
    const data = userSvc.updateUser({
        ... user,
        id: auth.id,
    });

    return sendResponseJson(data, res);
});

router.use("/me", privateRoute);
router.use("/", publicRoute);

export default router;