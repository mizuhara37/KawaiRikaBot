const logger = require('../util/logger.js');
const config = require('../config.json');
const { listenerCount } = require('process');
const LocalStorage = require('node-localstorage').LocalStorage;
const member_storage = new LocalStorage("./usrdata/member");
const syssto = new LocalStorage("./appdata");




/**
 * 去除数组(对象)中空数据
 *
 * @param {Object|Array} arr
 *
 * @return {Object|Array}
 */
function filterNullValue(arr){
   var _data=(typeof arr!="object")? [arr] : arr  //确保参数总是数组
   var _dataJudge = function(val){ // 统一过滤判断
       return val === null || val == '' || val == undefined || JSON.stringify(val) === "{}";
   };
  for ( let i in _data){
       if( typeof i === 'number' || (Number(i) == i) ){
           if(_dataJudge(_data[i])){_data.splice(i, 1);}
       }else{
           if(_dataJudge(_data[i]))delete _data[i];
       }
  }
  return _data;
}


class exam
{
    constructor (client) {
       this.client = client;
    }

    activate () {
       logger.info('临时自定义一言组件加载成功！');
    }
    async onGroupMessage (session)
    {
      if(session.group_id === 661222218 || session.group_id === 748571332)
      {
         var say=session.raw_message.trim().split(/\s+/);
          if(say[0]=="自定义一言")
          {

            let list = syssto.getItem('hitokoto');
        if (!list) syssto.setItem('hitokoto', '{}');
        list = JSON.parse(list);
        var len=list.sentence.length;
        var x = 0,y = len-1;
        var r=Math.round(Math.random()*(y-x)+x);
        if(say[1]!=null){ 
        if(say[1]<len && say[1]>=0) r=say[1];
        else {var ss="请在[0-"+(len-1)+"]的范围中访问";session.reply(ss);}
      }
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
            // console.log(hitokoto.length)
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
                })
        
      
   
          }
          
          
          
         } 
         if(session.group_id==748571332)
         {var say=session.raw_message.trim().split(/\s+/);
         if(say[0]=="审核一言列表")
          {
               
               let list = syssto.getItem('temphitokoto');
               if (!list) syssto.setItem('temphitokoto', '{}');
               list = JSON.parse(list);
               var i;
               var s="";
               var len=list.sentence.length;
               for(i=0;i<len;i++)
               if(list.sentence[i]!=null)
                 s=s+"["+i+"] "+list.provider[i]+" :"+list.sentence[i]+"\n";
               session.reply(s);
          }
          else if(say[0]=="审核通过")
          {
               
               let list = syssto.getItem('temphitokoto');
               if (!list) syssto.setItem('temphitokoto', '{}');
               list = JSON.parse(list);
               var sent=list.sentence[say[1]];
               var id=list.qid[say[1]];
               var pro=list.provider[say[1]];
               delete list.qid[say[1]];
               delete list.sentence[say[1]];
               delete list.provider[say[1]];
               // filterNullValue(list)
               // console.log(list);
               var t='{"sentence":[],"provider":[],"qid":[]}';
               t = JSON.parse(t);
               var i;
               var c=-1;
               var len=list.sentence.length;
               for(i=0;i<len;i++)
               {
                  if(list.sentence[i]!=null)
                  {
                    t.sentence[c]=list.sentence[i];
                 
                  t.provider[c]=list.provider[i];

                  t.qid[c]=list.qid[i];
                  }
               }
               syssto.setItem("temphitokoto",JSON.stringify(t))

               var ad = syssto.getItem('hitokoto');
               if (!ad) syssto.setItem('hitokoto', '{}');
               ad = JSON.parse(ad);
               ad.sentence[ad.sentence.length]=sent;
               ad.provider[ad.provider.length]=pro;
               syssto.setItem("hitokoto",JSON.stringify(ad))
            //    let find= member_storage.getItem("list");
            //    find = JSON.parse(find);
            // var i;
            // var len,y,id;
            // for(i=0;i<len;i++)
            // {
            //    if(find.username[i]==pro){y=i;id=find.qid[i];};
               
            // }
            // console.log(y+" "+id);
            // this.client.sendTempMsg(661222218,3103819396,"hhh");
            this.client.sendTempMsg(661222218,id,"恭喜你，"+session.nickname+"通过了您的一言:"+'"'+sent+'"');
               session.reply("添加成功！该一言编号:"+(ad.sentence.length-1));
          }
          else if(say[0]=="审核不通过")
          {
            let list = syssto.getItem('temphitokoto');
            if (!list) syssto.setItem('temphitokoto', '{}');
            list = JSON.parse(list);
            var sent=list.sentence[say[1]];
            var pro=list.provider[say[1]];
            var id=list.qid[say[1]];
            delete list.sentence[say[1]];
            delete list.provider[say[1]];
            delete list.qid[say[1]];
            // filterNullValue(list)
            // console.log(list);
            var t='{"sentence":[],"provider":[],"qid":[]}';
            t = JSON.parse(t);
            var i;
            var c=-1;
            var len=list.sentence.length;
            for(i=0;i<len;i++)
            {
               if(list.sentence[i]!=null)
               {
                  c=c+1;
                   
                  t.sentence[c]=list.sentence[i];
                 
                  t.provider[c]=list.provider[i];

                  t.qid[c]=list.qid[i];
               }
            }
            syssto.setItem("temphitokoto",JSON.stringify(t))
            // // sendPrivateMsg
           
            // console.log(y+" "+id);
            // this.client.sendTempMsg(661222218,3103819396,"hhh");
            this.client.sendTempMsg(661222218,id,"抱歉，"+session.nickname+"没有通过您的一言:"+'"'+sent+'"');
            session.reply("Success！");
          }
          else if(say[0]=="一言详情")
          {
            
          }
    }
   }
   async onPrivateMessage (session)
   {
      let find= member_storage.getItem("list");
      find = JSON.parse(find);
   var i;
   var len,y,id,username;
   len=find.qid.length;
   for(i=0;i<len;i++)
   {
      if(find.qid[i]==session.user_id){username=find.username[i];id=find.qid[i];};
    //   console.log(find.qid[i]);
   }
   
//    session.reply(String(username));
      var say=session.raw_message.trim().split(/\s+/);
      if(say[0]=="添加一言")
          {
               
               let list = syssto.getItem('temphitokoto');
               if (!list) syssto.setItem('temphitokoto', '{}');
               list = JSON.parse(list);
               list.sentence[list.sentence.length]=say[1];
               list.provider[list.provider.length]=username;
               list.qid[list.qid.length]=session.user_id;
               session.reply("添加成功！请等待管理员审核");
               syssto.setItem("temphitokoto",JSON.stringify(list))
               this.client.sendGroupMsg(748571332,username+"上传了一言，请审核");
          }
   }
}
module.exports = exam;