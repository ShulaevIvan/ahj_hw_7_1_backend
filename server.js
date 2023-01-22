const Koa = require('koa');
const koaBody = require('koa-body');
const router = require('./router');
const app = new Koa();
const port = '7070';

app.use(koaBody({
    urlencoded: true,
    multipart:  true,
}));
app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (ctx, next) => {
    ctx.body = 'server start';
});

app.listen(port,  () => {
    console.log(`http://localost:${port}`);
});