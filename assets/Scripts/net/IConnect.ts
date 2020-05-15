import IConnectEvent from "./IConnectEvent";

export default interface IConnect 
{
    setEvent(event:IConnectEvent):void;
    connect(host:string, port:number):void;

    send(data: any, event?:string):void;
}
