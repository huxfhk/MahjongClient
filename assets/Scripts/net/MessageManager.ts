import IMessageHandler from "./IMessageHandler";
import { load ,Root, Type } from "../lib/protobuf";

export class MessageHandler{
    root:Root;
    handler:IMessageHandler;

    public constructor(root:Root,handler:IMessageHandler){
        this.root       = root;
        this.handler    = handler
    }
}

export default class MessageManager{

    private static instance:MessageManager;

    // private protoMap:Map<Number,Root> = new Map<Number,Root>();
    // private handlerMap:Map<number,IMessageHandler> = new Map<number,IMessageHandler>();
    private handlerMap:Map<number,MessageHandler> = new Map<number,MessageHandler>();

    public static getInstance(){
        if(null == MessageManager.instance){
            MessageManager.instance = new MessageManager();
        }
        return MessageManager.instance;
    }

    public register(code:number, proto:string, handler:IMessageHandler, callback):void{
        if(this.handlerMap.has(code)) return;

        load(`res/raw-assets/resources/${proto}`, (error:Error, root?:Root)=>{
            if(error) {
                callback(false,error);
                return;
            }

            this.handlerMap.set(code, new MessageHandler(root,handler))
            callback(true)
        })
    }

    public unRegister(code:number){

    }

    public lookupType(code:number, cla:string) :Type{
        if(!this.handlerMap.has(code)) return null;

        let root = this.handlerMap.get(code).root;
        return root.lookupType(cla);
    }

    public dispatchMessage(code:number, data:any):void{
        let handler:MessageHandler = this.handlerMap.get(code)
        if(undefined == handler){
            console.log(`has no handler for code ${code}`);
            return
        }

        var d = new Uint8Array(data.byteLength);
        var dataView = new DataView(data);
        for (var i = 0; i < data.byteLength; i++) {
            d[i] = dataView.getInt8(i);
        }

        let Message = handler.root.lookupType('com.sean.games.mahjong.JoinResponse')
        let err = Message.verify(d)
        if(err){
            console.log(err)
            return;
        }

        let msg = Message.decode(d)
        this.handlerMap.get(code).handler.handle(msg);
    }

}