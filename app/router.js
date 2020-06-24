'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/getUser/:id', controller.user.index);
  router.get('/getUser', controller.user.getUserInfo);
  router.get('/login', controller.user.login);
  router.get('/register', controller.user.register);
  router.get('/updateUser', controller.user.updateUser);
  router.get('/detele/:id', controller.user.deteleUser);

};
