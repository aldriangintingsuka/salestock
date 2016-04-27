function DataManager( dbWrapper )
{
  console.log( 'starting data manager' );
  var _dbWrapper = dbWrapper;
  
  function Connect()
  {
    console.log( 'Connecting to data source' );
    _dbWrapper.Connect();
  }
  
  function Create( name, item, callback )
  {
    console.log( 'Create item', name, item );
    _dbWrapper.Create( name, item, callback )
  }
  
  function Update( name, selector, item, callback )
  {
    console.log( 'Update item', name, selector, item );
    _dbWrapper.Update( name, selector, item, callback )
  }
  
  function Delete( name, selector, callback )
  {
    console.log( 'Delete item', name, selector );
    _dbWrapper.Delete( name, selector, callback )
  }
  
  function Retrieve( name, query, callback )
  {
    console.log( 'Retrieve item', query );
    _dbWrapper.Retrieve( name, query, callback )
  }
  
  var _definition = {
    Connect : Connect,
    Create : Create,
    Update : Update,
    Delete : Delete,
    Retrieve : Retrieve                  
  };
  
  return _definition;
}

module.exports = DataManager;