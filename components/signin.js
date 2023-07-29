const logger = require('../util/logger.js');
const config = require('../config.json');
const LocalStorage = require('node-localstorage').LocalStorage;
const storage = new LocalStorage('./usrdata/signin');
const axios = require('axios');
const dayjs = require('dayjs');
var luck,flag=false;
const day = parseInt(dayjs().format('DD'));
const month = parseInt(dayjs().format('MM'));
const banks = new LocalStorage("./usrdata/bank");
const syssto = new LocalStorage("./appdata");
const jesus = new LocalStorage("./usrdata/jesus");
const music = new LocalStorage("./usrdata/music");
var lucky;

class signin {
    constructor (client) {
        this.client = client;
    }
    
    refresh (id) {
        const now = dayjs().format('DD/MM/YYYY');
       
        if (now !== storage.getItem('date')) 
        { 
            storage.setItem('user', '{}');
            storage.setItem('seed', Math.round(Math.random() * 100));
            storage.setItem('date', now);
            storage.setItem('first','0');
            storage.setItem('max',-100);
            storage.setItem('min',200);
            storage.setItem("maxuser","");
            storage.setItem("minuser","");
            jesus.setItem("refresh",1);
        }
    }
    
    attempt (id) {
        let list = storage.getItem('user');
        if (!list) storage.setItem('user', '{}');
        list = JSON.parse(list);
        const attempt = list[id];
        
        if (!attempt) {
            list[id] = 1;
            storage.setItem('user', JSON.stringify(list));
            return 1;
        }
        list[id] = attempt + 1;
        storage.setItem('user', JSON.stringify(list));
        return attempt + 1;
    }
    activate () {
        logger.info('签到组件加载成功！');
    }
    
