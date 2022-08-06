import express from 'express'
import mongoose from 'mongoose'
import mongosse from 'mongoose'
import authRoutes from './routes/authRoutes.js'
import trackRoutes from './routes/trackRoutes.js'
import requireAuth from './middlewares/requireAuth.js'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))

app.use(authRoutes)
app.use(trackRoutes)

const MONGO_DB_URL = 'mongodb://127.0.0.1:27017/react-native-app'

mongosse.connect(MONGO_DB_URL)

mongoose.connection.on("connected", () => {
    console.log("connected to mongoose done successfully")
})
mongoose.connection.on("error", (err) => {
    console.log("error : ", err)
})

app.get("/",requireAuth, (req, res) => {
    res.send(`email is : ${req.user.email}`)
})

app.listen(3000, (req,res) => {
    console.log("App Running on 3000")
})

