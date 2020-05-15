// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Tile } from "./Define";
import ResLoader from "../ResLoader";
import Card from "./Card";

const { ccclass, property } = cc._decorator;

// 手牌区域
@ccclass
export default class HandManager extends cc.Component {

    @property(Number)
    private offset: number = 40;

    private cards: Array<Card> = [];

    // 抓牌
    public draw(cards: Array<Tile>): void {
        ResLoader.getRes('Mahjong/Prefabs/Card', cc.Prefab, (res: cc.Prefab) => {
            for (let i = 0; i < cards.length; ++i) {
                let node = cc.instantiate(res);
                let card = node.getComponent(Card)
                card.tile = cards[i];
                node.parent = this.node;

                this.cards.push(card)
            }
            this.updateCards()
        })
    }

    updateCards(): void {
        this.sort()

        let count = this.node.childrenCount
        let startX = this.offset * count * -.5;
        this.cards.forEach((card: Card, index: number, array: Array<Card>) => {
            card.node.setPosition(cc.v2(startX + this.offset * .5, 0))
            startX += this.offset;
        }, this);
    }

    private sort() {
        this.cards.sort((a: Card, b: Card) => a.tile - b.tile)
    }

}
