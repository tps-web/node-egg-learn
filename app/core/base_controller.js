// app/core/base_controller.js
const { Controller } = require('egg');

class BaseController extends Controller {

  success(data,msg) {
    switch (data) {
      case 201:
       this.ctx.body = {code: 201,data:'操作失败'};
        break;
      default:
       this.ctx.body = {code: 200,data};
      break;
    }
  
  }
  message(code,msg,data){
    this.ctx.body={
      code,
      msg,
      data
    }
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}
module.exports = BaseController;
