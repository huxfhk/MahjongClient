// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ResLoader {

    public static loadDir(path:string, type:typeof cc.Asset, completeCallback:()=>void){
        cc.loader.loadResDir(path, type, (completedCount: number, totalCount: number, item: any)=>{
            // cc.log(item)
        }, (error: Error, resource: any[], urls: string[])=>{
            if(null != error){
                console.log(error)
                return;
            }
            completeCallback();
        });
    }

    public static getRes(url:string, type:typeof cc.Asset, callback:(res:cc.Asset)=>void){
        let sf = cc.loader.getRes(url, type);
        if(null != sf){
            callback(sf);
            return;
        }

        cc.loader.loadRes(url, type, (error:Error,resource:any)=>{
            callback(resource);
        });
    }



}
