import { Router } from "express";
import { DB } from "../db";
import { BlogService } from "../services";
import { securedRoute, sendResponseJson } from "../util";
import { Post } from "../model";

const router: Router = Router();
const dao = new DB();
const blogSvc =  new BlogService(dao);

router.use(securedRoute());

router.post("/", (req: any, res) => {
    const auth = req.auth;
    const blog: Post = req.body;
    const data = blogSvc.addBlogPost(blog, auth.id);
    return sendResponseJson(data, res);
});

router.post("/:id", (req: any, res) => {
    const id = +req.params.id
    const auth = req.auth;
    const blog: Post = req.body;

    const data = blogSvc.updateBlogPost({ ... blog, id}, auth.id);
    return sendResponseJson(data, res); 
            
});

router.get("/:id", (req: any, res) => {
    const auth = req.auth;
    const id = +req.params.id;
    const data = blogSvc.getBlogPost(id, auth.id);
    return sendResponseJson(data, res); 
});

router.get("/", (req: any, res) => {
    const auth = req.auth;
    const offset = +(req.query.offset ?? '0')
    const limit = +(req.query.limit ?? '10')

    console.log(offset, limit, auth);

    const data = blogSvc.getBlogPosts(offset, limit, auth.id);
    return sendResponseJson(data, res)
});

router.delete("/:id", (req: any, res) => {
    const auth = req.auth;
    const id = +req.params.id;

    const data = blogSvc.deleteBlogPost(id, auth.id);
    return sendResponseJson(data, res); 
});

export default router;