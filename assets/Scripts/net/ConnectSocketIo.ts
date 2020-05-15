import IConnect from "./IConnect";
import IConnectEvent from "./IConnectEvent";

export default class ConnectSocketIo implements IConnect{

    private event:IConnectEvent;
    private conn:SocketIOClient.Socket;

    setEvent(event:IConnectEvent):void{
        this.event = event;
    }

    connect(host:string, port:number):void{
        this.conn = io.connect(`ws://${host}:${port}`);
        let self = this
        this.conn.on('connect', (socket:SocketIOClient.Socket)=>{
            this.event.onConnection();
        });
        this.conn.on('disconnect',  (socket:SocketIOClient.Socket)=>{
            this.event.onDisconnect();
        });
        this.conn.on('message',  (data:string)=>{
            this.event.onReceive(data);
        });
    }

    public send(data: any, event:string='message'):void {
        this.conn.emit(event, data);
    }
}
