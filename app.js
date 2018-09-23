const app = require('./config/server');
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
});
