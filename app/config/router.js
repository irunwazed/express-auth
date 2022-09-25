import express from 'express';
import userMiddleware from '../middleware/UserMiddleware';
import { check } from 'express-validator';

// setting export all Controller
const route = (_route) => {
  _route = _route.split("@")
  let path = '../controllers/'
  let name = _route[0].split("/").join("_")
  if(exports[name] == null){
    exports[name] = require(path+_route[0])
  }
  return exports[name].default[(_route.length==1?'index':_route[1])]
}
// . setting

const router = express.Router()

// Api
router.get("/api/tes", route('api/HomeController@index'))
router.post("/api/login", [
  check('username').isLength({ min: 2 }),
  check('password').exists(),
], route('api/LoginController@login'))
router.get("/api/cek-login", route('api/LoginController@cekLogin'))
router.use('/api', userMiddleware.checkApi);

router.get("/api/users", route('api/UsersController@getData'))
router.get("/api/users/:id", route('api/UsersController@getOneData'))
router.post("/api/users", route('api/UsersController@store'))
router.put("/api/users/:id", route('api/UsersController@update'))
router.delete("/api/users/:id", route('api/UsersController@delete'))
router.delete("/api/users", route('api/UsersController@deleteAll'))
// . Api

router.get("*", route('api/HomeController@notFound'))
router.post("*", route('api/HomeController@notFound'))
router.put("*", route('api/HomeController@notFound'))
router.delete("*", route('api/HomeController@notFound'))
router.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({statusCode: 500, message: 'Server sedang bermasalah'});
});

module.exports = router