const logger = require('../util/logger.js');
const config = require('../config.json');
const LocalStorage = require('node-localstorage').LocalStorage;
class aprilfool
{
    constructor (client) {
       this.client = client;
    }

    activate () {
       logger.info('april fool组件加载成功！');
    }
    async onGroupMessage (session)
    {
        if(session.raw_message.indexOf("你咋知道")!=-1 || session.raw_message.indexOf("你怎么知道")!=-1 ) 
        {
            var x = 1,y = 2;
            var r=Math.round(Math.random()*(y-x)+x);
            if(r==1) session.reply("谁问你了");
            else session.reply("Who asked you");
        }
    }
}
module.exports = aprilfool;