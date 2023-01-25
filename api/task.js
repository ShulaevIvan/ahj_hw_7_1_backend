const data = require('../data/index')

exports.addtask = (ctx) => new Promise(async(resolve, reject) => {
    try {
        data.ticketId += 1;
        ctx.request.body.id = data.ticketId;
        ctx.request.body.created = new Date().toLocaleString();
        console.log(ctx.request.body)
        data.ticketsFull.push(ctx.request.body)
        data.tickets.push({
            id: ctx.request.body.id,
            name: ctx.request.body.name,
            description: ctx.request.body.description,
            status: ctx.request.body.status,
            created: ctx.request.body.created,
        });
        const findObj = data.ticketsFull.find((obj) => obj.id == data.ticketId);
        if (!findObj) reject('not found')
        resolve(findObj)
    }
    catch(err) {
        reject(err);
    }
});

exports.getAllTasks = () => new Promise(async(resolve, reject) => {
    try {
        resolve(JSON.stringify(data.tickets))
    }
    catch(err) {
        reject(err);
    }
});

exports.getTaskById = (id) => new Promise(async(resolve, reject) => {
    try {
        const findObj = data.ticketsFull.find((obj) => obj.id == id);
        if (!findObj) reject('not found')
        resolve(JSON.stringify(findObj))
    }
    catch(err) {
        reject(err);
    }
});

exports.removeTaskById = (id) => new Promise(async(resolve, reject) => {
    try {
        data.ticketsFull = data.ticketsFull.filter((item) => item.id !== id);
        data.tickets = data.tickets.filter((item) => item.id !== id)
        resolve('removed')
    }
    catch(err) {
        reject(err);
    }
});

exports.updateTaskById = (id, replaceContent) => new Promise(async(resolve, reject) => {
    try {
        for (let i = 0; i < data.ticketsFull.length; i++) {
            if (data.ticketsFull[i].id === id) {
                data.ticketsFull[i].id = replaceContent.id;
                data.ticketsFull[i].description = replaceContent.description;
                data.ticketsFull[i].descriptionFull = replaceContent.descriptionFull;
                data.ticketsFull[i].status = replaceContent.status;
                data.tickets[i].id = replaceContent.id;
                data.tickets[i].description = replaceContent.description;
                data.tickets[i].status = replaceContent.status
            }
        }
        const findObj = data.ticketsFull.find((obj) => obj.id == id);
        if (!findObj) reject('not found')
        resolve(JSON.stringify(findObj))
    }
    catch(err) {
        reject(err);
    }
});

exports.updateStatusTaskById = (id, replaceContent) => new Promise(async(resolve, reject) => {
    try {
        console.log('test')
        for (let i = 0; i < data.ticketsFull.length; i++) {
            if (data.ticketsFull[i].id === id) {
                data.ticketsFull[i].id = replaceContent.id;
                data.ticketsFull[i].status = replaceContent.status;
                data.tickets[i].id = replaceContent.id;
                data.tickets[i].status = replaceContent.status
            }
        }
        const findObj = data.ticketsFull.find((obj) => obj.id == id);
        if (!findObj) reject('not found')
        resolve(JSON.stringify(findObj))
    }
    catch(err) {
        reject(err);
    }
});