const bookController = require('../controllers/bookControllers');
const router = require('express').Router();

module.exports = function () {
    const bookCtrl = new bookController();

    router.post('/addBook', (bookCtrl.addBook));
    router.get('/getBooks', (bookCtrl.getBooks));


    return router;
}