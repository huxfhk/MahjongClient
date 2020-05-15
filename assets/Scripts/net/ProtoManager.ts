import { load ,Root, Type } from "../lib/protobuf";

export default class ProtoManager
{
    private static instance:ProtoManager;
    private protoMap:Map<Number,Root> = new Map<Number,Root>();

    public static getInstance():ProtoManager{
        if( null == ProtoManager.instance )
            ProtoManager.instance = new ProtoManager();
        return ProtoManager.instance;
    }

    public registerProto(code:number, url:string):void{
        
    }

    public unRegisterProto(code:number):void{

    }

    public lookupType(code:number, cla:string) :Type{
        if(!this.protoMap.has(code)) return null;

        let root = this.protoMap.get(code);
        return root.lookupType(cla);
    }
}