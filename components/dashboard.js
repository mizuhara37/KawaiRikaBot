const logger = require('../util/logger.js');
const config = require('../config.json');
const LocalStorage = require('node-localstorage').LocalStorage;
var txt,uplen=0;
var up = new Array;
var maker = new Array;
let t;
const syssto = new LocalStorage("./appdata");
class DashBoard
{
    constructor (client) {
       this.client = client;
    }

    activate () {
       logger.info('仪表盘组件加载成功！');
    }
    async onGroupMessage (session)
    {
        if(session.group_id=='yourtestgroup')
        {
            var say=session.raw_message.trim().split(/\s+/);
            if(session.raw_message=="gura dashboard=>member record")
            {
                  const member_storage = new LocalStorage("./usrdata/member");
                  let list= member_storage.getItem("list");
                  list = JSON.parse(list);
                  var 已记录数=list.number+1;
                  var sentence="目前已检测并记录的用户有"+已记录数+"人，\n已记录的有:";
                  var i;
                  for(i=0;i<list.number;i++)
                      sentence=sentence+list.username[i]+',\n';
                  sentence=sentence+list.username[list.number];
                  session.reply(sentence);
                     
            }
            else
            if(session.raw_message=="gura dashboard=>component")
            {
                  var s=config.code;
                  var len=s.length;
                  var i;
                  var sentence="目前启动的组件:"
                  for(i=0;i<len-1;i++) 
                    sentence=sentence+s[i]+' , ';
                  sentence=sentence+s[len-1];
                  session.reply(sentence);       
            }
            else
            if(session.raw_message=="冻结模式")
            {
                 const { segment } = require("icqq")
                    const me = [
                        segment.share("example.com","已开启冻结模式"),
                    ]
                    session.reply(me);
                syssto.setItem("ban",1);
            }
            else
            if(session.raw_message=="关闭冻结模式")
            {
                 const { segment } = require("icqq")
                    const me = [
                        segment.share("example.com","已关闭冻结模式"),
                    ]
                    session.reply(me);
                syssto.setItem("ban",0);
            }
            else if(say[0]=="商店页面")
            {
                let img=t.find(v=>v.type=='image');
                if(img!=null)
                {
                    syssto.setItem("store",img.url)
                }
                else session.reply("上条消息不含图片");
            }
            else if(say[0]=="更新")
            {
                if(say[1]=="标题") txt=say[2];
                if(say[1]=="添加"){
                    uplen=uplen+1;
                    up[uplen]=say[2];
                    // console.log(uplen+" "+up[uplen]);
                }
                if(say[1]=="修改"){
                    
                    up[say[2]]=say[3];
                }
                if(say[1]=="清空"){
                    
                    up = [];
                    uplen=0;
                }
                
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
                
                context.fillStyle = 'grey'
                context.textAlign = 'left'
                context.font = 'bold 45pt Microsoft Yahei'
                if(txt==null) txt="更新"
                context.fillText(txt,125,150)
                
                context.font = 'bold 15pt Microsoft Yahei'
                context.fillText('发布者：'+session.nickname,125,80)
                context.font = 'bold 25pt Microsoft Yahei'
                var sentence="1."+up[1];
                var i;
                for(i=2;i<=uplen;i++)
                  sentence=sentence+"\n"+i+"."+up[i];

                context.fillText(sentence,125,220)
                
                const buffer = canvas.toBuffer('image/png')
                  fs.writeFileSync('./usrdata/temp/update.png', buffer)
                
                  const { segment } = require("icqq")
                  const me = [
                      segment.image("./usrdata/temp/update.png"),
                  ]
                  session.reply(me);
                  if(say[1]=="发布"){
                    
                    this.client.sendGroupMsg(yourgroup,me);
                }
            }
            if(say[0]=="添加tip")
            {
                 
                 let list = syssto.getItem('tip');
                 if (!list) syssto.setItem('tip', '{}');
                 list = JSON.parse(list);
                 console.log(say[1])
                 list.sentence[list.sentence.length]=say[1];
                 
                 session.reply("添加成功！");
                 syssto.setItem("tip",JSON.stringify(list));
                //  this.client.sendGroupMsg(yourtestgroup,username+"上传了一言，请审核");
            }
            t=session.message;
        }
     
      
    }
}
module.exports = DashBoard;