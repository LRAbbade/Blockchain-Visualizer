const app = require('./config/server');
const port = process.env.PORT || 5000

app.listen(port, function () {
    console.log("servidor rodando com Express na porta " + port);
});
