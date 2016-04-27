function CategoryManager( dataManager )
{
  console.log( 'category manager created' );
  var _dataManager = dataManager;

  function Create( item, callback )
  {
    console.log('category manager create');
    
    _dataManager.Retrieve('Categories', { name : item.name }, OnCompleted );
    
    function OnCompleted(data) {
      if (data.length > 0)
        callback({ Error: "Item already exists" + item.name });
      else
        FindParentPath(item.parent, OnParentPathCompleted );
    }

    function OnParentPathCompleted(data)
    {
      item.parent = data;
      _dataManager.Create('Categories', item, callback);
    }
  }  

  function Update( id, item, callback )
  {
    console.log('category manager update');
    _dataManager.Update('Categories', { name : id }, item, callback );
  }  

  function Delete( id, callback )
  {
    console.log('category manager delete');
    _dataManager.Delete( 'Categories', { name : id }, callback );
  }  

  function Retrieve( reqQueryMap, callback )
  {
    console.log( 'category manager retrieve' );
    _dataManager.Retrieve('Categories', {}, callback );
  }  

  function RetrieveById( id, callback )
  {
    console.log( 'category manager retrieve by id' );
    _dataManager.Retrieve( 'Categories', { name : id }, callback );
  }
  
  function FindParentPath( parent, callback )
  {
    if (!parent)
      callback('');
    else 
      _dataManager.Retrieve( 'Categories', { name : parent }, OnCompleted );
    
    function OnCompleted(data)
    {
      if ( parent && data.length == 0)
        callback({ Error: "Parent Item does not exist" + parent });
      else
      {
        var parentPath = data[0].parent + ',' + parent;
        callback( parentPath );
      }
    }
  }  
  
  return {
    Create : Create,
    Update : Update,
    Delete : Delete,
    Retrieve : Retrieve,
    RetrieveById : RetrieveById,
  };
}

module.exports = CategoryManager;