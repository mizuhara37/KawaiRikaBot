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
        if(session.group_id === 661222218 || session.group_id === 748571332)
        {
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
        }
    }
}
module.exports = Video;