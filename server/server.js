const express = require('express'); //импорт модуля express
const fs = require('fs'); //импорт модуля file system
const app = express();//для обработки запросов get, post, put, delete
const cart = require('./cartRouter');//обработчик всех запросов корзины, локальный модуль

app.use(express.json()); //общение с сервером через JSON
app.use('/', express.static('public'));//при открытии гл.стр-цы открываем index.html в папке public
app.use('/api/cart', cart);//


// app.get();
// app.post();
// app.put();
// app.delete();

app.get('/api/products', (req, res) => { //при получении запроса
    fs.readFile('server/db/products.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            res.send(data);
        }
    })
});

// app.get('/api/cart/:id', (req, res) => {
//    // res.send(req.params.id);
//     res.send(req.query);
// });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}...`));