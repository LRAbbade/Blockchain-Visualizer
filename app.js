const app = require('./config/server');
<<<<<<< HEAD
=======
const db = require('./app/database');
>>>>>>> 0050e5a15d4ff89f213330d05434f73ed4200e67
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
});
