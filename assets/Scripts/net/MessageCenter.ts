import ConnectManager from "./ConnectManager";
import IConnectEvent from "./IConnectEvent";
import MessageManager from "./MessageManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MessageCenter extends cc.Component implements IConnectEvent {

    private static instance:MessageCenter = undefined;

    private messages:Array<any> = [];

    start():void
    {
        console.log(MessageCenter.instance)
        if(undefined != MessageCenter.instance){
            throw new Error('Duplicate MessageCenter');
        }
        MessageCenter.instance = this;
    }

    public static getInstance(){
        if(null == MessageCenter.instance){
            let node:cc.Node = new cc.Node('MessageCenter');
            MessageCenter.instance = node.addComponent(MessageCenter);
            cc.game.addPersistRootNode(node);
        }
        return MessageCenter.instance;
    }

    run():void{
        ConnectManager.getConnect()
    }

    update():void
    {
        while(this.messages.length > 0)
        {
            let msg = this.messages.shift();
            MessageManager.getInstance().dispatchMessage(msg.code, msg.data);
        }
    }

    onDestroy():void{
        MessageCenter.instance = null;
    }

    onConnection():void{
        console.log('connected')
    }

    onDisconnect():void
    {
        console.log('onDisconnect')
    }

    onReceive(data:any):void
    {
        this.messages.push(data)
    }
}
