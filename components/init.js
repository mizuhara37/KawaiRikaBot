const logger = require('../util/logger.js');
const config = require('../config.json');
const LocalStorage = require('node-localstorage').LocalStorage;
const member_storage = new LocalStorage("./usrdata/member");
const syssto = new LocalStorage("./appdata");
const dayjs = require('dayjs');

class Init
{
    constructor (client) {
       this.client = client;
    }

    
attempt (id,named) {
    let list = member_storage.getItem('username');
    if (!list) member_storage.setItem('username', '{}');
    list = JSON.parse(list);
    const attempt = list[id];
    
    if (!attempt) {
        list[id] = named;
        member_storage.setItem('username', JSON.stringify(list));
        return named;
    }
    list[id] = named;
    member_storage.setItem('username', JSON.stringify(list));
    return named;
}
    activate () {
       logger.info('初始化组件加载成功！');
       var ver=dayjs().year().toString()+dayjs().month().toString()+dayjs().date().toString()+dayjs().hour().toString()+dayjs().minute().toString()+dayjs().second().toString();
       
       this.client.sendGroupMsg(748571332,"Rika启动！！！")
       syssto.setItem("ver",ver);
    }
    async onGroupMessage (session)
    {
        if(session.group_id==661222218 || session.group_id === 748571332)
        {
               //查询有了吗
               // console.log(session.nickname);
               let check= member_storage.getItem("check");
               check = JSON.parse(check);
               if(check[session.user_id]!=1)
               {
                   logger.info("检测到未记录用户");
                   check[session.user_id]=1;
                   member_storage.setItem('check', JSON.stringify(check));
                   let list= member_storage.getItem("list");
                   list = JSON.parse(list);
                   list.number=list.number+1;
                   list.qid[list.number]=session.user_id;
                   list.username[list.number]=session.nickname;
                   member_storage.setItem('list', JSON.stringify(list));
               }
               this.attempt(session.user_id,session.nickname)
               let list= member_storage.getItem("list");
               list = JSON.parse(list);
            //    console.log(list);

               for(var item in list)
               {
                    if(list.username[item]=="Mizuhara37") console.log(item.qid[item])
               }
                           //记录发言的群成员，并将QQ号和用户名对应
               //{"qid":"123"}


        }
    }
    async onPrivateMessage (session)
   {
    let check= member_storage.getItem("check");
               check = JSON.parse(check);
               if(check[session.user_id]!=1)
               {
                   logger.info("检测到未记录用户");
                   check[session.user_id]=1;
                   member_storage.setItem('check', JSON.stringify(check));
                   let list= member_storage.getItem("list");
                   list = JSON.parse(list);
                   list.number=list.number+1;
                   list.qid[list.number]=session.user_id;
                   list.username[list.number]=session.nickname;
                   member_storage.setItem('list', JSON.stringify(list));
               }
               this.attempt(session.user_id,session.nickname)
               let list= member_storage.getItem("list");
               list = JSON.parse(list);

               check= member_storage.getItem("check");
               check = JSON.parse(check);
               if(check[session.from_id]!=1)
               {
                   logger.info("检测到未记录用户");
                   check[session.user_id]=1;
                   member_storage.setItem('check', JSON.stringify(check));
                   let list= member_storage.getItem("list");
                   list = JSON.parse(list);
                   list.number=list.number+1;
                   list.qid[list.number]=session.user_id;
                   list.username[list.number]=session.nickname;
                   member_storage.setItem('list', JSON.stringify(list));
               }
               this.attempt(session.user_id,session.nickname)
                list= member_storage.getItem("list");
               list = JSON.parse(list);
   }
                
   

}
module.exports = Init;