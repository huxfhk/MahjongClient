// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ConnectManager from "../net/ConnectManager";
import ResLoader from "../ResLoader";
import { Tile, GroupType } from "./Define";
import Player from "./Player";
import WallManager from "./WallManager";
import HandManager from "./HandManager";
import DiscardManager from "./DiscardManager";
import GroupManager from "./GroupManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MahjongGame extends cc.Component {

    @property(WallManager)
    private wallManager:WallManager;

    @property([HandManager])
    private handManager:HandManager[]       = [];
    @property([DiscardManager])
    private discardManager:DiscardManager[] = [];
    @property([GroupManager])
    private groupManager:GroupManager[]     = [];

    private players:Array<Player>           = [];

    onLoad () {
        // ConnectManager.init();
    }

    start () {
        ResLoader.loadDir('Mahjong',cc.SpriteFrame,()=>{
            ResLoader.loadDir('Mahjong',cc.Prefab,()=>{
                ResLoader.getRes('Mahjong/Prefabs/Card', cc.Prefab, (res:cc.Prefab)=>{
                    // let card = cc.instantiate(res);
                    // card.parent = this.node;
                    // card.setPosition(cc.v2(10,10))
                    // // CardValue.BAMBOO_1
                    // card.getComponent(Card).setCardValue(Tile.CHARACTER_9)
                });
            })
        })
    }

    startGame(){
        // this.joinGame('玩家1')
        // this.joinGame('玩家2')
        // this.joinGame('玩家3')
        // this.joinGame('玩家4')

        // this.buildWall()
        // for(let i = 0; i < this.handManager.length; ++i){
        //     this.wallManager.removeCards(0,10)
        //     this.draw(i,[Tile.BAMBOO_3,Tile.CHARACTER_1,Tile.DOT_3,Tile.WIND_East,Tile.BAMBOO_3,Tile.CHARACTER_1,Tile.DOT_3,Tile.WIND_East,Tile.BAMBOO_3,Tile.CHARACTER_1,Tile.DOT_3,Tile.WIND_East]);
        // }

        // this.discard(Tile.BAMBOO_1)
        this.group(GroupType.CHOW, [Tile.BAMBOO_1, Tile.BAMBOO_2, Tile.BAMBOO_3])
    }

    buildWall(){
        this.wallManager.buildWalls();
    }

    joinGame(name:string):void {
        this.players.push(new Player(name))
    }

    // 摸牌
    draw(seat:number, cards:Array<Tile>):void {
        this.handManager[seat].draw(cards);
    }

    // 出牌
    discard(tile:Tile): void {
        this.discardManager[0].discard(tile)
    }

    // 吃，碰，杠
    group(type:GroupType,tiles:Array<Tile>){
        this.groupManager[0].buildGroup(type,...tiles)
    }
}
