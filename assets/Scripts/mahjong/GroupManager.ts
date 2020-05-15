// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Tile, GroupType } from "./Define";
import ResLoader from "../ResLoader";
import Card from "./Card";

const {ccclass, property} = cc._decorator;

class CardGroup{
    private _cards:Array<Tile> = [];
    private _type:GroupType;

    public constructor(type:GroupType, cards:Array<Tile>){
        this.type = type;
        this.pushCards(cards);
    }

    public get cards(){
        return this._cards;
    }

    public get type(){
        return this._type;
    }

    public set type(type:GroupType){
        this._type = type;
    }

    public pushCards(cards:Array<Tile>){
        cards.forEach((value:Tile,index:number,array:Tile[])=>this._cards.push(value));
    }
}

// 吃碰杠牌组管理
@ccclass
export default class GroupManager extends cc.Component {

    @property(Number)
    private groupOffset:number = 5;
    @property(Number)
    private startX:number = 5;
    @property(Number)
    private width:number = 40;

    // 吃、碰、杠 牌组
    private _groups:Array<CardGroup> = [];

    public buildGroup(type:GroupType, ...tiles:Array<Tile>)
    {
        let group = new CardGroup(type, tiles);
        this._groups.push(group)
        switch(type){
            case GroupType.CHOW:
            {
                this.chow(tiles);
                break;
            }
            case GroupType.PONG:
            {
                this.pong(tiles);
                break;
            }
            case GroupType.KONG:
            {
                this.kong(tiles);
                break;
            }
            default:
            {
                console.log(`unknow group type ${type}`)
                break;
            }
        }
    }

    // 吃
    public chow(tiles:Array<Tile>):void{
        ResLoader.getRes('Mahjong/Prefabs/Card', cc.Prefab, (res: cc.Prefab) => {
            for(let i = 0; i < tiles.length; ++i){
                let node = cc.instantiate(res);
                let card = node.getComponent(Card)
                card.tile = tiles[i]
                node.setScale(.35)
                node.setParent(this.node)
                node.setPosition(cc.v2(this.startX, 0))
                this.startX += this.width;
            }
            this.startX += this.groupOffset
        })
    }

    // 碰
    public pong(tiles:Array<Tile>):void{
        this.chow(tiles);
    }

    // 杠
    public kong(tiles:Array<Tile>):void{
        this.chow(tiles);
    }

    public get groups(){
        return this._groups
    }
}
