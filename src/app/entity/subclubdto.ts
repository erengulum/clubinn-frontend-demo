import { ClubCategoryDto } from "./clubcategory";

export class SubClubDto {
    id: number;
    subClubName: string;
    imageurl: string;
    description: string;
    clubCategoryId: number;
    clubCategory: ClubCategoryDto;

}
