import express from 'express'
import {placeOrder, userOrders} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import userAuth from '../middleware/userAuth.js'


const orderRouter = express.Router()




orderRouter.post('/place',userAuth,placeOrder)



orderRouter.post('/userorders',userAuth,userOrders)



export default orderRouter