function Router( express, productService, categoryService )
{
  var _express = express;
  var _productService = productService;
  var _categoryService = categoryService;
  var _router;
  
  BuildRouter();
  
  function BuildRouter()
  {
    _router = _express.Router();
    _router.use( '/products', _productService );
    _router.use( '/categories', _categoryService );
  }
  
  return _router;     
}

module.exports = Router;
