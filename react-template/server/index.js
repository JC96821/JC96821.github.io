const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');

const koa = new Koa();
const router = new Router();

router.get('/', async ctx => {
    ctx.body = '8000 /';
});

router.get('/user', async ctx => {
    ctx.body = '8000 /user';
});

koa.use(cors({
    origin: '*'
}));

koa.use(router.routes());
koa.use(router.allowedMethods());

const port = '8000';
koa.listen(port, () => {
    console.log(`server is listener on: ${port}`);
});

