function ProductManager( dataManager )
{
  console.log( 'product manager created' );
  var _dataManager = dataManager;

  function Create( item, callback )
  {
    console.log('product manager create');
    
    _dataManager.Retrieve('Products', { sku : item.sku }, OnCompleted );
    
    function OnCompleted( data )
    {
      if( data.length > 0 )
        callback({ Error: "Item already exists" + item.sku });
      else
        _dataManager.Create('Products', item, callback);
    }
  }  

  function Update( id, item, callback )
  {
    console.log('product manager update');
    _dataManager.Update('Products', { sku : id }, item, callback );
  }  

  function Delete( id, callback )
  {
    console.log('product manager delete');
    _dataManager.Delete( 'Products', { sku : id }, callback );
  }  

  function Retrieve( reqQueryMap, callback )
  {
    console.log( 'product manager retrieve' );
    var queryMap = {};
    
    if( reqQueryMap.color )
      queryMap.color = reqQueryMap.color;
    
    if( reqQueryMap.size )
      queryMap.size = reqQueryMap.size;
    
    if( 'minprice' in reqQueryMap || 'maxprice' in reqQueryMap )
    {
      queryMap.price = {};
            
      if( 'minprice' in reqQueryMap )
        queryMap.price.$gte = parseFloat( reqQueryMap.minprice );
            
      if( 'maxprice' in reqQueryMap )
        queryMap.price.$lte = parseFloat( reqQueryMap.maxprice );
    }    
    
    _dataManager.Retrieve( 'Products', queryMap, callback );
  }  

  function RetrieveById( id, callback )
  {
    console.log( 'product manager retrieve by id' );
    _dataManager.Retrieve( 'Products', { sku : id }, callback );
  }  
  
  return {
    Create : Create,
    Update : Update,
    Delete : Delete,
    Retrieve : Retrieve,
    RetrieveById : RetrieveById,
  };
}

module.exports = ProductManager;