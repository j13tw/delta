var co = require('co');

function * a(){
  console.log(1);
  yield fun1;
  console.log(2);
}

function fun1(){
  console.log(123);
  return;
}

co(function *(){
  var results = yield *a();
  return results;
});
