function CategoryService( express, categoryManager )
{
  console.log( 'product service created' );
  var _categoryManager = categoryManager;

  var _router = express.Router();
  
  BuildRouter();
  
  function BuildRouter()
  {
    _router.use( Log );
    _router.post( '/', Create );
    _router.put( '/:id', Update );
    _router.delete( '/:id', Delete );
    _router.get( '/', Retrieve );
    _router.get( '/:id', RetrieveById );
  }

  function Log( req, res, next )
  {
    console.log( 'category service' );
    next();
  }
  
  function SendResult( res )
  {
    function DoSendResult( data )
    {
      if ('Error' in data)
        res.status(500)
        
      res.json( data );
    }
    
    return DoSendResult;
  }

  function Create( req, res )
  {
    _categoryManager.Create( req.body, SendResult( res ) );
  }

  function Update( req, res )
  {
    _categoryManager.Update( req.params.id, req.body, SendResult( res ) );
  }

  function Delete( req, res )
  {
    _categoryManager.Delete( req.params.id, SendResult( res ) );
  }

  function Retrieve( req, res )
  {
    _categoryManager.Retrieve( req.query, SendResult( res ) );
  }

  function RetrieveById( req, res )
  {
    _categoryManager.RetrieveById( req.params.id, SendResult( res ) );
  }
  
  return _router;  
}

module.exports = CategoryService;