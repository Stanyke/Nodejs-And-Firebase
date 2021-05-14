const dotenv = require('dotenv')

dotenv.config()

const {
    PORT,
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGEING_SENDER_ID,
    APP_ID
} = process.env


module.exports = {
    localPort: PORT,
    firebaseConfig: {
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGEING_SENDER_ID,
        appId: APP_ID
    }
}