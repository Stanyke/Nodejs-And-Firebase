const bookService = require('../services/bookServices')

module.exports = function bookController() {
    const bookServiceInstance = new bookService();

    //Add new books
    this.addBook = async (req, res) => {
        const data = await bookServiceInstance.addBook(req.body);
        return res.status(data.statusCode).json(data.data);
    }

    //Get all books
    this.getBooks = async (req, res) => {
        const data = await bookServiceInstance.getBooks();
        return res.status(data.statusCode).json(data.data);
    }
}