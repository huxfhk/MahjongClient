import { Message } from "../lib/protobuf";

export default interface IMessageHandler{
    handle(msg:Message):void;
}