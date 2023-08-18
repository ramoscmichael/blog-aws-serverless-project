import { Router } from "express";
import { DB } from "../db";
import { UserService } from "../services";
import { securedRoute, sendResponseJson } from "../util";
import { LoginInfo, User } from "../model";

const dao = new DB();
const userSvc = new UserService(dao);
const router: Router = Router();
const privateRoute: Router = Router();

router.use(privateRoute);

router.post("/signin", (req, res) => {
    const login:LoginInfo = req.body;
    const data = userSvc.generateAccessToken(login);
    return sendResponseJson(data.then(token => ({ token })), res);
});

router.post("/signup", (req, res) => {
    const user = req.body;
    const data = userSvc.createUser(user)
    return sendResponseJson(data, res);
});


privateRoute.use("/me", securedRoute());
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


export default router;