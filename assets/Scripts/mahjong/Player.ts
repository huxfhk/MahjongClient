import { Tile } from "./Define";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player
{
    private name:string;
    private cards:Array<Tile> = [];

    public constructor(name:string){
        this.name = name;
    }

    public addCard(cards:Tile[]):void{
        this.cards = this.cards.concat(cards)
        this.cards.sort((a:Tile,b:Tile)=>a-b)
    }
}