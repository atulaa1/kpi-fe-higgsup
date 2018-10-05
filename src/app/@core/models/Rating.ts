export class Rating {
  rating: number;
  pointStructure1: number;
  pointStructure2: number;
  pointStructure3: number;


  constructor(rating: number, pointStructure1: number, pointStructure2: number, pointStructure3: number) {
    this.rating = rating;
    this.pointStructure1 = pointStructure1;
    this.pointStructure2 = pointStructure2;
    this.pointStructure3 = pointStructure3;
  }

}
