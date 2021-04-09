import { Role } from "./role";

export class TokenDto {
    username: string;
    firstname: string;
    surname: string;
    role: Role;
    token?: string;

}