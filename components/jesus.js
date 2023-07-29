const logger = require('../util/logger.js');
const config = require('../config.json');
const LocalStorage = require('node-localstorage').LocalStorage;
const Jesus = new LocalStorage("./usrdata/jesus");
const user = new LocalStorage("./usrdata/member");
const syssto = new LocalStorage("./appdata");
console.log(Jesus.getItem("refresh"));
class ajesus
{
    constructor (client) {
       this.client = client;
    }

    activate () {
       logger.info('Daily Jesus组件加载成功！');
    }
    async onGroupMessage (session)
    {
     
         if(Jesus.getItem("refresh")==1) 
         {
             Jesus.setItem("refresh",0);
             const { segment } = require("icqq")
                    const me = [
                        segment.video("./appdata/video/je.mp4"),
                    ]
                    session.reply(me);
             console.log("video OK");
             
             let list = user.getItem('list');
             if (!list) user.setItem('list', '{}');
             list = JSON.parse(list);
             var x = 0,y = (list.username.length)-1;
            var r=Math.round(Math.random()*(y-x)+x);
            console.log(list.username[r]);
            session.reply("今日耶稣:"+list.username[r]);
            Jesus.setItem("name",list.username[r]);
            if(syssto.getItem("ban")==1)
            {
               const { segment } = require("icqq")
             
               const me = [
                   segment.share("http://47.113.194.233:24/je.mp4","今日耶稣："+list.username[r]),
               ]
               session.reply(me);
            }
         }
    }
}
module.exports = ajesus;