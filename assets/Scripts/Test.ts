// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Test extends cc.Component {

    @property(cc.Button)
    private btn: cc.Button;

    onLoad() {
        // this.btn = this.node.getComponent(cc.Button);
        this.btn.node.on('click', this.callback, this);
    }

    callback(): void {
        // this.node.dispatchEvent(new cc.Event.EventCustom("abc", true));
        console.time("hu");

        console.log(this.check('11122'.split('')));
        console.timeEnd("hu");
    }

    check(cards: Array<string>): boolean {
        var map: Map<number, number> = this.sort(cards);
        this.showMap(map);

        for (let key in map) {
            if (map[key] < 2) continue;

            console.log(JSON.stringify(map));
            console.log("将：{%d:%d}", key, map[key]);
            map[key] -= 2;

            var list = Object.assign({}, map);
            if (0 == list[key]) delete list[key];
            if (this.testHu(list)) {
                return true;
            }
            map[key] += 2;
        }

        return false;
    }

    testHu(cards: Map<number, number>): boolean {
        if (Object.keys(cards).length <= 0) return true;

        console.log("--------------------");
        this.showMap(cards);

        var card: number = parseInt(Object.keys(cards)[0])
        if (cards[card] == 3) {
            this.sub(cards, card, 3);
            return this.testHu(cards);
        } else {
            var next1 = cards[card + 1]
            var next2 = cards[card + 2]
            if (!isNaN(next1) && next1 > 0 && !isNaN(next2) && next2 > 0) {
                this.sub(cards, card, 1);
                this.sub(cards, card + 1, 1);
                this.sub(cards, card + 2, 1);
                return this.testHu(cards);
            }
        }
        return false;
    }

    sub(cards: Map<number, number>, key: number, value: number): void {
        cards[key] -= value;
        if (0 == cards[key]) delete cards[key];
    }

    sort(cards: Array<string>): Map<number, number> {
        var map = new Map<number, number>();
        for (var i = 0; i < cards.length; ++i) {
            var n = Number(cards[i]);
            if (isNaN(map[n])) {
                map[n] = 0;
            }
            map[n]++;
        }
        return map;
    }

    showMap(map: Map<number, number>): void {
        console.log(JSON.stringify(map));
    }
    // update (dt) {}


}
