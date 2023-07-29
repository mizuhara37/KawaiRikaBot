const logger = require('../util/logger.js');
const config = require('../config.json');
const LocalStorage = require('node-localstorage').LocalStorage;
const banks = new LocalStorage("./usrdata/bank");
class bank
{
    constructor (client) {
       this.client = client;
    }

    activate () {
       logger.info('银行组件加载成功！');
    }
    async onGroupMessage (session)
    {
        if((session.group_id === yourgroup || session.group_id === yourtestgroup))
        {
            var say=session.raw_message.trim().split(/\s+/);
          if(session.raw_message=="银行")
          {
              let list= banks.getItem("list");
              list = JSON.parse(list);

              let list2= banks.getItem("tohim");
              list2 = JSON.parse(list2);

              let list3= banks.getItem("tome");
              list3 = JSON.parse(list3);

          
              var id=session.user_id;
              if(list2[id]==null) list2='';
              if(list3[id]==null) list3='';
              if(list[id]==null)
              {
                  list[id]=1000; banks.setItem('list', JSON.stringify(list));
              }
              const fs = require('fs')
              const { createCanvas, loadImage } = require('canvas')
              
              const width = 920
              const height = 1280
              
              const canvas = createCanvas(width, height)
              const context = canvas.getContext('2d')
              
              
              
                  var linearGradient= context.createLinearGradient(0,0,width,height);
                  linearGradient.addColorStop(0,"#09203f")
                  linearGradient.addColorStop(1,"#537895")
                  //添加渐变颜色
                  context.fillStyle=linearGradient;
                  context.fillRect(0,0,width,height)
              //  background-image:linear-gradient(0deg,#243949 0%, #517fa4 100%)
              var linearGradient= context.createLinearGradient(0,0,width,height);
                  linearGradient.addColorStop(0,"#243949")
                  linearGradient.addColorStop(1,"#517fa4")
                  //添加渐变颜色
                  context.fillStyle=linearGradient;
                  context.fillRect(0,0,150,height)
              
                  var linearGradient= context.createLinearGradient(0,0,width,height);
                  linearGradient.addColorStop(0,"#e6b980")
                  linearGradient.addColorStop(1,"#eacda3")
                  //添加渐变颜色background-image:linear-gradient(0deg,#e6b980 0%, #eacda3 100%)
                  context.fillStyle=linearGradient;
                  context.fillRect(800,800,width,height)
              
              context.font = 'bold 30pt Microsoft Yahei'
              context.textAlign = 'center'
              context.textBaseline = 'top'
              // context.fillStyle = "whit"
              // context.rotate(20*Math.PI/180);
              
              
              context.fillStyle = 'white'
              context.font = 'bold 45pt Microsoft Yahei'
              context.fillText('🕐Gura Bank',285,50)
              
              context.fillStyle = 'white'
              context.textAlign = 'left'
              context.font = '25pt Microsoft Yahei'
              context.fillText('尊敬的用户 '+session.nickname+',\n\n\n余额积分:'+list[session.user_id]+'CR\n'+list2[id]+"\n"+list3[id],125,250)
              
              context.fillStyle = 'white'
              context.textAlign = 'center'
              context.rotate(90*Math.PI/180);
              context.font = 'bold 20pt Microsoft Yahei'
              context.fillText('🕐Gura Bank                   金手指',1035,-850)
              
              const buffer = canvas.toBuffer('image/png')
                fs.writeFileSync('./usrdata/temp/bank.png', buffer)
                const { segment } = require("icqq")
                const me = [
                  segment.image("./usrdata/temp/bank.png"),
              ]
              session.reply(me);
             
          }
          else if(say[0]=="看他银行")
          {

          }
        }
        
    }
}
module.exports = bank;