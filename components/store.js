const logger = require('../util/logger.js');
const config = require('../config.json');
const LocalStorage = require('node-localstorage').LocalStorage;
const banks = new LocalStorage("./usrdata/bank");
const music = new LocalStorage("./usrdata/music");
const syssto = new LocalStorage("./appdata");
class store
{
    constructor (client) {
       this.client = client;
    }

    activate () {
       logger.info('Store组件加载成功！');
    }
    async onGroupMessage (session)
    {
      var say=session.raw_message.trim().split(/\s+/);

         if(session.raw_message=="商店")
         {
//             let list= banks.getItem("list");
//               list = JSON.parse(list);
// const width = 1920
// const height = 1280
// const fs = require('fs')
// const { createCanvas, loadImage } = require('canvas')
// const canvas = createCanvas(width, height)
// const context = canvas.getContext('2d')
// var linearGradient= context.createLinearGradient(0,0,width,height);
// linearGradient.addColorStop(0,"#BCC5CE")
// linearGradient.addColorStop(1,"#929EAD")
// //background-image:linear-gradient(-180deg,#BCC5CE 0%, #929EAD 98%)
// context.fillStyle=linearGradient;
// context.fillRect(0,0,width,height)


// //background-image:linear-gradient(60deg,#29323c 0%, #485563 100%)
// context.fillStyle = '#29323c'
// context.textAlign = 'left'
// context.font = 'bold 65pt Microsoft Yahei'
// context.fillText('商店',125,150)

// context.fillStyle = '#29323c'
// context.textAlign = 'left'
// context.font = 'bold 30pt Microsoft Yahei'
// context.fillText('你所剩余额：'+list[session.user_id]+'CR',425,150)

// context.fillStyle = '#29323c'
// context.textAlign = 'left'
// context.font = 'bold 30pt Microsoft Yahei'
// context.fillText('如何购买？假如我要买商店序号为1的《花脸》，则发送“购买 1”',425,100)

// context.fillStyle = '#29323c'
// context.textAlign = 'left'
// context.font = 'bold 30pt Microsoft Yahei'
// context.fillText('音乐盒：（在签到时有相应音效,多数来自CSGO音乐盒）',125,250)
// context.fillText('1.花脸-完美世界 1000CR\n2.终极-Denzel Curry 1000CR\n3.有为青年-Blitz Kids 1000CR  (RTC超级推荐的音乐盒)\n4.迈阿密热线-Hotline Miami 1000CR\n5.海绵手指 1000CR\n6.相信自己 200CR\n7.植物大战僵尸-Popcap 1500CR\n8.欢乐斗地主-Tencent 2000CR\n9.IMPACT-USAO/光吉猛修 1145CR\n10.怪物-YOASOBI 1100CR\n11.猪猪侠 666CR\n12.Cyaegha-USAO 1168CR\n13.群青-YOASOBI 1100CR\n\n备注：已购买的音乐盒无需反复购买，比如我已经拥有了商店序号为1的《花脸》，\n要切换为《花脸》时，发送“切换 1”即可\n欢迎大家提出意见制作新的音乐盒',125,330)


// const buffer = canvas.toBuffer('image/png')
// fs.writeFileSync('./usrdata/temp/store.png', buffer)
const { segment } = require("icqq")
                const me = [
                  segment.image(syssto.getItem("store")),
              ]
              session.reply(me);
//               if(syssto.getItem("ban")==1)
//               {
//                const pic = [
//                   segment.share("http://47.113.194.233:24/store.png","商店页面","http://47.113.194.233:24/store.png","[BOT消息]"),
//               ]
            
              }
         else if(say[0]=="购买")
         {
            var spend;
            var obj=parseInt(say[1]);
            if(obj==1 || obj==2 || obj==3 || obj==4 || obj==5) spend=1000;
            else if(obj==6) spend=200;
            else if(obj==7) spend=1500;
            else if(obj==8) spend=2000;
            else if(obj==9) spend=1145;
            else if(obj==10) spend=1100;
            else if(obj==11) spend=666;
            else if(obj==12) spend=1368;
            else if(obj==13) spend=1100;
            let bank= banks.getItem("list");
            bank = JSON.parse(bank);
            const { segment } = require("icqq")
            var money=bank[session.user_id];
            if(money<spend)
            {
               if(syssto.getItem("ban")==1)
              {
               const pic = [
                  segment.share("example.com","余额不足","https://ts1.cn.mm.bing.net/th/id/R-C.89a7ec3af43baa146bc01b4833b2f24d?rik=uo2QU1tS%2f5REjw&riu=http%3a%2f%2fimg95.699pic.com%2felement%2f40096%2f0106.png_860.png&ehk=GETacJ9Myu1wwqyBBAVIOZhvdcziH1ksW0ECzqGz9gI%3d&risl=&pid=ImgRaw&r=0","[BOT消息]"),
              ]
              session.reply(pic);
              }
              else
               session.reply("余额不足...");
            }
            else
            {
                  money=money-spend;
                  if(syssto.getItem("ban")==1)
              {
               const pic = [
                  segment.share("example.com","购买成功,谢谢支持\n目前所剩有"+money+"CR","https://ts1.cn.mm.bing.net/th/id/R-C.89a7ec3af43baa146bc01b4833b2f24d?rik=uo2QU1tS%2f5REjw&riu=http%3a%2f%2fimg95.699pic.com%2felement%2f40096%2f0106.png_860.png&ehk=GETacJ9Myu1wwqyBBAVIOZhvdcziH1ksW0ECzqGz9gI%3d&risl=&pid=ImgRaw&r=0","[BOT消息]"),
              ]
              }
              else
               session.reply("购买成功,谢谢支持\n目前所剩有"+money+"CR");
                  let bank= banks.getItem("list");
                  bank = JSON.parse(bank);
                  bank[session.user_id]=bank[session.user_id]-spend;
                  banks.setItem('list', JSON.stringify(bank));
                  let set=music.getItem(obj.toString());
                  set = JSON.parse(set);
                  set[session.user_id]=1;
                  music.setItem(obj.toString(),JSON.stringify(set));
                  let use=music.getItem("using");
                  use = JSON.parse(use);
                  use[session.user_id]=obj;
                  music.setItem("using",JSON.stringify(use));
            }
         }
         else if(say[0]=="切换")
         {
            var obj=parseInt(say[1]);
            let set=music.getItem(say[1]);
            set = JSON.parse(set);
            if(set[session.user_id]==1)
            {
               session.reply("切换成功!");
               let use=music.getItem("using");
               use = JSON.parse(use);
               use[session.user_id]=obj;
               music.setItem("using",JSON.stringify(use));
            }
            else session.reply("你没有该音乐盒");
            
         }
    }
}
module.exports = store;