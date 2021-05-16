import { Collection } from "typescript";
import { MessageDto } from "./messagedto";

export class Chat{
    subClubName: string;
    chatDescription: string;
    messageList: Collection<MessageDto>;
}