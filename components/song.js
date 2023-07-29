const logger = require('../util/logger.js');
const config = require('../config.json');
const http = require("http");
const LocalStorage = require('node-localstorage').LocalStorage;
const user = new LocalStorage("./usrdata");
class Song {
    constructor (client) {
        this.client = client;
    }

    activate () {
        logger.info('点歌组件加载成功！');
    }
    
    async onGroupMessage (session) {
        // if (!config.workgroup.includes(session.group_id)) return;
        
        if (session.raw_message.startsWith('点歌')) {
            
            const word = session.raw_message.replace("点歌", "").trim();
            if (!word) return;
            http.get(`http://s.music.163.com/search/get/?type=1&s=${word}&limit=1`, res => {
                res.on("data", chunk => {
                    try {
                        const id = JSON.parse(String(chunk))?.result?.songs?.[0]?.id;
                        if (id) {
                            if (session.group?.shareMusic) session.group.shareMusic("163", id);
                            if (session.friend?.shareMusic) session.friend.shareMusic("163", id);
                        } else session.reply("未找到歌曲：" + word, true);
                    } catch (e) {
                        logger.error("请求歌曲API遇到错误：");
                        logger.error(e);
                    }
                });
            }).on("error", (e) => {
                logger.error(e);
            })
        }
        else if(session.raw_message=="赞我")
        {
            let list = user.getItem('like');
            if (!list) {user.setItem('like', '{}')};
            list = JSON.parse(list);
            if(list[session.user_id]==null){
                this.client.sendLike(session.user_id,10);
                list[session.user_id]=1;
                user.setItem('like', JSON.stringify(list));
                session.reply("赞你10次啦👍")
            }
            else session.reply("已经赞过你了...");

        }
    }
}

module.exports = Song;