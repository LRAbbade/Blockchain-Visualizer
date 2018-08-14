const app = require('./config/server');

const port = 8080;
app.listen(port, function () {
    console.log("servidor rodando com Express na porta " + port);
});
