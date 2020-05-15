// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Message } from "../lib/protobuf";
import IMessageHandler from "../net/IMessageHandler";
import MessageCenter from "../net/MessageCenter";
import MahjongGame from "./MahjongGame";
import MessageManager from "../net/MessageManager";
import ConnectManager from "../net/ConnectManager";

//导入protobufjs模块
// import protobuf from '../lib/protobuf'

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIMain extends cc.Component implements IMessageHandler{

    @property(cc.Button)
    startButton:cc.Button;

    private game:MahjongGame;

    start(){
        this.startButton.node.on('click',this.startGame,this);

        this.game = cc.find('Root/Mahjong').getComponent(MahjongGame);

        MessageCenter.getInstance().run();
        MessageManager.getInstance().register(0,'Mahjong/Mahjong.proto',this,(ret)=>{
            
        })
    }

    handle(msg:Message):void{
        console.log(msg)
    }

    startGame(){
        // this.startButton.node.active = false
        // this.game.startGame();
        // protobuf.load()
        // jsb.fileUtils.addSearchPath("res/raw-assets/resources", true);

        const joinRequestMsg = MessageManager.getInstance().lookupType(0,"com.sean.games.mahjong.JoinRequest")
        let joinMsg = joinRequestMsg.create({playerId:123, roomId:1})

        const Message = MessageManager.getInstance().lookupType(0,"com.sean.games.mahjong.Message")
        let m = Message.create({ joinRequest: joinMsg })
        let d = Message.encode(m).finish()

        var bufArr = new ArrayBuffer(d.length);
        var bufView = new Uint8Array(bufArr);
        bufView.set(d)

        let obj = {'@class': 'com.sean.server.socketio.Data',
                                        code: 1,
                                        data: bufArr};
        ConnectManager.getConnect().send(obj);

        // ProtoManager.getInstance().registerProto(0,'Mahjong/Mahjong.proto')
        // joinRequestMsg.
/**
        load('res/raw-assets/resources/Mahjong/Mahjong.proto',(error:Error,root?:Root)=>{
            if(error) throw error

            console.log(root)
            const joinRequestMsg = root.lookupType("com.sean.games.mahjong.JoinRequest")
            let joinMsg = joinRequestMsg.create({playerId:123, roomId:1})

            const Message = root.lookupType("com.sean.games.mahjong.Message")
            let m = Message.create({ joinRequest: joinMsg })
            let d = Message.encode(m).finish()

            var bufArr = new ArrayBuffer(d.length);
            var bufView = new Uint8Array(bufArr);
            bufView.set(d)

            let obj = {'@class': 'com.sean.server.socketio.Data',
                                          code: 1,
                                          data: bufArr};
            ConnectManager.getConnect().send(obj);

        }) */
    }
}
