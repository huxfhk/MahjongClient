// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Card from "./Card";
import { Tile } from "./Define";
import ResLoader from "../ResLoader";

const {ccclass, property} = cc._decorator;

// 出牌区域
@ccclass
export default class DiscardManager extends cc.Component {

    @property(cc.Integer)
    private columnCount:number = 6;
    @property(cc.Float)
    private width:number = 20;
    @property(cc.Float)
    private height:number = 30;

    public discard(tile:Tile): void{
        let count = this.node.childrenCount;
        let row = Math.floor(count / this.columnCount);
        let col = count % this.columnCount;

        let self = this
        ResLoader.getRes('Mahjong/Prefabs/Card', cc.Prefab, (res: cc.Prefab) => {
            let node = cc.instantiate(res);
            let card = node.getComponent(Card)
            card.tile = tile
            node.parent = self.node;
            node.setPosition(cc.v2(self.width * col,self.height * -row))
        })
    }
}
