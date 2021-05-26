export class Page {

  constructor() {
    this.page = 0; //0'ıncı sayfadan başlatıyoruz.
    this.size = 10;
  }

  size: number = 0;
  //The total number of elements
  totalElements: number = 0;
  //The total number of pages
  totalPages: number = 0;
  //The current page number
  page: number = 0;
}