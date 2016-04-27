var frisby = require('frisby');

frisby.create('Create category 1')
  .post('http://localhost:3000/api/categories',
  { name : 'Clothes', parent : '' },
  {json:true})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON( { ops : [ { name : 'Clothes' } ] })
.toss();

frisby.create('Create duplicate')
  .post('http://localhost:3000/api/categories',
  { name : 'Clothes', parent : '' },
  {json:true})
  .expectStatus(500)
.toss();

frisby.create('Create category 2')
  .post('http://localhost:3000/api/categories',
  { name : 'Shirts', parent : 'Clothes' },
  {json:true})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON( { ops : [ { name : 'Shirts', parent : ',Clothes' } ] })
.toss();

frisby.create('Retrieve all categories')
  .get('http://localhost:3000/api/categories')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON( '?', { name : 'Clothes' })
  .expectJSON( '?', { name : 'Shirts' })
.toss();

frisby.create('Update category 2')
  .put('http://localhost:3000/api/categories/Shirts',
  { name : 'Cool Shirts' },
  {json:true})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
//  .expectJSON( { ops : [ { sku : 'DRESS0002' } ] })
.toss();

frisby.create('Create category 3')
  .post('http://localhost:3000/api/categories',
  { name : 'Expensive Shirts', parent : 'Cool Shirts' },
  {json:true})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON( { ops : [ { name : 'Expensive Shirts', parent : ',Clothes,Cool Shirts' } ] })
.toss();

frisby.create('Filter category by id')
  .get('http://localhost:3000/api/categories/Clothes')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON( '0', { name : 'Clothes' })
.toss();
/*
frisby.create('Delete category 1')
  .delete('http://localhost:3000/api/categories/Clothes',
  {json:true})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
.toss();

frisby.create('Delete category 2')
  .delete('http://localhost:3000/api/categories/Cool Shirts',
  {json:true})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
.toss();
*/