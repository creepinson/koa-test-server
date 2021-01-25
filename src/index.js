const Koa = require("koa");
const Router = require("@koa/router");

const app = new Koa();
const router = new Router();

router.get("/", (ctx) => {
    ctx.body = "Hello, World!";
});

router.get("/stats", (ctx) => {
    ctx.type = "html"
    const used = process.memoryUsage();
    for (let key in used)
        ctx.body += `${key} ${
            Math.round((used[key] / 1024 / 1024) * 100) / 100
        } MB<br/>`;
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Running on port: ${port}`));
