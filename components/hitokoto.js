const logger = require('../util/logger.js');
const config = require('../config.json');
const LocalStorage = require('node-localstorage').LocalStorage;
// const LocalStorage = require('node-localstorage').LocalStorage;
const syssto = new LocalStorage("./appdata");
class Hitokoto
{
    constructor (client) {
       this.client = client;
    }

    activate () {
       logger.info('一言组件加载成功！');
    }
    async onGroupMessage (session)
    {
        if((session.group_id === yourgroup || session.group_id === yourtestgroup))
        {
            if ((session.raw_message === '一言' || session.raw_message === 'gura hitokoto'|| session.raw_message === '废话'|| session.raw_message === '道理'|| session.raw_message === '金句')) 
            {
              var x = 1,y = 2;
              var r=Math.round(Math.random()*(y-x)+x);
              if(r==1)
                {
                      var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
                      var httpRequest = new XMLHttpRequest();//第一步：建立所需的对象
                      httpRequest.open('GET', 'https://v1.hitokoto.cn/?c=a&c=b&c=i&c=k', true);//第二步：打开连接  将请求参数写在url中  ps:"http://localhost:8080/rest/xxx"
                      httpRequest.send();
                      httpRequest.onreadystatechange = function () {
                      if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                      var json = httpRequest.responseText;
                      const obj = JSON.parse(json);
                      var hitokoto=obj.hitokoto;
                      var from=obj.from;
                      var from_who=obj.from_who;
                      var x = 1,y = 3;
                      var c1,c2;
                      var r=Math.round(Math.random()*(y-x)+x);
                      if(r==1) 
                      {
                          c1="#00c6fb";
                          c2="#005bea";
                      }
                      else if(r==2)
                      {
                          c1="#a3bded";
                          c2="#6991c7";
                      }
                      else
                      {
                          c1="#c71d6f";
                          c2="#d09693";
                      }
                      if(from_who==null) from_who="";
      
                      const fs = require('fs')
                      const { createCanvas, loadImage } = require('canvas')
                      
                     
      
                      const width = 1280
                      const height = 720
                      
                      const canvas = createCanvas(width, height)
                      const context = canvas.getContext('2d') 
                      // canvas.registerFont('simhel.ttf', {family: 'simhel'});
                      var i;
                      var sentence=hitokoto[0];
                      for(i=1;i<hitokoto.length;i++)
                          if((i+1)%43==0) sentence=sentence+hitokoto[i]+'\n';
                          else sentence=sentence+hitokoto[i];
                      if(hitokoto.length>43) sentence="      "+sentence;
                      
                          var linearGradient= context.createLinearGradient(0,0,width,height);
                          linearGradient.addColorStop(0,c1)
                          linearGradient.addColorStop(1,c2)
                          //添加渐变颜色
                          context.fillStyle=linearGradient;
                          context.fillRect(0,0,width,height)
                       
                      
                      context.font = 'bold 30pt Microsoft YaHei'
                      context.textAlign = 'center'
                      context.textBaseline = 'top'
                      // context.fillStyle = "whit"
                      
                      context.fillStyle = 'white'
                      context.textAlign = "center"
                      context.textBaseline = "middle"
                      context.fillText(sentence, 640, 300)
                      
                      context.fillStyle = 'white'
                      context.font = 'bold 25pt Microsoft YaHei'
                      context.fillText(from_who+"《"+from+"》",640,600)
                      
                      loadImage('./JustBackground.png').then(image => {
                          // context.drawImage(image, 340, 515, 70, 70)
                          const buffer = canvas.toBuffer('image/png')
                           fs.writeFileSync('./usrdata/temp/hitokoto.png', buffer)
                           const { segment } = require("icqq")
                          const me = [
                              segment.image("./usrdata/temp/hitokoto.png"),
                          ]
                          session.reply(me);
                          if(syssto.getItem("ban")==1)
                    {
                       const { segment } = require("icqq")
                     
                       const me = [
                           segment.share("http://47.113.194.233:24/hitokoto.png","一言生成成功，点击查看","http://47.113.194.233:24/hitokoto.png","被冻结时的绝唱"),
                       ]
                       session.reply(me);
                    }
                          })
                  }
              };
              }
              else if(r==2)
              {
                  // if(session.raw_message=="自定义一言")
                {
      
                  let list = syssto.getItem('hitokoto');
              if (!list) syssto.setItem('hitokoto', '{}');
              list = JSON.parse(list);
              var len=list.sentence.length;
              var x = 0,y = len-1;
              var r=Math.round(Math.random()*(y-x)+x);
                  var hitokoto=list.sentence[r];
                      var from=null;
                      var from_who=list.provider[r];
                  var x = 1,y = 3;
                  var c1,c2;
                  var r=Math.round(Math.random()*(y-x)+x);
                  if(r==1) 
                  {
                      c1="#00c6fb";
                      c2="#005bea";
                  }
                  else if(r==2)
                  {
                      c1="#a3bded";
                      c2="#6991c7";
                  }
                  else
                  {
                      c1="#c71d6f";
                      c2="#d09693";
                  }
                  if(from_who==null) from_who="";
      
                  const fs = require('fs')
                  const { createCanvas, loadImage } = require('canvas')
                  
                 
      
                  const width = 1280
                  const height = 720
                  
                  const canvas = createCanvas(width, height)
                  const context = canvas.getContext('2d') 
                  // canvas.registerFont('simhel.ttf', {family: 'simhel'});
                  var i;
                  // hitokoto="1234567890123456789012345678901234567811111111111111111111190123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"
                  console.log(hitokoto.length)
                  var slen=hitokoto.length;
                  var sentence=hitokoto[0];
                  for(i=1;i<hitokoto.length;i++)
                      if((i)%35==0) sentence=sentence+hitokoto[i]+'\n';
                      else sentence=sentence+hitokoto[i];
                  // if(hitokoto.length>45) sentence="      "+sentence;
                  
                      var linearGradient= context.createLinearGradient(0,0,width,height);
                      linearGradient.addColorStop(0,c1)
                      linearGradient.addColorStop(1,c2)
                      //添加渐变颜色
                      context.fillStyle=linearGradient;
                      context.fillRect(0,0,width,height)
                   
                  
                  context.font = 'bold 25pt Microsoft YaHei'
                  context.textAlign = 'center'
                  context.textBaseline = 'top'
                  // context.fillStyle = "whit"
                  
                  context.fillStyle = 'white'
                  context.textAlign = "center"
                  context.textBaseline = "middle"
                  if(slen<=230)
                  context.fillText(sentence, 640, 300)
                  else   context.fillText(sentence, 640, 200)
                  context.fillStyle = 'white'
                  context.font = 'bold 25pt Microsoft YaHei'
                  context.fillText(from_who,640,600)
                  
                  loadImage('./JustBackground.png').then(image => {
                      // context.drawImage(image, 340, 515, 70, 70)
                      const buffer = canvas.toBuffer('image/png')
                       fs.writeFileSync('./usrdata/temp/hitokoto.png', buffer)
                       const { segment } = require("icqq")
                      const me = [
                          segment.image("./usrdata/temp/hitokoto.png"),
                      ]
                      session.reply(me);
                      if(syssto.getItem("ban")==1)
                    {
                       const { segment } = require("icqq")
                     
                       const me = [
                           segment.share("http://47.113.194.233:24/hitokoto.png","一言生成成功，点击查看","http://47.113.194.233:24/hitokoto.png","被冻结时的绝唱"),
                       ]
                       session.reply(me);
                    }
                      })
              
            
         
                }
              }
              
          }
          else if(session.raw_message=="一言详情")
          {
            const fs = require('fs')
                const { createCanvas, loadImage } = require('canvas')
                const width = 1990
                const height = 920
                
                const canvas = createCanvas(width, height)
                const context = canvas.getContext('2d')
                // background-image:linear-gradient(0deg,#d3d3d3 0%, #d3d3d3 1%, #e0e0e0 26%)
                var linearGradient= context.createLinearGradient(0,0,width,height);
                    linearGradient.addColorStop(0,"#d3d3d3")
                    linearGradient.addColorStop(0.01,"#d3d3d3")
                    linearGradient.addColorStop(0.26,"#e0e0e0")
                    //添加渐变颜色
                    context.fillStyle=linearGradient;
                    context.fillRect(0,0,width,height)
                    context.font = 'bold 45pt Microsoft YaHei'
                    context.fillStyle = 'black'
                context.fillText("一言详情",125,150)
                
                let list = syssto.getItem('hitokoto');
              if (!list) syssto.setItem('hitokoto', '{}');
              list = JSON.parse(list);
              var len=list.sentence.length;
                context.font = 'bold 25pt Microsoft YaHei'
                context.fillText("目前自定义一言已经收录了"+len+"条\n最新收录的三条一言:\n["+list.provider[len]+"]"+list.sentence[len]+"\n["+list.provider[len-1]+"]"+list.sentence[len-1]+"\n["+list.provider[len-2]+"]"+list.sentence[len-2],125,210)
                const buffer = canvas.toBuffer('image/png')
                  fs.writeFileSync('./usrdata/temp/update.png', buffer)
                
                  const { segment } = require("icqq")
                  const me = [
                      segment.image("./usrdata/temp/update.png"),
                  ]
                  session.reply(me);
          }
        }
      
    }
}
module.exports = Hitokoto;