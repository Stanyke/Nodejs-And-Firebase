const firebase = require('../utils/db')
const firestore = firebase.firestore()
const Book = require('../models/book')
const textCaseHandler = require("../utils/textCaseHandler")

class bookService{
    addBook = async (options) => {
        try{
            let {title, description, status} = options
            if (!title || !description || !status)
            {
                return {"data": {"success": false, "message": 'Request failed due to all required inputs were not included', "required inputs": "title, description, status"}, "statusCode": 417}
            }

            options = {
                title: textCaseHandler.firstLetterInSetenceToCapital(title),
                description, status
            }

            let data = await firestore.collection('students').doc().set(options)
            return {"data": {"success": true, "message": 'Book saved', data}, "statusCode": 200}
        }
        catch(err){
            return {"data": {"success": false, "message": err.message}, "statusCode": 500}
        }
    }

    getBooks = async () => {
        try{
            let data = await firestore.collection('students').get()
            let bookArray = []
            if(data.empty){
                return {"data": {"success": true, "message": 'All books', "data": bookArray}, "statusCode": 200}
            }

            let docs = data.docs
            for(let doc of docs) {
                const gottenBook = {
                    id: doc.id,
                    title: doc.data().title,
                    description: doc.data().description,
                    status: doc.data().status
                }
                bookArray.push(gottenBook);
            }
            return {"data": {"success": true, "message": 'All books', "data": bookArray}, "statusCode": 200}
        }
        catch(err){
            return {"data": {"success": false, "message": err.message}, "statusCode": 500}
        }
    }
}

module.exports = bookService