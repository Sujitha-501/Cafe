var express = require('express');
var router = express.Router();

const passport = require('passport');

require('./../middleware/passport')(passport);

const EmployeeController = require('../controllers/employee.controller');
const UserAccountController = require('../controllers/userAccount.controller');
const CategoryController = require('../controllers/category.controller');
const ProductsController = require('../controllers/products.controller');
router.post('/refreshToken', UserAccountController.refreshToken);
// Customer
router.post('/login', UserAccountController.login);
router.post('/signup', EmployeeController.signup);
// Based on roles
router.post('/getCustomerDetails', passport.authenticate('jwt', { session: false }), EmployeeController.getCustomerDetails);
router.post('/updateCustomer', passport.authenticate('jwt', { session: false }), EmployeeController.updateCustomer);
router.get('/getDetails', passport.authenticate('jwt', { session: false }), EmployeeController.getDetails);
// Category 
router.post('/createCategory', passport.authenticate('jwt', { session: false }), CategoryController.createCategory);
router.get('/getCategoryCount', passport.authenticate('jwt', { session: false }), CategoryController.getCategoryCount);
router.get('/getCategory', passport.authenticate('jwt', { session: false }),  CategoryController.getCategory);
router.post('/updateCategory', passport.authenticate('jwt', { session: false }), CategoryController.updateCategory);
// Product
router.post('/createProduct', passport.authenticate('jwt', { session: false }), ProductsController.createProduct);
router.get('/getProductCount', passport.authenticate('jwt', { session: false }), ProductsController.getProductCount);
router.get('/getProduct', passport.authenticate('jwt', { session: false }), ProductsController.getProduct);
router.post('/deleteProduct', passport.authenticate('jwt', { session: false }), ProductsController.deleteProduct);
router.post('/updateProduct', passport.authenticate('jwt', { session: false }), ProductsController.updateProduct);

module.exports = router;
