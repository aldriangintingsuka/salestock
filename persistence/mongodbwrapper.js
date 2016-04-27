function MongoDbWrapper( config )
{
  console.log( 'starting mongodb wrapper' );
  var _config = config;
  var _mongoClient = require( 'mongodb' ).MongoClient;
  var _db;
  
  Connect();
  
  function Connect()
  {
    console.log( 'Connecting to data source ' + _config.Db.DbName );
    _mongoClient.connect( _config.Db.ConnectionString, OnCompleted );
    
    function OnCompleted( err, data )
    {
      if( err )
        throw err;

      _db = data;
      console.log( 'Connected to data source ' + _config.Db.DbName );
    }
  }
  
  function Create( name, item, callback )
  {
    console.log( 'Mongo create item', name, item );
    _db.collection( name ).insertMany( [ item ], OnCompleted( callback ) );   
  }
  
  function Update( name, selector, item, callback )
  {
    console.log( 'Mongo update item', name, selector, item );
    _db.collection(name).updateOne( selector, { $set: item }, OnCompleted( callback ) );   
  }
  
  function Delete(name, selector, callback )
  {
    console.log('Mongo delete item', name, selector);
    _db.collection(name).deleteOne( selector, OnCompleted( callback ) );
  }
  
  function Retrieve( name, query, callback )
  {
    console.log( 'Mongo retrieve item', query );
    _db.collection( name ).find( query ).toArray( OnCompleted( callback ) );
  }

  function OnCompleted( callback )
  {
    function DoOnCompleted( err, data  )
    {
      if( err )
        throw err;
    
      callback( data );
    }
    
    return DoOnCompleted;
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

module.exports = MongoDbWrapper;