    async onGroupMessage (session) {
        // console.log(session.user_id); Class Group yourgroup   Test Group yourtestgroup Work Group  621989020
        this.refresh(session.group_id);
        if ((session.raw_message === '签到' || session.raw_message==='gura signin') && (session.group_id === yourgroup)) 
        {
            var id=session.user_id;
            var jrrp;
            let list = storage.getItem('user');
            if (!list) {storage.setItem('user', '{}');list="{}"};
            list = JSON.parse(list);
            if(list[id]==null)
            {
                var x = 0,y = 100;
                var r=Math.round(Math.random()*(y-x)+x);
                //  console.log(list)
                list[id]=r;
                storage.setItem('user', JSON.stringify(list));
               
                let list2= banks.getItem("list");
                list2 = JSON.parse(list2);
                list2[id]=list2[id]+2*r;
                banks.setItem('list', JSON.stringify(list2));

                x=r;
                
                
            }
            else x=list[id];
            var max=storage.getItem("max");
            var min=storage.getItem("min");
            if(x>max) {storage.setItem("max",x);storage.setItem("maxuser",session.nickname);}
            if(x<min) {storage.setItem("min",x);storage.setItem("minuser",session.nickname);}
        
            const width = 2390
            const height = 920
            const fs = require('fs')
            const { createCanvas, loadImage } = require('canvas')
            const canvas = createCanvas(width, height)
            const context = canvas.getContext('2d')
            var xqj=dayjs().day();
           
            var h=dayjs().hour();
            var txt;
            if(h>=5 && h<=6) 
            {
                txt="清晨";//background-image:linear-gradient(0deg,#fddb92 0%, #d1fdff 100%)
                var linearGradient= context.createLinearGradient(0,0,width,height);
            linearGradient.addColorStop(0,"#fddb92")
            linearGradient.addColorStop(1,"#d1fdff")
            //添加渐变颜色
            context.fillStyle=linearGradient;
            context.fillRect(0,0,width,height)
            }
            else if(h>=7 && h<=8)
            {
                txt="早上好";//background-image:linear-gradient(0deg,#e6b980 0%, #eacda3 100%)
                var linearGradient= context.createLinearGradient(0,0,width,height);
                linearGradient.addColorStop(0,"#e6b980")
                linearGradient.addColorStop(1,"#eacda3")
                //添加渐变颜色
                context.fillStyle=linearGradient;
                context.fillRect(0,0,width,height)
            }
            else if(h>=9 && h<12)
            {
                txt="上午好";//background-image:linear-gradient(120deg,#89f7fe 0%, #66a6ff 100%)
                var linearGradient= context.createLinearGradient(0,0,width,height);
                linearGradient.addColorStop(0,"#89f7fe")
                linearGradient.addColorStop(1,"#66a6ff")
                //添加渐变颜色
                context.fillStyle=linearGradient;
                context.fillRect(0,0,width,height)
            }
            else if(h>=12 && h<=13)
            {
                txt="中午好";//background-image:linear-gradient(0deg,#ff9a9e 0%, #fecfef 99%, #fecfef 100%)
                var linearGradient= context.createLinearGradient(0,0,width,height);
                linearGradient.addColorStop(0,"#ff9a9e")
                linearGradient.addColorStop(1,"#fecfef")
                //添加渐变颜色
                context.fillStyle=linearGradient;
                context.fillRect(0,0,width,height)
            }
            else if(h>=14 && h<=17)
            {
                txt="下午好";//background-image:linear-gradient(120deg,#e0c3fc 0%, #8ec5fc 100%)
                var linearGradient= context.createLinearGradient(0,0,width,height);
                linearGradient.addColorStop(0,"#8ec5fc")
                linearGradient.addColorStop(1,"#e0c3fc")
                //添加渐变颜色
                context.fillStyle=linearGradient;
                context.fillRect(0,0,width,height)
            }
            else if(h==18)
            {
                txt="傍晚";//background-image:linear-gradient(0deg,#0c3483 0%, #a2b6df 100%, #6b8cce 100%)
                var linearGradient= context.createLinearGradient(0,0,width,height);
                linearGradient.addColorStop(0,"#0c3483")
                linearGradient.addColorStop(1,"#6b8cce")
                //添加渐变颜色
                context.fillStyle=linearGradient;
                context.fillRect(0,0,width,height)
            }
            else if(h>=19 && h<=23)
            {
                txt="晚上好";//background-image:linear-gradient(0deg,#09203f 0%, #537895 100%)
                var linearGradient= context.createLinearGradient(0,0,width,height);
                linearGradient.addColorStop(0,"#09203f")
                linearGradient.addColorStop(1,"#537895")
                //添加渐变颜色
                context.fillStyle=linearGradient;
                context.fillRect(0,0,width,height)
            }
            else
            {
                txt="午夜";//background-image:linear-gradient(0deg,#1e3c72 0%, #1e3c72 1%, #2a5298 100%)
                var linearGradient= context.createLinearGradient(0,0,width,height);
                linearGradient.addColorStop(0,"#1e3c72")
                linearGradient.addColorStop(1,"#2a5298")
                //添加渐变颜色
                context.fillStyle=linearGradient;
                context.fillRect(0,0,width,height)
            }
            if(xqj==4)
            {
                txt="疯狂星期四";//background-image:linear-gradient(0deg,#1e3c72 0%, #1e3c72 1%, #2a5298 100%)
                var linearGradient= context.createLinearGradient(0,0,width,height);
                linearGradient.addColorStop(0,"red")
                linearGradient.addColorStop(1,"red")
                //添加渐变颜色
                context.fillStyle=linearGradient;
                context.fillRect(0,0,width,height)
            }
            
            
            
            context.font = 'bold 30pt Microsoft Yahei'
            context.textAlign = 'center'
            context.textBaseline = 'top'
            // context.fillStyle = "whit"
            // context.rotate(20*Math.PI/180);
            
            
            context.fillStyle = 'white'
            if(xqj==4) context.font = 'bold 120pt Microsoft Yahei'
            else context.font = 'bold 185pt Microsoft Yahei'
            context.fillText(txt,485,260)
            
            context.fillStyle = 'white'
            context.textAlign = 'left'
            context.font = 'bold 35pt Microsoft Yahei'
            context.fillText(session.nickname,125,250)
            
            context.fillStyle = 'white'
            context.textAlign = 'left'
            context.font = 'bold 35pt Microsoft Yahei'
            if(session.nickname==jesus.getItem("name"))
            {
                context.fillText('今日人品：你的人品由你自己决定',1025,250);
            }
            else
            {
            
            if(xqj==4) context.fillText('今天v你：'+x*2,1025,250)
            else context.fillText('今日人品：'+x,1025,250)
            }

            var col,text;
                if(x>=0 && x<=49) col='grey';
                else if(x>=50 && x<=60) col='green';
                else  if(x>60) col='red';
           if(xqj==4 && x>60) col='yellow';
                if(x>=0 && x<=25) text="大寄";
                else if(x>25 && x<50) text="小寄";
                else  if(x>=50 &&x<=60) text="中平";
                else if(x>60 && x<=75) text="小吉";
                else if(x>75) text="大吉";
            
                if(xqj==4)
                {
                    if(x>=0 && x<=25) text="卖完了";
                else if(x>25 && x<50) text="19.9的四个蛋挞";
                else  if(x>=50 &&x<=60) text="19.9的两份大份鸡米花";
                else if(x>60 && x<=75) text="19.9的两份鸡肉卷";
                else if(x>75) text="19.9的两份香辣鸡腿堡";
                }

            let use=music.getItem("using");
            use = JSON.parse(use);
            var path="";
            if(use[session.user_id]!=null)
            {
                var text,t;
                t=text;
                if(x>=0 && x<=25) text="5";
                else if(x>25 && x<50) text="4";
                else  if(x>=50 &&x<=60) text="3";
                else if(x>60 && x<=75) text="2";
                else if(x>75) text="1";
                path="/appdata/musicbox/"+use[session.user_id]+"/"+text+".mp3";
                text=t;
                // session.reply(path);
            }


            context.fillStyle = col
            context.textAlign = 'left'
            context.font = 'bold 35pt Microsoft Yahei'
            if(session.nickname!=jesus.getItem("name"))
            context.fillText(text,1425,250)
            
            if(xqj==4) context.fillStyle = 'yellow'
            else context.fillStyle = 'red'
            context.textAlign = 'left'
            context.font = 'bold 35pt Microsoft Yahei'
            if(xqj==4) context.fillText('肯德基侠 '+storage.getItem("maxuser")+"："+storage.getItem("max")*2,1025,320)
            else context.fillText('今日人品最佳 '+storage.getItem("maxuser")+"："+storage.getItem("max"),1025,320)
            
            if(xqj==4) context.fillStyle = 'blue'
            else context.fillStyle = 'grey'
            context.textAlign = 'left'
            context.font = 'bold 35pt Microsoft Yahei'
            if(xqj==4) context.fillText('肯德基佬 '+storage.getItem("minuser")+"："+storage.getItem("min")*2,1025,390)
            else context.fillText('今日人品最差 '+storage.getItem("minuser")+"："+storage.getItem("min"),1025,390)
            
            
            var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
            var httpRequest = new XMLHttpRequest();//第一步：建立所需的对象
            httpRequest.open('GET', 'http://timor.tech/api/holiday/tts', true);//第二步：打开连接  将请求参数写在url中  ps:"http://localhost:8080/rest/xxx"
            httpRequest.send();
            httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var json = httpRequest.responseText;
            const obj = JSON.parse(json);
            var saying=obj.tts;
            context.fillStyle = 'pink'
            context.textAlign = 'left'
            context.font = 'bold 35pt Microsoft Yahei'
            var i;
            var said=saying[0];
            var len=saying.length;
            for(i=1;i<len;i++)
            {
                if((i)%27==0) said=said+saying[i]+'\n';
                else said=said+saying[i];
            }
            said="今日耶稣:"+jesus.getItem("name");
            context.fillText(said,1025,460)
            let list = syssto.getItem('tip');
                 if (!list) syssto.setItem('tip', '{}');
                 list = JSON.parse(list);
                 var x = 0,y = list.sentence.length-1;
                 var r=Math.round(Math.random()*(y-x)+x);
                 context.textAlign = 'center'
            var dj;
            if(use[session.user_id]!=null)
            {
                var choose=use[session.user_id];
                var mname;
                if(choose==1) mname="花脸-完美世界";
                else if(choose==2) mname="终极-Denzel Curry";
                else if(choose==3) mname="有为青年-Blitz Kids";
                else if(choose==4) mname="迈阿密热线-Hotline Miami";
                else if(choose==5) mname="海绵手指";
                else if(choose==6) mname="相信自己";
                else if(choose==7) mname="植物大战僵尸";
                else if(choose==8) mname="欢乐斗地主-Tencent";
                else if(choose==9) mname="IMPACT-USAO/光吉猛修";
                else if(choose==10) mname="怪物-YOASOBI";
                else if(choose==11) mname="猪猪侠";
                context.fillText("正在使用的音乐盒："+mname,1195,860)
                dj="正在使用的音乐盒："+mname;
            }
            else
            context.fillText("TIP:"+list.sentence[r],1195,860)

            const buffer = canvas.toBuffer('image/png')
              fs.writeFileSync('./usrdata/temp/signin.png', buffer)
              const { segment } = require("icqq")
                    const me = [
                        segment.image("./usrdata/temp/signin.png"),
                    ]
                    session.reply(me);
                    const music = [
                        segment.record(path),
                    ]
                    if(use[session.user_id]!=null)
            {
                    session.reply(music);
            }
                    if(syssto.getItem("ban")==1)
                    {
                       const { segment } = require("icqq")
                     
                       const me = [
                           segment.share("http://47.113.194.233:24/signin.png","签到成功，点击查看","http://47.113.194.233:24/signin.png","[机器人消息]"),
                       ]
                       session.reply(me);
                       if(use[session.user_id]!=null)
                        {
                            const ame = [
                                segment.share("example.com",dj,"http://47.113.194.233:24/musicbox_cover/"+use[session.user_id]+"webp","[机器人消息]"),
                            ]
                             session.reply(ame);
                        }
                    }
            }
            }
        }
}
    get seed () {
        return parseInt(storage.getItem('seed'));
    }
}

module.exports = signin;