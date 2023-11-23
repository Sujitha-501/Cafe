var express = require('express');
var router = express.Router();

const passport = require('passport');

require('./../middleware/passport')(passport);

const EmployeeController = require('../controllers/employee.controller');
const UserAccountController = require('../controllers/userAccount.controller');
const CategoryController = require('../controllers/category.controller');
const ProductsController = require('../controllers/products.controller');
router.post('/refreshToken', UserAccountController.refreshToken);
router.post('/signUp', EmployeeController.signUp);
// Customer
router.post('/login', UserAccountController.login);
router.post('/getCustomerDetails', EmployeeController.getCustomerDetails);
router.post('/updateCustomer', EmployeeController.updateCustomer);
router.get('/getDetails', EmployeeController.getDetails);
// Category 
router.post('/createCategory', CategoryController.createCategory);
router.get('/getCategory', CategoryController.getCategory);
router.post('/updateCategory', CategoryController.updateCategory);
// Product
router.post('/createProduct', ProductsController.createProduct);
router.get('/getProduct', ProductsController.getProduct);
router.post('/deleteProduct', ProductsController.deleteProduct);
router.post('/updateProduct', ProductsController.updateProduct);

module.exports = router;
