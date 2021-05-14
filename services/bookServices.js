const firebase = require('../utils/db')
const firestore = firebase.firestore()
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
            return {"data": {"success": true, "message": 'Book saved', data}, "statusCode": 201}
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

    getOneBook = async (params) => {
        try{
            let {id} = params
            if (!id)
            {
                return {"data": {"success": false, "message": 'Request failed due to all required inputs were not included', "required inputs": "id"}, "statusCode": 417}
            }

            let data = await firestore.collection('students').doc(id).get()
            if(data.empty){
                return {"data": {"success": false, "message": 'Book with such ID was not found'}, "statusCode": 404}
            }
            return {"data": {"success": true, "message": 'Book ready', "data": data.data()}, "statusCode": 200}
        }
        catch(err){
            return {"data": {"success": false, "message": err.message}, "statusCode": 500}
        }
    }

    updateOneBook = async (params, options) => {
        try{
            let {id} = params
            if (!id)
            {
                return {"data": {"success": false, "message": 'Request failed due to all required inputs were not included', "required inputs": "id"}, "statusCode": 417}
            }
            
            await firestore.collection('students').doc(id).update(options)
            return {"data": {"success": true, "message": 'Book updated'}, "statusCode": 200}
        }
        catch(err){
            return {"data": {"success": false, "message": err.message}, "statusCode": 500}
        }
    }

    deleteOneBook = async (params) => {
        try{
            let {id} = params
            if (!id)
            {
                return {"data": {"success": false, "message": 'Request failed due to all required inputs were not included', "required inputs": "id"}, "statusCode": 417}
            }
            
            await firestore.collection('students').doc(id).delete()
            return {"data": {"success": true, "message": 'Book deleted'}, "statusCode": 200}
        }
        catch(err){
            return {"data": {"success": false, "message": err.message}, "statusCode": 500}
        }
    }
}

module.exports = bookService