const logger = require('../util/logger.js');
const config = require('../config.json');
const LocalStorage = require('node-localstorage').LocalStorage;
const user = new LocalStorage("./usrdata");
function up(x,y)
{
   return x.total-y.total;
}

class Speaker
{
    constructor (client) {
       this.client = client;
    }

    activate () {
       logger.info('发言榜组件加载成功！');
    }
    async onGroupMessage (session)
    {
        if(session.group_id === yourgroup)
        {
        user.setItem("total_speaker",parseInt(user.getItem("total_speaker"))+1);
        var all=user.getItem("total_speaker");
        let list = user.getItem('speaker');
        if (!list) {user.setItem('speaker', '{}');list='{"name":[],"total":[],"number":[]}'};
        list = JSON.parse(list);
        var len=list.name.length;
        var i;var flag=0;
        for(i=0;i<len;i++)
            if(session.nickname==list.name[i]) {flag=1;list.total[i]=list.total[i]+1;}
        if(flag==0){list.name[i]=session.nickname;list.total[i]=1;list.number[i]=len;};
        user.setItem('speaker', JSON.stringify(list));
        len=list.name.length;
        var t;
        for(var i=0;i<len;i++)
         for(var j=0;j<len;j++)
          if(list.total[i]>list.total[j])
          {
                t=list.total[i];
                list.total[i]=list.total[j];
                list.total[j]=t;
                t=list.name[i];
                list.name[i]=list.name[j];
                list.name[j]=t;
                t=list.number[i];
                list.number[i]=list.number[j];
                list.number[j]=t;
          }
      //   var t={};
      //   for(var i=0;i<arr1.length;i++)
      //     t[''+arr1[i]+'']=arr2[i];
        // list.sort(up);
        // console.log(list)
        if(session.raw_message=="发言榜")
        {
            // var sentence="今日发言总数:"+all+"\n";

            // if(list.name[0]!=null) sentence=sentence+"1."+list.name[0]+" "+list.total[0]+" "+(parseInt(list.total[0]/all*100))+"%\n";
            // if(list.name[1]!=null) sentence=sentence+"2."+list.name[1]+" "+list.total[1]+" "+(parseInt(list.total[1]/all*100))+"%\n";
            // if(list.name[2]!=null) sentence=sentence+"3."+list.name[2]+" "+list.total[2]+" "+(parseInt(list.total[2]/all*100))+"%\n";
            // if(list.name[3]!=null) sentence=sentence+"4."+list.name[3]+" "+list.total[3]+" "+(parseInt(list.total[3]/all*100))+"%\n";
            // if(list.name[4]!=null) sentence=sentence+"5."+list.name[4]+" "+list.total[4]+" "+(parseInt(list.total[4]/all*100))+"%\n";
            
            // session.reply(sentence);
            //have a rest
    
const width = 1840
const height = 880
const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(width, height)
const context = canvas.getContext('2d')
var linearGradient= context.createLinearGradient(0,0,width,height);
linearGradient.addColorStop(0,"#1e3c72")
linearGradient.addColorStop(0.01,"#1e3c72")
linearGradient.addColorStop(1,"#2a5298")
// background-image:linear-gradient(0deg,#1e3c72 0%, #1e3c72 1%, #2a5298 100%)
context.fillStyle=linearGradient;
context.fillRect(0,0,width,height)


context.fillStyle = 'white'
context.textAlign = 'left'
context.font = 'bold 55pt Microsoft Yahei'
context.fillText('发言榜',100,120)

context.fillStyle = 'white'
context.textAlign = 'left'
context.font = 'bold 35pt Microsoft Yahei'
context.fillText('你怎么知道今天群里总共发言了'+all+'次',400,110)

context.fillStyle = 'white'
context.textAlign = 'left'
context.font = 'bold 20pt Microsoft Yahei'

var long=1000;
var s1="",s2="",s3="",s4="",s5="";
t=list.name[0];
console.log(t[11]);
if(t>12)
for(var i=0;i<12;i++)
    s1=s1+t[i];
else s1=t;
 t=list.name[1];
 if(t>12)
for(var i=0;i<12;i++)
    s2=s2+t[i];
    else s2=t;
t=list.name[2];
if(t>12)
for(var i=0;i<12;i++)
    s3=s3+t[i];
    else s3=t;
t=list.name[3];
if(t>12)
for(var i=0;i<12;i++)
    s4=s4+t[i];
    else s4=t;
t=list.name[4];
if(t>12)
for(var i=0;i<12;i++)
    s5=s5+t[i];   
    else s5=t;
if(list.name[0].length>12) s1=s1+'...';
if(list.name[1]!=null) if(list.name[1].length>12) s2=s2+'...';
if(list.name[2]!=null) if(list.name[2].length>12) s3=s3+'...';
if(list.name[3]!=null) if(list.name[3].length>12) s4=s4+'...';
if(list.name[4]!=null) if(list.name[4].length>12) s5=s5+'...';

if(list.name[1]==null) s2='';
if(list.name[2]==null) s3='';
if(list.name[3]==null) s4='';
if(list.name[4]==null) s5='';
context.fillText(s1,100,250)

context.fillText(s2,100,350)

context.fillText(s3,100,450)

context.fillText(s4,100,550)

context.fillText(s5,100,650)

var a1=list.total[0]/all*1000;
var a2=list.total[1]/all*1000;
var a3=list.total[2]/all*1000;
var a4=list.total[3]/all*1000;
var a5=list.total[4]/all*1000;

context.fillRect(500,237,a1,15)
context.fillRect(500,337,a2,15)
context.fillRect(500,437,a3,15)
context.fillRect(500,537,a4,15)
context.fillRect(500,637,a5,15)

context.fillStyle = 'white'
context.textAlign = 'left'
context.font = 'bold 20pt Microsoft Yahei'
console.log(all);
context.fillText((parseInt(list.total[0]/all*100)+"% "+list.total[0]+"次"),a1+550,255)
context.fillText((parseInt(list.total[1]/all*100)+"% "+list.total[1]+"次"),a2+550,355)
context.fillText((parseInt(list.total[2]/all*100)+"% "+list.total[2]+"次"),a3+550,455)
context.fillText((parseInt(list.total[3]/all*100)+"% "+list.total[3]+"次"),a4+550,555)
context.fillText((parseInt(list.total[4]/all*100)+"% "+list.total[4]+"次"),a5+550,655)

const buffer = canvas.toBuffer('image/png')
const { segment } = require("icqq")
fs.writeFileSync('./usrdata/temp/speaker_list.png', buffer)
const me = [
    segment.image("./usrdata/temp/speaker_list.png"),
]
session.reply(me);
        }
    }
    }
}
module.exports = Speaker;