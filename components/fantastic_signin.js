const logger = require('../util/logger.js');
const config = require('../config.json');
const LocalStorage = require('node-localstorage').LocalStorage;
const storage = new LocalStorage('./usrdata/signin');
const axios = require('axios');
const dayjs = require('dayjs');
var luck,flag=false;
const day = parseInt(dayjs().format('DD'));
const month = parseInt(dayjs().format('MM'));
const banks = new LocalStorage("./usrdata/bank");
const syssto = new LocalStorage("./appdata");
const jesus = new LocalStorage("./usrdata/jesus");
const music = new LocalStorage("./usrdata/music");
const ifile = new LocalStorage("./usrdata/image");
const user = new LocalStorage("./usrdata");
var lucky;

class signin {
    constructor (client) {
        this.client = client;
    }
    
    refresh (id) {
        const now = dayjs().format('DD/MM/YYYY');
       
        if (now !== storage.getItem('date')) 
        { 
            storage.setItem('user', '{}');
            storage.setItem('seed', Math.round(Math.random() * 100));
            storage.setItem('date', now);
            storage.setItem('first','0');
            storage.setItem('max',-100);
            storage.setItem('min',200);
            storage.setItem("maxuser","");
            storage.setItem("minuser","");
            jesus.setItem("refresh",1);
            user.setItem('speaker', '');
            user.setItem("total_speaker",0);
            user.setItem("like","");
        }
    }
    activate () {
      logger.info('签到组件加载成功！');
  }
  async onGroupMessage (session) {
    const { segment } = require("icqq")
    this.refresh(session.group_id);
    if(session.raw_message=="如何配置签到") {session.reply(`只要在机器人与你的私聊中发送图片，该图片都将作为签到中的背景图，图片比例必须为16：9，否则会被拉伸
    颜色相关可以前往“https://www.rapidtables.org/zh-CN/web/color/html-color-codes.html”，在网页中调好色后复制#后方框内的数据（比如FFFFFF）,注意不要把“#”复制入！！！
 
    更换文字主颜色请输入"文字颜色 空格 <颜色数据>"
    更换背景主颜色请输入"背景颜色 空格 <颜色数据>"
    更换签到颜色请输入"签到颜色 空格 <颜色数据>"
    颜色默认都为黑白色
     若要更改“签到”大字的x轴位置，请发送“签到x轴 空格 数字”。修改y轴位置请发送“签到y轴 空格 数字”
 
     注意：若要使用新版签到
     必须配置图片，否则将无法使用
     参数可以随时更改
     颜色，x轴等均拥有默认值（x轴默认115,y轴默认500）
 
     所有命令和参数间均有空格且均在机器人私聊中完成
    `)
    
  }
    if ((session.raw_message === '签到' || session.raw_message==='gura signin') && (session.group_id === yourtestgroup || session.group_id === yourgroup)) 
    {
      let im = ifile.getItem('url');
      if (!im) {ifile.setItem('url', '{}')};
      im = JSON.parse(im);
      if(im[session.user_id]==null)
      {
        session.reply('你未配置新版签到参数，\n发送 "如何配置签到"  获取帮助');
        this.client.sendTempMsg(session.user_id,"配置签到，请发送“如何配置签到”")
        this.client.sendPrivateMsg(session.user_id,"配置签到，请发送“如何配置签到”")
        return ;
      }

        var id=session.user_id;
        var jrrp;
        let list = storage.getItem('user');
        if (!list) {storage.setItem('user', '{}');list="{}"};
        list = JSON.parse(list);
        if(list[id]==null)
        {
            var x = 0,y = 100;
            var r=Math.round(Math.random()*(y-x)+x);
            //  console.log(list)
            list[id]=r;
            storage.setItem('user', JSON.stringify(list));
           
            let list2= banks.getItem("list");
            list2 = JSON.parse(list2);
            list2[id]=list2[id]+2*r;
            banks.setItem('list', JSON.stringify(list2));

            x=r;
            
            
        }
        else x=list[id];

        let im1 = ifile.getItem('text-color');
        if (!im1) {ifile.setItem('text-color', '{}')};
        im1 = JSON.parse(im1);
     
        let im2 = ifile.getItem('back-color');
        if (!im2) {ifile.setItem('back-color', '{}')};
        im2 = JSON.parse(im2);

        let im3 = ifile.getItem('x');
    if (!im3) {ifile.setItem('x', '{}')};
    im3 = JSON.parse(im3);

    let im4 = ifile.getItem('sign');
    if (!im4) {ifile.setItem('sign', '{}')};
    im4 = JSON.parse(im4);

    let im5 = ifile.getItem('y');
    if (!im5) {ifile.setItem('y', '{}')};
    im5 = JSON.parse(im5);

    var text;
    if(x>=0 && x<=25) text="大寄";
    else if(x>25 && x<50) text="小寄";
    else  if(x>=50 &&x<=60) text="中平";
    else if(x>60 && x<=75) text="小吉";
    else if(x>75) text="大吉";
var sentence;
    if(x>=0 && x<=25) sentence="杨帆功德\n功德杨帆";
    else if(x>25 && x<50) sentence="凶多吉少\n吉少凶多";
    else  if(x>=50 &&x<=60) sentence="起起落落\n平平淡淡";
    else if(x>60 && x<=75) sentence="功德没满\n但是满了";
    else if(x>75) sentence='功德满满\n相当可以';          
    var max=storage.getItem("max");
    var min=storage.getItem("min");
    if(x>max) {storage.setItem("max",x);storage.setItem("maxuser",session.nickname);}
    if(x<min) {storage.setItem("min",x);storage.setItem("minuser",session.nickname);}
    if(im1[session.user_id]==null)
    {
        im1[session.user_id]="000000"
    }
    if(im2[session.user_id]==null)
    {
        im2[session.user_id]="FFFFFF"
    }
    if(im3[session.user_id]==null)
    {
        im3[session.user_id]=115
    }
    if(im4[session.user_id]==null)
    {
        im4[session.user_id]="FFFFFF"
    }
    if(im5[session.user_id]==null)
    {
        im5[session.user_id]=500
    }
    let use=music.getItem("using");
            use = JSON.parse(use);
            var path="";
            if(use[session.user_id]!=null)
            {
                var text,t;
                t=text;
                if(x>=0 && x<=25) text="5";
                else if(x>25 && x<50) text="4";
                else  if(x>=50 &&x<=60) text="3";
                else if(x>60 && x<=75) text="2";
                else if(x>75) text="1";
                path="/appdata/musicbox/"+use[session.user_id]+"/"+text+".silk";
                text=t;
                // session.reply(path);
            }
        //have a rest
        var namea=session.nickname;
const width = 2100
const height = 900
const fs = require('fs')
const { createCanvas, loadImage, Canvas } = require('canvas')
const canvas = createCanvas(width, height)
const context = canvas.getContext('2d')
// var linearGradient= context.createLinearGradient(0,0,width,height);
// linearGradient.addColorStop(0,"#A8BFFF")
// linearGradient.addColorStop(1,"#884D80")
//background-image:linear-gradient(-225deg,#A8BFFF 0%, #884D80 100%)
context.fillStyle="#"+im2[session.user_id];
context.fillRect(0,0,width,height)
loadImage(im[session.user_id]).then(image => {
  context.drawImage(image,0,0,1600,900)
  //background-image:linear-gradient(60deg,#29323c 0%, #485563 100%)
context.fillStyle = '#'+im4[session.user_id]
context.textAlign = 'left'
context.font = 'bold 165pt Microsoft Yahei'
context.fillText('签到',im3[session.user_id],im5[session.user_id])

context.fillStyle = '#'+im1[session.user_id]
context.textAlign = 'left'
context.font = 'bold 25pt Microsoft Yahei'
context.rotate(90 * Math.PI / 180);
context.fillText(namea+namea+namea+namea+namea+namea+namea+namea+namea+namea+namea+namea+namea+namea+namea+namea+namea+namea+namea+namea+namea+namea+namea+namea+namea+namea+namea+namea+namea+namea+namea+namea+namea,0,-1610)

context.rotate(90 * Math.PI / 180);
context.rotate(90 * Math.PI / 180);
context.rotate(90 * Math.PI / 180);
context.fillStyle="#"+im1[session.user_id];
context.fillRect(2070,0,width,height)
//Mizuhara Style Text:#982f87  Background:#DEDEDF
image.src="appdata/image/jiujiu.png";
context.drawImage(image,1730,510,240,225)
context.fillStyle = '#'+im1[session.user_id]
context.textAlign = 'left'
context.font = 'bold 65pt Microsoft Yahei'
context.fillText('Ohayou!',1675,250)

context.font = 'bold 15pt Microsoft Yahei'
context.fillText('今天你又想老娘了吧!',1845,300)

context.textAlign = 'center'
context.font = 'bold 15pt Microsoft Yahei'
var i=0;var name1="",name2="";var temp;
temp=storage.getItem("maxuser");
if(temp.length>=12) {for(i=0;i<12;i++) name1=name1+temp[i];
name1=name1+"...";}
else name1=temp;
temp=storage.getItem("minuser");
if(temp.length>=12) {for(i=0;i<12;i++) name2=name2+temp[i];
name2=name2+"...";}
else name2=temp;
context.fillText('全场最佳:'+name1+' '+storage.getItem("max")+'\n全场最烂:'+name2+" "+storage.getItem("min"),1860,800)

context.textAlign = 'left'
context.fillRect(1955,400,70,5)

context.fillRect(1770,290,70,3)

context.font = 'bold 30pt Microsoft Yahei'
context.fillText('你今天的人品：'+x,1685,390)

// context.fillText('全场最佳：90\n每个学期都被hkk“亲切...',1685,230)
// context.fillText('全场最差：5\n每个学期都被hkk“亲切...',1685,320)

context.font = 'bold 55pt Microsoft Yahei'
context.fillText(text,1725,480)

context.font = 'bold 15pt Microsoft Yahei'
context.fillText(sentence,1880,449)

let use=music.getItem("using");
use = JSON.parse(use);
var dj;
if(use[session.user_id]!=null)
{
    var choose=use[session.user_id];
    var mname;
    if(choose==1) mname="花脸-完美世界";
    else if(choose==2) mname="终极-Denzel Curry";
    else if(choose==3) mname="有为青年-Blitz Kids";
    else if(choose==4) mname="迈阿密热线-Hotline Miami";
    else if(choose==5) mname="海绵手指";
    else if(choose==6) mname="相信自己";
    else if(choose==7) mname="植物大战僵尸";
    else if(choose==8) mname="欢乐斗地主-Tencent";
    else if(choose==9) mname="IMPACT-USAO/光吉猛修";
    else if(choose==10) mname="怪物-YOASOBI";
    else if(choose==11) mname="猪猪侠";
    else if(choose==12) mname="Cyaegha-USAO";
    else if(choose==13) mname="群青-YOASOBI";
    context.font = 'bold 12pt Microsoft Yahei'
context.textAlign = 'center'
context.fillText('正在使用的音乐盒：'+mname,1860,884)
}
else  
{
  context.font = 'bold 12pt Microsoft Yahei'
context.textAlign = 'center'
context.fillText('Sayorala',1860,884)
}



const buffer = canvas.toBuffer('image/png')
fs.writeFileSync('./usrdata/temp/signin.png', buffer)


                    const me = [
                        segment.image("./usrdata/temp/signin.png"),
                    ]
                    session.reply(me);
                    const sendmusic = [
                      segment.record(path),
                  ]
                  if(use[session.user_id]!=null) session.reply(sendmusic);
})


}
  }
  get seed () {
    return parseInt(storage.getItem('seed'));
}
async onPrivateMessage(session)
{
  var say=session.raw_message.trim().split(/\s+/);
  let img=session.message.find(v=>v.type=='image')
  // console.log(session);
  if(img!=null)
  {
    let im = ifile.getItem('url');
  if (!im) {ifile.setItem('url', '{}')};
  im = JSON.parse(im);
   im[session.user_id]=img.url;
   ifile.setItem('url', JSON.stringify(im));
   session.reply("图片获取成功");
  }
  if(say[0]=="文字颜色")
  {
    let im = ifile.getItem('text-color');
    if (!im) {ifile.setItem('text-color', '{}')};
    im = JSON.parse(im);
     im[session.user_id]=say[1];
     ifile.setItem('text-color', JSON.stringify(im));
     session.reply("设置成功");
  }
  if(say[0]=="背景颜色")
  {
    let im = ifile.getItem('back-color');
    if (!im) {ifile.setItem('back-color', '{}')};
    im = JSON.parse(im);
     im[session.user_id]=say[1];
     ifile.setItem('back-color', JSON.stringify(im));
     session.reply("设置成功");
  }
  if(say[0]=="签到x轴")
  {
    let im = ifile.getItem('x');
    if (!im) {ifile.setItem('x', '{}')};
    im = JSON.parse(im);
     im[session.user_id]=parseInt(say[1]);
     ifile.setItem('x', JSON.stringify(im));
     session.reply("设置成功");
  }
  if(say[0]=="签到y轴")
  {
    let im = ifile.getItem('y');
    if (!im) {ifile.setItem('y', '{}')};
    im = JSON.parse(im);
     im[session.user_id]=parseInt(say[1]);
     ifile.setItem('y', JSON.stringify(im));
     session.reply("设置成功");
  }
  if(say[0]=="签到颜色")
  {
    let im = ifile.getItem('sign');
    if (!im) {ifile.setItem('sign', '{}')};
    im = JSON.parse(im);
     im[session.user_id]=(say[1]);
     ifile.setItem('sign', JSON.stringify(im));
     session.reply("设置成功");
  }
}
}

module.exports = signin;