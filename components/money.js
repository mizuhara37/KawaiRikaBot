const logger = require('../util/logger.js');
const config = require('../config.json');
const LocalStorage = require('node-localstorage').LocalStorage;
const banks = new LocalStorage("./usrdata/bank");
class money
{
    constructor (client) {
       this.client = client;
    }

    activate () {
       logger.info('积分操作组件加载成功！');
    }
    async onGroupMessage (session)
    {
       if(session.group_id==748571332 || 661222218)
       {
          var say=session.raw_message.trim().split(/\s+/);
          if(say[0]=="转账")
          {
              let list= banks.getItem("list");
              list = JSON.parse(list);
              var id=session.user_id;
              var to=say[1];
              var num=Number(say[2]);
              if(list[id]-num<0) session.reply("余额不足");
              else
              {
                list[id]=list[id]-num;
                list[to]=list[to]+num;
                banks.setItem('list', JSON.stringify(list));
                session.reply("OK");

                list= banks.getItem("tohim");
                if(!list) banks.setItem("tohim","{}");
                list = JSON.parse(list);
                list[id]="最近一次转账给 "+to+" "+num+"CR";
                banks.setItem('tohim', JSON.stringify(list));

                list= banks.getItem("tome");
                if(!list) banks.setItem("tome","{}");
                list = JSON.parse(list);
                list[to]="最近一次 "+id+" 转账给你"+num+"CR";
                banks.setItem('tome', JSON.stringify(list));
              }
              
              
          }
       }
    }
}
module.exports = money;