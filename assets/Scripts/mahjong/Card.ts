// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ResLoader from "../ResLoader";
import { Tile } from "./Define";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Card extends cc.Component {

    @property(cc.Sprite)
    word: cc.Sprite;

    private _tile:Tile;

    start () {
        // this.word = this.node.getChildByName('word').getComponent(cc.Sprite);
    }

    set tile(value:Tile){
        this._tile = value;
        this.updateTile();
    }

    get tile(){
        return this._tile
    }

    private updateTile(){
        ResLoader.getRes(`Mahjong/Cards/img_cardvalue${this._tile}`, cc.SpriteFrame, ((sprite:cc.SpriteFrame)=>{
            this.word.spriteFrame = sprite;
        }).bind(this));
    }

    // update (dt) {}
}
