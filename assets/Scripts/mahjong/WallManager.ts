// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ResLoader from "../ResLoader";
import Card from "./Card";

const {ccclass, property} = cc._decorator;

// 牌墙
@ccclass
export default class WallManager extends cc.Component {

    @property(Number)
    private distance:number = 0;//距离中心长度
    @property(Number)
    private wallSize:number = 4;
    @property(Number)
    private stackSize:number= 18;

    private cards:Array<cc.Node> = [];

    public buildWalls():void{
        ResLoader.getRes('Mahjong/Prefabs/WallCard', cc.Prefab, (res:cc.Prefab)=>{
            for(let i = 0; i < this.wallSize; ++i)
            {
                let offsetX = 0,offsetY = 0, x = 0, y = 0;
                // 0,3 -280
                // 1,2 280
                if(i%2==0){
                    offsetX = 30
                    x = this.stackSize * offsetX * -.5
                    y = i==0?-this.distance:this.distance;
                }else{
                    offsetY = 20
                    y = this.stackSize * offsetY * -.5;
                    x = i == 1?this.distance:-this.distance;
                }
                for(let j = 0; j < this.stackSize; j++){
                    for(let l = 0; l < 2; ++l){
                        let card = cc.instantiate(res);
                        card.setParent(this.node)
                        card.setPosition(cc.v2(x,y + l*10))
                        this.cards.push(card)
                    }
                    x += offsetX;
                    y += offsetY
                }
            }
        });
    }

    public removeCards(start:number, deleteCount?:number):void{
        let nodes:Array<cc.Node> = this.cards.splice(start,deleteCount)
        for(let i = 0; i < nodes.length; ++i){
            nodes[i].destroy()
        }
    }
}
