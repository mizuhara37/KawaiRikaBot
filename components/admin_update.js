const logger = require('../util/logger.js');
const config = require('../config.json');
const LocalStorage = require('node-localstorage').LocalStorage;
const update = new LocalStorage("./appdata/update");
class AdminUpdate
{
    constructor (client) {
       this.client = client;
    }

    activate () {
       logger.info('AdminUpdate组件加载成功！');
    }
    async onGroupMessage (session)
    {
         var say=session.raw_message.trim().split(/\s+/);
         if(session.raw_message=="审核意见列表") 
         {
            let list= update.getItem("wait_to_approve");
            list = JSON.parse(list);
            // console.log(list)
            var text="";
            var len = list.name.length;
            for(var i=0;i<len;i++)
            {
                  text=text+i+". "+list.content[i]+"\n     ---"+list.name[i]+"\n";
            }
            session.reply(text)
         }
         else if(say[0]=="accept")
         {
               var x=parseInt(say[1]);
               let list= update.getItem("wait_to_approve");
               list = JSON.parse(list);
               var len = list.name.length;
               if(x>=len)
               {
                  session.reply("超范围了（）")
                  return ;
               }
               let q = update.getItem("approve");
               q = JSON.parse(q);
               var newlen = q.name.length;
               q.name[newlen]=list.name[x];
               q.content[newlen]=list.content[x];
               q.status[newlen]="等待制作";
               update.setItem("approve",JSON.stringify(q));

               list.name[x]=null;
               list.content[x]=null;
               let p='{"content":[],"name":[]}';
               p = JSON.parse(p);
               var cnt=-1;
               for(var i=0;i<len;i++)
               {
                     if(list.name[i]!=null && list.content[i]!=null)
                     {
                           cnt++;
                           p.name[cnt]=list.name[i];
                           p.content[cnt]=list.content[i];
                     }
               }
               // console.log(p);
               update.setItem("wait_to_approve",JSON.stringify(p));
               session.reply("处理成功");
         }
         else if(say[0]=="refuse")
         {
               var x=parseInt(say[1]);
               let list= update.getItem("wait_to_approve");
               list = JSON.parse(list);
               var len = list.name.length;
               if(x>=len)
               {
                  session.reply("超范围了（）")
                  return ;
               }
               list.name[x]=null;
               list.content[x]=null;
               let p='{"content":[],"name":[]}';
               p = JSON.parse(p);
               var cnt=-1;
               for(var i=0;i<len;i++)
               {
                     if(list.name[i]!=null && list.content[i]!=null)
                     {
                           cnt++;
                           p.name[cnt]=list.name[i];
                           p.content[cnt]=list.content[i];
                     }
               }
               // console.log(p);
               update.setItem("wait_to_approve",JSON.stringify(p));
               session.reply("处理成功");
         }
         else if(say[0]=="status")
         {
            var x=parseInt(say[1]);
            let q = update.getItem("approve");
            q = JSON.parse(q);
            q.status[x]=say[2];
            update.setItem("approve",JSON.stringify(q));
            session.reply("处理成功");
         }
         else if(say[0]=="finish")
         {
            var x=parseInt(say[1]);
            let q = update.getItem("approve");
            q = JSON.parse(q);
            q.name[x]=null;
            q.content[x]=null;
            q.status[x]=null;
            let p='{"content":[],"name":[],"status":[]}';
            p = JSON.parse(p);
            var len = q.name.length;
            var cnt=-1;
               for(var i=0;i<len;i++)
               {
                     if(q.name[i]!=null && q.content[i]!=null && q.status[i]!=null)
                     {
                           cnt++;
                           p.name[cnt]=q.name[i];
                           p.content[cnt]=q.content[i];
                           p.status[cnt]=q.status[i];
                     }
               }
               update.setItem("approve",JSON.stringify(p));
            session.reply("辛苦了...");
            const { segment } = require("icqq")
                  const me = [
                    segment.record("/appdata/update/music.silk"),
                  ]
            session.reply(me);
         }
    }
}
module.exports = AdminUpdate;