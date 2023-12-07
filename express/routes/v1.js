var express = require('express');
var router = express.Router();

const passport = require('passport');

require('./../middleware/passport')(passport);

const EmployeeController = require('../controllers/employee.controller');
const UserAccountController = require('../controllers/userAccount.controller');
const CategoryController = require('../controllers/category.controller');
const ProductsController = require('../controllers/products.controller');
const OrderController = require('../controllers/order.controller');
router.post('/refreshToken', UserAccountController.refreshToken);
// Customer
router.post('/login', UserAccountController.login);
router.post('/signup', EmployeeController.signup);
// User 
router.post('/updateUser', passport.authenticate('jwt', { session: false }), EmployeeController.updateUser);
router.get('/getDetails', passport.authenticate('jwt', { session: false }), EmployeeController.getDetails);
// Category 
router.post('/createCategory', passport.authenticate('jwt', { session: false }), CategoryController.createCategory);
router.get('/getCategoryCount', passport.authenticate('jwt', { session: false }), CategoryController.getCategoryCount);
router.post('/getOneCategory', passport.authenticate('jwt', { session: false }), CategoryController.getOneCategory);
router.get('/getCategory', passport.authenticate('jwt', { session: false }),  CategoryController.getCategory);
router.post('/updateCategory', passport.authenticate('jwt', { session: false }), CategoryController.updateCategory);
// Product
router.post('/createProduct', passport.authenticate('jwt', { session: false }), ProductsController.createProduct);
router.get('/getProductCount', passport.authenticate('jwt', { session: false }), ProductsController.getProductCount);
router.post('/getProductById', passport.authenticate('jwt', { session: false }), ProductsController.getProductById);
router.post('/getOneProduct', passport.authenticate('jwt', { session: false }), ProductsController.getOneProduct);
router.post('/getProductByName', passport.authenticate('jwt', { session: false }), ProductsController.getProductByName);
router.get('/getProduct', passport.authenticate('jwt', { session: false }), ProductsController.getProduct);
router.post('/deleteProduct', passport.authenticate('jwt', { session: false }), ProductsController.deleteProduct);
router.post('/updateProduct', passport.authenticate('jwt', { session: false }), ProductsController.updateProduct);
// Order
router.post('/createOrder', passport.authenticate('jwt', { session: false }), OrderController.createOrder);
router.post('/getAllOrders', passport.authenticate('jwt', { session: false }), OrderController.getAllOrders);
router.get('/getOrderCount', passport.authenticate('jwt', { session: false }), OrderController.getOrderCount);
// Bills
router.post('/createBills', passport.authenticate('jwt', { session: false }), OrderController.createBills);
router.get('/getAllBills', passport.authenticate('jwt', { session: false }), OrderController.getAllBills);
module.exports = router;
