const logger = require('../util/logger.js');
const config = require('../config.json');
const LocalStorage = require('node-localstorage').LocalStorage;
class Video
{
    constructor (client) {
       this.client = client;
    }

    activate () {
       logger.info('视频音频组件加载成功！');
    }
    async onGroupMessage (session)
    {
        if(session.group_id === yourgroup || session.group_id === yourtestgroup)
        {
          var say=session.raw_message.trim().split(/\s+/);
            if(session.raw_message=="GokuRakuJoudo" || session.raw_message=="gura video=>极乐净土")
            {
                  const { segment } = require("icqq")
                  const me = [
                    segment.video("/appdata/video/GokuRakuJoudo.mp4"),
                  ]
                  session.reply(me);
            }
            else if(session.raw_message=="骗我" || session.raw_message=="gura cheat me")
            {
                  const { segment } = require("icqq")
                  const me = [
                    segment.record("/appdata/record/cheat.silk"),
                  ]
                  session.reply(me);
            }
            else if(session.raw_message=="旋转鸡块" || session.raw_message=="gura video=>Nugget speens")
            {
                  const { segment } = require("icqq")
                  const me = [
                    segment.video("/appdata/video/Nugget SPEENS.mp4"),
                  ]
                  session.reply(me);
            }
            else if(session.raw_message.indexOf("大帝")!=-1||session.raw_message.indexOf("玉皇")!=-1)
            {
              const { segment } = require("icqq")
                  const me = [
                    segment.record("/appdata/record/idol.silk"),
                  ]
                  session.reply(me);
            }
            else if(say[0]=="试听")
            {
              // path="";
              const { segment } = require("icqq")
                  const me = [
                    segment.record("/appdata/musicbox/"+say[1]+"/"+say[2]+".silk"),
                  ]
                  session.reply(me);
            }
        }
    }
}
module.exports = Video;