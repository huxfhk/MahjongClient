import ConnectSocketIo from "./ConnectSocketIo";
import IConnect from "./IConnect";
import MessageCenter from "./MessageCenter";

export default class ConnectManager {
    private static CONNECT_COMMON: string = 'common';

    private static isInit: boolean = false;
    private static connectMap: Map<string, IConnect> = new Map<string, IConnect>();

    public static getConnect(): IConnect {
        return ConnectManager.getConnectByName(ConnectManager.CONNECT_COMMON, '127.0.0.1', 8013);
    }

    public static getConnectByName(name: string, host?: string, port?: number): IConnect {
        let conn = ConnectManager.connectMap.get(name)
        if (undefined == conn) {
            conn = new ConnectSocketIo()
            conn.setEvent(MessageCenter.getInstance());
            conn.connect(host, port);
            ConnectManager.connectMap.set(name, conn);
        }
        return conn
    }
}
