'use strict';

// const Controller = require('egg').Controller;

const Controller = require('../core/base_controller');
const fs = require('fs');
const pump = require('pump');


class UserController extends Controller {
  async index() {
    // 根据id查询用户信息 ${ctx.params.id}
    var id =this.ctx.params.id
    let data = await this.ctx.service.user.getUserById(id);
    this.ctx.body = data;
    // this.success(data);
  }
  async info() {
     const { ctx ,app} = this;
     ctx.body ={
      code:20000,
      data:ctx.state.user
     }
  }
  //所有用户
  async getUserInfo(){
    const {ctx} =this
    let data=await ctx.service.user.getUserList()
    // this.success(data)
    // this.success(data);
     this.ctx.body =data
  }
  // //登陆
  // async login() {
  //   console.log(this.ctx.request.body)
  //   const { username, password } = this.ctx.request.body;
  //   let data=await this.ctx.service.user.login(username,password)
  //    this.ctx.body =data
  //   // this.success(data);
  // }

   //登陆
  async login() {
    const { ctx, app } = this;
    const { username, password } = this.ctx.request.body;
    let data=await this.ctx.service.user.login(username,password)
    if(data.code==20000){
      const token = app.jwt.sign({ 
        username: data.data.username,
        id:data.data.id,
        avatar:data.data.avatar
       }, app.config.jwt.secret);
        ctx.body ={
          code:20000,
          msg:"登陆成功",
          token
        }
    }
    else {
       ctx.body = data;
    }
  }
  async logout(){
    const { ctx, app } = this;
     ctx.state.user=''
      ctx.body ={
          code:20000,
          msg:"退出成功"
        }
  }
  //注册
   async register(){
     let data=await this.ctx.service.user.register(this.ctx.request.body)
     // this.success(data);
     this.ctx.body =data
   }
  //更新
  async updateUser(){
     let data=await this.ctx.service.user.updateUser(this.ctx.request.body)
     // this.success(data);
     this.ctx.body =data
  }
  //删除
  async deteleUser(){
     let data =await this.ctx.service.user.deteleUserId(this.ctx.params.id)
     // this.success(data) 
     this.ctx.body =data
  }
  // 保存头像/封面
async saveAvatar() {
  const { ctx } = this;
  const parts = ctx.multipart({ autoFields: true });
  let files = {};
  let stream;
  while ((stream = await parts()) != null) {
    if(!stream.filename){
      break;
    }
    const fieldname = stream.fieldname; // file表单的名字
    // 上传图片的目录
    const dir = await this.service.tools.getUploadFile(stream.filename);
    const target = dir.uploadDir;
    const writeStream = fs.createWriteStream(target);
 
    await pump(stream, writeStream);
 
    files = Object.assign(files, {
      [fieldname]: dir.saveDir
    });
  }
 
  if(Object.keys(files).length > 0){
    ctx.body = {
      code: 200,
      message: '图片上传成功',
      data: files
    }
  }else{
    ctx.body = {
      code: 500,
      message: '图片上传失败',
      data: {}
    }
  }
}
}
module.exports = UserController;