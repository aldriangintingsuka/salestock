var container = {};

var expressFactory = require('./expressfactory');
var path = require('path');

var config = require( '../config' );
var mongoDbWrapperFactory = require( '../persistence/mongodbwrapper' );
var dataManagerFactory = require( '../persistence/datamanager' );
var productManagerFactory = require( '../lib/business/productmanager' );
var productServiceFactory = require( '../routes/productservice' );
var categoryManagerFactory = require( '../lib/business/categorymanager' );
var categoryServiceFactory = require( '../routes/categoryservice' );
var routerFactory = require( '../routes/api' );

var express = expressFactory();
container[ 'express' ] = express;
container[ 'path' ] = path;

var mongoDbWrapper = mongoDbWrapperFactory( config );
container[ 'mongoDbWrapper' ] = mongoDbWrapper;

var dataManager = dataManagerFactory( mongoDbWrapper );
container[ 'dataManager' ] = dataManager;

var productManager = productManagerFactory( dataManager );
container[ 'productManager' ] = productManager;

var productService = productServiceFactory( express, productManager );
container[ 'productService' ] = productService;

var categoryManager = categoryManagerFactory( dataManager );
container[ 'categoryManager' ] = categoryManager;

var categoryService = categoryServiceFactory( express, categoryManager );
container[ 'categoryService' ] = categoryService;

var router = routerFactory( express, productService, categoryService );
container[ 'router' ] = router;

module.exports = container;