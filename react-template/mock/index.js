const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const axios = require('axios');
const config = require('../react.config');

const app = new Koa();
const router = new Router();

const proxyUrl = config.proxyUrl;

router.get('/', async ctx => {
    const path = ctx.request.url;
    const res = await axios.get(`${proxyUrl}${path}`);
    ctx.body = res.data;
});

router.get('/user', async ctx => {
    const path = ctx.request.url;
    const res = await axios.get(`${proxyUrl}${path}`);
    ctx.body = res.data;
});

app.use(cors({
    origin: '*',
    credentials: true,
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    allowMethods: ['OPTIONS', 'GET', 'PUT', 'POST', 'DELETE'],
    allowHeaders: ['x-requested-with', 'accept', 'origin', 'content-type'],
    optionsSuccessStatus: 200,
    maxAge: 1728000
}));
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

const port = '4001';
app.listen(port, () => {
    console.log(`serve is listener on: ${port}`);
});