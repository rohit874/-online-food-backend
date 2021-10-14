import express from 'express';
import {registerController, loginController, restaurantController, OrderController} from '../controller';
import auth from '../middilewares/auth'
const router  = express.Router();

router.post('/register', registerController.register)
router.post('/login', loginController.login)
router.post('/logout', auth, loginController.logout)
router.get('/restaurant', restaurantController.getRestaurant)
router.get('/search/:name', restaurantController.searchRestaurant)
router.get('/restaurant/:id', restaurantController.showRestaurant)
router.post('/cart', restaurantController.showCartItems)
router.post('/checkout',auth, OrderController.placeOrder)
router.post('/order',auth, OrderController.getOrders)




export default router;