'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller,jwt } = app;
  router.get('/', controller.home.index);
  router.get('/getUser/:id', controller.user.index);
  router.get('/getUser',jwt, controller.user.getUserInfo);
  router.post('/login', controller.user.login);
  router.post('/register', controller.user.register);
  router.post('/updateUser', controller.user.updateUser);
  router.delete('/detele/:id', controller.user.deteleUser);
  router.get('/info',jwt, controller.user.info);
  router.get('/logout',jwt, controller.user.logout);
  router.get('/saveavatar', controller.user.saveAvatar);

};
