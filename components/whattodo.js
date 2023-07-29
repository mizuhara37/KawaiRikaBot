const logger = require('../util/logger.js');
const config = require('../config.json');
const LocalStorage = require('node-localstorage').LocalStorage;
const syssto = new LocalStorage("./appdata");
class whattodo
{
    constructor (client) {
       this.client = client;
    }

    activate () {
       logger.info('干啥好呢组件加载成功！');
    }
    async onGroupMessage (session)
    {
      var say=session.raw_message.trim().split(/\s+/);
         if(session.raw_message=="能做啥")
         {
            //have a rest
            let list= syssto.getItem("function");
            list = JSON.parse(list);
            // console.log(list.name.length);
            var x = 0,y = list.name.length-1;
                 var r=Math.round(Math.random()*(y-x)+x);
const width = 1940
const height = 880
const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(width, height)
const context = canvas.getContext('2d')
var linearGradient= context.createLinearGradient(0,0,width,height);
linearGradient.addColorStop(0,"#A8BFFF")
linearGradient.addColorStop(1,"#884D80")
//background-image:linear-gradient(-225deg,#A8BFFF 0%, #884D80 100%)
context.fillStyle=linearGradient;
context.fillRect(0,0,width,height)


//background-image:linear-gradient(60deg,#29323c 0%, #485563 100%)
context.fillStyle = 'white'
context.textAlign = 'left'
context.font = 'bold 165pt Microsoft Yahei'
context.fillText(list.name[r],125,450)

context.fillStyle = 'white'
context.textAlign = 'left'
context.font = 'bold 35pt Microsoft Yahei'
context.fillText('说明:\n'+list.explain[r],725,100)

const buffer = canvas.toBuffer('image/png')
fs.writeFileSync('./usrdata/temp/whattodo.png', buffer)
const { segment } = require("icqq")
                const me = [
                  segment.image("./usrdata/temp/whattodo.png"),
              ]
              session.reply(me);
         }
         else if(say[0]=="修改能做啥")
         {
            let list= syssto.getItem("function");
            list = JSON.parse(list);
            var len = list.name.length;
            list.name[len]=say[1];
            var i=0;
            var sentence="";
            for(i=5+say[1].length+1+1;i<session.raw_message.length;i++)
                sentence=sentence+session.raw_message[i];
            console.log(sentence);
            list.explain[len]=sentence;
            while(sentence.indexOf("\\n">=0))
            syssto.setItem("function",JSON.stringify(list));
            r=len;
            const width = 1940
const height = 880
const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(width, height)
const context = canvas.getContext('2d')
var linearGradient= context.createLinearGradient(0,0,width,height);
linearGradient.addColorStop(0,"#A8BFFF")
linearGradient.addColorStop(1,"#884D80")
//background-image:linear-gradient(-225deg,#A8BFFF 0%, #884D80 100%)
context.fillStyle=linearGradient;
context.fillRect(0,0,width,height)


//background-image:linear-gradient(60deg,#29323c 0%, #485563 100%)
context.fillStyle = 'white'
context.textAlign = 'left'
context.font = 'bold 165pt Microsoft Yahei'
context.fillText(list.name[r],125,450)

context.fillStyle = 'white'
context.textAlign = 'left'
context.font = 'bold 35pt Microsoft Yahei'
context.fillText('说明:\n'+sentence,725,100)

const buffer = canvas.toBuffer('image/png')
fs.writeFileSync('./usrdata/temp/whattodo.png', buffer)
const { segment } = require("icqq")
                const me = [
                  segment.image("./usrdata/temp/whattodo.png"),
              ]
              session.reply(me);
         }
    }
}
module.exports = whattodo;