'use strict';

// const Controller = require('egg').Controller;

const Controller = require('../core/base_controller');

class UserController extends Controller {
  async index() {
    // 根据id查询用户信息 ${ctx.params.id}
    var id =this.ctx.params.id
    let data = await this.ctx.service.user.getUserById(id);
    // this.ctx.body = users;
    this.success(data);
  }
  //所有用户
  async getUserInfo(){
    const {ctx} =this
    let data=await ctx.service.user.getUserList()
    this.success(data)
  }
  //登陆
  async login() {
    const { username, password } = this.ctx.request.body;
    let data=await this.ctx.service.user.login(username,password)
    this.success(data);
  }
  //注册
   async register(){
     let data=await this.ctx.service.user.register(this.ctx.request.body)
     this.success(data);
   }
  //更新
  async updateUser(){
     let data=await this.ctx.service.user.updateUser(this.ctx.request.body)
     this.success(data);
  }
  //删除
  async deteleUser(){
     let data =await this.ctx.service.user.deteleUserId(this.ctx.params.id)
     this.success(data)    
  }
}
module.exports = UserController;