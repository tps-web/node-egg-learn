'use strict';

const Controller = require('egg').Controller;


var crypto = require('crypto');


class HomeController extends Controller {
  async index() {
    const { ctx } = this;
   
   var date = new Date()
   var currentDate = date.toLocaleDateString();
   var dateTime = date.toLocaleString();

var str = JSON.stringify('12345sdafwesdaa'); //明文
var secret = 'tang12115454'; //密钥--可以随便写
var cipher = crypto.createCipher('aes192', secret);
var enc = cipher.update(str, 'utf8', 'hex'); //编码方式从utf-8转为hex;
enc += cipher.final('hex'); //编码方式从转为hex;

var ss = enc; //这是user加密后的结果 赋值给变量
var decipher = crypto.createDecipher('aes192', secret);
var dec = decipher.update(ss, 'hex', 'utf8'); //编码方式从hex转为utf-8;
dec += decipher.final('utf8'); //编码方式从utf-8;

    ctx.body = '加密'+enc+'解密'+dec+'时间'+currentDate+'日期和时间'+dateTime;
  }
}

module.exports = HomeController;
