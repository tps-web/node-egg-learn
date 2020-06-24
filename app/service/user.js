'use strict';

const Service = require('egg').Service;
const crypto = require("crypto")//密码加密

   var date = new Date()
   var dateTime = date.toLocaleString();

class UserService extends Service {
  // 根据id查询用户信息
  async getUserById(id) {
    return await this.app.mysql.get('user', {id: id});    //get 查询一条数据   let result = await this.app.mysql.select("user",{where:{id:1}})
  }
  //查询所有用户
  async getUserList(){
   let result = await this.app.mysql.select("user")
    return result
  }
  // 登陆
   async login(username,password) {
   const user =await this.app.mysql.get('user', {username : username});
     if (!user || user.password != password){
            return 201
        } else {
            return user;
        }
  }
  //注册
  async register(data) {
    const userQ  = await this.app.mysql.get('user',{username:data.username}); 
     if (userQ){
            return 201
        }else {
        var str = JSON.stringify('data.password'); //明文
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
            return "注册成功"
        }
      }
  }
  //修改
  async updateUser(data){
  	const userQ  = await this.app.mysql.get('user',{id:data.id});
     if (userQ){
        var str = JSON.stringify('data.password'); //明文
        var secret = 'tang12115454'; //密钥--可以随便写
        var cipher = crypto.createCipher('aes192', secret);
        var enc = cipher.update(str, 'utf8', 'hex'); //编码方式从utf-8转为hex;
        enc += cipher.final('hex'); //编码方式从转为hex;
        data.password=enc
        data.updated_time=dateTime
          const result =await this.app.mysql.update('user', data);  // await this.app.mysql.query('update user set username = ? where id = ?',["王五",2]);
            // 判断插入成功
            const insertSuccess = result.affectedRows === 1;
            if (insertSuccess) {
                return "修改成功"
            }
           
        }else {
            return 201
        }
  }
   //删除
   async deteleUserId(id){
       let result= await this.app.mysql.delete('user',{ id });
       console.log(result)
        const insertSuccess = result.affectedRows === 1;
        if (insertSuccess) {
            return "删除成功"
        }else {
          return 201
        }
   }
}
module.exports = UserService;