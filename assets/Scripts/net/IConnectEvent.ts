export default interface IConnectEvent
{
    onConnection():void;
    onDisconnect():void;
    onReceive(data:any):void;
}
