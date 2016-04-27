var frisby = require('frisby');

frisby.create('Create product 1')
  .post('http://localhost:3000/api/products',
  { sku : 'DRESS0001', price : 35000, size : 'large', color : 'blue', category : 'Dress' },
  {json:true})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON( { ops : [ { sku : 'DRESS0001' } ] })
.toss();

frisby.create('Create duplicate product')
  .post('http://localhost:3000/api/products',
  { sku : 'DRESS0001', price : 35000, size : 'large', color : 'blue', category : 'Dress' },
  {json:true})
  .expectStatus(500)
.toss();

frisby.create('Create product 2')
  .post('http://localhost:3000/api/products',
  { sku : 'DRESS0002', price : 55000, size : 'small', color : 'red', category : 'Skirt' },
  {json:true})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON( { ops : [ { sku : 'DRESS0002' } ] })
.toss();

frisby.create('Retrieve all products')
  .get('http://localhost:3000/api/products')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON( '?', { sku : 'DRESS0001' })
  .expectJSON( '?', { sku : 'DRESS0002' })
.toss();

frisby.create('Filter products with size')
  .get('http://localhost:3000/api/products?size=small')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON( '0', { sku : 'DRESS0002' })
.toss();

frisby.create('Filter products with color')
  .get('http://localhost:3000/api/products?color=blue')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON( '0', { sku : 'DRESS0001' })
.toss();

frisby.create('Filter products with price range')
  .get('http://localhost:3000/api/products?minprice=40000&maxprice=60000')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON( '0', { sku : 'DRESS0002' })
.toss();

frisby.create('Update product 2')
  .put('http://localhost:3000/api/products/DRESS0002',
  { color : 'blue' },
  {json:true})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
//  .expectJSON( { ops : [ { sku : 'DRESS0002' } ] })
.toss();

frisby.create('Filter products by id')
  .get('http://localhost:3000/api/products/DRESS0002')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON( '0', { sku : 'DRESS0002' })
.toss();

frisby.create('Filter products with size and color')
  .get('http://localhost:3000/api/products?size=large&color=blue')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON('0', { sku : 'DRESS0001' } )
  .toss();

frisby.create('Delete product 1')
  .delete('http://localhost:3000/api/products/DRESS0001',
  {json:true})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
.toss();

frisby.create('Delete product 2')
  .delete('http://localhost:3000/api/products/DRESS0002',
  {json:true})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
.toss();
