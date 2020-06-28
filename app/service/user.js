'use strict';

const sd = require('silly-datetime');
const Service = require('egg').Service;
const crypto = require("crypto")//密码加密

   // var date = new Date()
   // var  dateTime= date.toLocaleString();
   var dateTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

class UserService extends Service {
  // 根据id查询用户信息
  async getUserById(id) {
    var result = await this.app.mysql.get('user', {id: id});    //get 查询一条数据   let result = await this.app.mysql.select("user",{where:{id:1}})
     return {
      code:20000,
      msg:"查询成功",
      data:result
     }
  }
  //查询所有用户
  async getUserList(){
   var result = await this.app.mysql.select("user")
    return {
       code:20000,
       msg:"查询成功",
       data:result
    }
  }
  // 登陆
   async login(username,password) {
   var user =await this.app.mysql.get('user', {username : username});
   // console.log(JSON.stringify(this.ctx.request.body))
   if(!user){
      return {
              code:201,
              msg:"用户名不存在",
              data:null
            }
   }else {
     var secret = 'tang12115454'; //密钥--可以随便写
     var ss = user.password; //这是user加密后的结果 赋值给变量
     var decipher = crypto.createDecipher('aes192', secret);
     var dec = decipher.update(ss, 'hex', 'utf8'); //编码方式从hex转为utf-8;
     dec += decipher.final('utf8'); //编码方式从utf-8
     if(password!=dec){
          return {
              code:201,
              msg:"密码不正确",
              data:null
            }
     }else {
       await this.ctx.service.user.loginTime(user.id)
       return {
              code:20000,
              msg:"登陆成功",
              data:user
            }
     }
   }
  }
  //设置登陆时间
  async loginTime(userId){
    let ip=this.ctx.request.ip 
    console.log(dateTime)
    let res = await this.app.mysql.query('update user set login_time = ? ,login_ip= ? where id = ?',[dateTime,ip,userId]);
  }
  //注册
  async register(data) {
    const userQ  = await this.app.mysql.get('user',{username:data.username}); 
     if (userQ){
            return {
              code:201,
              msg:"用户名已存在",
              data:null
            }
        }else {
        var str = JSON.stringify(data.password); //明文
        var secret = 'tang12115454'; //密钥--可以随便写
        var cipher = crypto.createCipher('aes192', secret);
        var enc = cipher.update(str, 'utf8', 'hex'); //编码方式从utf-8转为hex;
        enc += cipher.final('hex'); //编码方式从转为hex;
        data.password=enc
        data.created_time=dateTime
        const result =await this.app.mysql.insert('user', data);
        // 判断插入成功
        const insertSuccess = result.affectedRows === 1;
        if (insertSuccess) {
            return {
              code:20000,
              msg:"注册成功",
              data:null
            }
        }
      }
  }
  //修改
  async updateUser(data){
  	const userQ  = await this.app.mysql.get('user',{id:data.id});
     if (userQ){
        var str = JSON.stringify(data.password); //明文
        var secret = 'tang12115454'; //密钥--可以随便写
        var cipher = crypto.createCipher('aes192', secret);
        var enc = cipher.update(str, 'utf8', 'hex'); //编码方式从utf-8转为hex;
        enc += cipher.final('hex'); //编码方式从转为hex;
        data.password=enc
        // data.updated_time=dateTime
          const result =await this.app.mysql.update('user', data);  // await this.app.mysql.query('update user set username = ? where id = ?',["王五",2]);
            // 判断插入成功
            const insertSuccess = result.affectedRows === 1;
            if (insertSuccess) {
                return {
                    code:20000,
                    msg:"修改成功",
                    data:null
                  }
            }
           
        }else {
            return {
              code:201,
              msg:"注册失败",
              data:null
            }
        }
  }
   //删除
   async deteleUserId(id){
       let result= await this.app.mysql.delete('user',{ id });
       console.log(result)
        const insertSuccess = result.affectedRows === 1;
        if (insertSuccess) {
            return {
              code:20000,
              msg:"删除成功",
              data:null
            }
        }else {
          return {
              code:201,
              msg:"删除失败",
              data:null
            }
        }
   }
}
module.exports = UserService;