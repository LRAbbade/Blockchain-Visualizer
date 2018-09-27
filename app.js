const app = require('./config/server');
const db = require('./app/database');
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
});
