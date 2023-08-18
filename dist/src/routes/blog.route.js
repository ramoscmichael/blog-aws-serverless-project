"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const services_1 = require("../services");
const util_1 = require("../util");
const router = (0, express_1.Router)();
const dao = new db_1.DB();
const blogSvc = new services_1.BlogService(dao);
router.use((0, util_1.securedRoute)());
router.post("/", (req, res) => {
    const auth = req.auth;
    const blog = req.body;
    const data = blogSvc.addBlogPost(blog, auth.id);
    return (0, util_1.sendResponseJson)(data, res);
});
router.post("/:id", (req, res) => {
    const id = +req.params.id;
    const auth = req.auth;
    const blog = req.body;
    const data = blogSvc.updateBlogPost(Object.assign(Object.assign({}, blog), { id }), auth.id);
    return (0, util_1.sendResponseJson)(data, res);
});
router.get("/:id", (req, res) => {
    const auth = req.auth;
    const id = +req.params.id;
    const data = blogSvc.getBlogPost(id, auth.id);
    return (0, util_1.sendResponseJson)(data, res);
});
router.get("/", (req, res) => {
    var _a, _b;
    const auth = req.auth;
    const offset = +((_a = req.query.offset) !== null && _a !== void 0 ? _a : '0');
    const limit = +((_b = req.query.limit) !== null && _b !== void 0 ? _b : '10');
    console.log(offset, limit, auth);
    const data = blogSvc.getBlogPosts(offset, limit, auth.id);
    return (0, util_1.sendResponseJson)(data, res);
});
router.delete("/:id", (req, res) => {
    const auth = req.auth;
    const id = +req.params.id;
    const data = blogSvc.deleteBlogPost(id, auth.id);
    return (0, util_1.sendResponseJson)(data, res);
});
exports.default = router;
//# sourceMappingURL=blog.route.js.map