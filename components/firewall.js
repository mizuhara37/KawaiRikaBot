const logger = require('../util/logger.js');
const config = require('../config.json');
const LocalStorage = require('node-localstorage').LocalStorage;
var count=0;
class firewall
{
    constructor (client) {
       this.client = client;
    }

    activate () {
       logger.info('防火墙组件加载成功！');
    }
    async onGroupMessage (session)
    {
         count++;
         if(count%15==0)
         {
            var x = 1,y = 14;
            var s;
            var r=Math.round(Math.random()*(y-x)+x);
            switch (r) {
               case 1 :
                   s="hhh";
                   break;  
               case 2 :
                   s="6";
                   break; 
               case 3 :
                   s="啊？";
                   break;  
               case 4 :  
                   s="我不到啊";
                   break;
               case 5 :  
                   s="机器人又双叒叕废了？";
                  break;
                case 6 :  
                   s="什么鬼？";
                  break;
                  case 7 :  
                  s="对";
                 break;
                 case 8 :  
                 s="@社恐转型ing患者";
                break;
                case 9 :  
                s="额";
               break;
               case 10 :  
               s="？";
              break;
              case 11 :  
                   s="哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈";
                  break;
               case 12 :  
                   s="怎么那么活跃？";
                  break;
                case 13 :  
                  s="有没有可能我是自动回复？";
                 break;
                 case 14 :  
                 s=` constructor (client) {
                    this.client = client;
                 }
             
                 activate () {
                    logger.info('防火墙组件加载成功！');
                 }
                 async onGroupMessage (session)
                {
                    s="我真的有没有可能是自动回复？";
                    session.reply(s);
                }
            }
        }
        module.exports = firewall;
                 `;
                break; 
           }
           session.reply(s);
         }
    }
}
module.exports = firewall;