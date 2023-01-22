const Router = require('koa-router');
const router = new Router();
const task = require('../api/task');
const data = require('../data/index');

router.post('/', async(ctx) => {
    const method = ctx.request.querystring.replace('method=','');
    if (ctx.request.method === 'POST' && method === 'createTicket') {
        try {
            if (method === 'createTicket') {
                const result = await task.addtask(ctx);
                ctx.status = 201;
                ctx.body = result;
            }
        }
        catch(err) {
            console.log(err);
            ctx.status = 500;
            ctx.body = 'iternal error';
        }
    }
});

router.get('/', async(ctx) => {
    const method = ctx.request.querystring.replace('method=','');
    const getByIdStr = ctx.request.querystring.includes('ticketById&id=');
    if (ctx.request.method === 'GET' && method === 'allTickets') {
        try {
            const result = await task.getAllTasks();
            ctx.status = 200;
            ctx.body =  result;
        }
        catch(err) {
            console.log(err);
            ctx.status = 500;
            ctx.body = 'iternal error';
        }
    }
    else if (ctx.request.method === 'GET' && getByIdStr) {
        try {
            const id = Number(method.replace('ticketById&id=', ''));
            const result = await task.getTaskById(id);
            ctx.status = 200;
            ctx.body = result;
        }
        catch(err) {
            console.log(err);
            ctx.status = 500;
            ctx.body = 'iternal error';
        }
    }
});

router.delete('/', async(ctx) => {
    const method = ctx.request.querystring.replace('method=','');
    const getByIdStr = ctx.request.querystring.includes('deleteTicketById&id=');
    if (ctx.request.method === 'DELETE' && getByIdStr) {
        try {
            const id = Number(method.replace('deleteTicketById&id=', ''));
            const result = await task.removeTaskById(id);
            ctx.status = 200;
            ctx.body = result
        }
        catch(err) {
            console.log(err);
            ctx.status = 500;
            ctx.body = err
        }
    }
});

router.patch('/', async(ctx) => {
    const method = ctx.request.querystring.replace('method=','');
    const getByIdStr = ctx.request.querystring.includes('updateTicketById&id=');
    const replaceContent = ctx.request.body;
    if (ctx.request.method === 'PATCH' && getByIdStr) {
        try {
            const id = Number(method.replace('updateTicketById&id=', ''));
            const result = await task.updateTaskById(id, replaceContent);
            ctx.status = 200;
            ctx.body = result
        }
        catch(err) {
            console.log(err);
            ctx.status = 500;
            ctx.body = err
        }
    }
});

module.exports = router;