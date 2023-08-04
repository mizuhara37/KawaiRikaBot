const logger = require('../util/logger.js');
const config = require('../config.json');
const LocalStorage = require('node-localstorage').LocalStorage;
const update = new LocalStorage("./appdata/update");
const dayjs = require('dayjs');
class Update
{
    constructor (client) {
       this.client = client;
    }

    activate () {
       logger.info('Update组件加载成功！');
    }
    async onGroupMessage (session)
    {
         var say=session.raw_message.trim().split(/\s+/);
         if(session.raw_message=="更新计划") 
         {
            const fs = require('fs')
            const { createCanvas, loadImage } = require('canvas')
                          
            const width = 1920
            const height = 1080
                          
            const canvas = createCanvas(width, height)
            const context = canvas.getContext('2d')
            context.fillStyle="white";
            context.fillRect(0,0,width,height)
            context.fillStyle = 'black'
            context.textAlign = 'left'
            context.font = 'bold 175pt Verdana'
            context.rotate(90 * Math.PI / 180);
            context.fillText("UPDATE",0,-10)
            context.font = 'bold 23pt Verdana'
            context.fillText("The UI inspiration comes from\nPersona 3 Reload Official Website",20,-250)
            context.rotate(90 * Math.PI / 180);
            context.rotate(90 * Math.PI / 180);
            context.rotate(90 * Math.PI / 180);
            loadImage("appdata/image/update_background.png").then(image => {
            
            context.drawImage(image,0,0,1920,1080)
            context.fillStyle="white";
            context.font = 'bold 35pt Microsoft Yahei'

            let q = update.getItem("approve");
            q = JSON.parse(q);
            var newlen = q.name.length;
            
            var sentence="";
            for(var i=0;i<newlen;i++)
            {
               sentence=sentence+i+"."+q.content[i]+"   ["+q.status[i]+"]\n"
            }
            context.fillText(sentence,900,150)
            
            
            const buffer = canvas.toBuffer('image/png')
            fs.writeFileSync('./usrdata/temp/board.png', buffer)
            const { segment } = require("icqq")
                  const me = [
                      segment.image("./usrdata/temp/board.png"),
                  ]
                  session.reply(me);
            })
         }
         else if(say[0]=="更新意见")
         {
            var i=0;
            var sentence="";
            for(i=5;i<session.raw_message.length;i++)
                sentence=sentence+session.raw_message[i];
            let list= update.getItem("wait_to_approve");
            list = JSON.parse(list);
            // console.log(list)
            var len = list.name.length;
            list.content[len]=sentence;
            list.name[len]=session.nickname;
            update.setItem("wait_to_approve",JSON.stringify(list));
            const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')
              
const width = 1620
const height = 780
              
const canvas = createCanvas(width, height)
const context = canvas.getContext('2d')
context.fillStyle="#5ba4d7";
context.fillRect(0,0,width,height)
context.fillStyle = 'black'
context.textAlign = 'left'
context.font = '135pt Microsoft Yahei'
context.fillText("谢谢",150,350)
context.font = '63pt Microsoft Yahei'
context.fillText("已将意见交给管理员审核",150,465)
context.fillStyle = 'white'
context.font = '135pt Microsoft Yahei'
context.fillText("👍",500,350)
loadImage("appdata/image/good.jpg").then(image => {
  context.drawImage(image,1100,140,480,495)
  const buffer = canvas.toBuffer('image/png')
fs.writeFileSync('usrdata/temp/thankyou.png', buffer)
const { segment } = require("icqq")
                  const me = [
                      segment.image("usrdata/temp/thankyou.png"),
                  ]
                  session.reply(me);
                  this.client.sendGroupMsg(yourtestgroup,session.nickname+"刚刚提交了更新意见");
})
         }
         else if(session.raw_message=="催更")
         {
            this.client.sendGroupMsg(yourtestgroup,session.nickname+"发出催更请求");
            session.reply("已催更");
            
         }
    }
}
module.exports = Update;