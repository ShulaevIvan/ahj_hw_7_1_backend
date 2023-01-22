const Router = require('koa-router');
const router = new Router();
const koaBody = require('koa-body');
const task = require('../api/task');

router.post('/addtask', async(ctx) => {
    console.log(ctx.request.body)
    try {
        const result = await task.addtask();
        ctx.body =  result;
    }
    catch(err) {
        console.log(err);
        ctx.status = 500;
        ctx.body = 'iternal error';
    }
});

router.get('/', async(ctx) => {
    console.log(ctx.request.body);
    ctx.body =  'get success';
});

module.exports = router;