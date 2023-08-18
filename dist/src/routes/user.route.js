"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const services_1 = require("../services");
const util_1 = require("../util");
const dao = new db_1.DB();
const userSvc = new services_1.UserService(dao);
const router = (0, express_1.Router)();
const privateRoute = (0, express_1.Router)();
router.use(privateRoute);
/**
   * @openapi
   * /isAlive:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
router.post("/signin", (req, res) => {
    const login = req.body;
    const data = userSvc.generateAccessToken(login);
    return (0, util_1.sendResponseJson)(data.then(token => ({ token })), res);
});
router.post("/signup", (req, res) => {
    const user = req.body;
    const data = userSvc.createUser(user);
    return (0, util_1.sendResponseJson)(data, res);
});
privateRoute.use("/me", (0, util_1.securedRoute)());
privateRoute.get("/", (req, res) => {
    const auth = req.auth;
    const data = userSvc.getUserById(auth.id);
    return (0, util_1.sendResponseJson)(data, res);
});
privateRoute.post("/", (req, res) => {
    const auth = req.auth;
    const user = req.body;
    const data = userSvc.updateUser(Object.assign(Object.assign({}, user), { id: auth.id }));
    return (0, util_1.sendResponseJson)(data, res);
});
exports.default = router;
//# sourceMappingURL=user.route.js.map