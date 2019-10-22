export class Student {
  id: number;
  name: string;
  lastName: string;
  age: number;
  address: string;

  constructor(
    id: number,
    name: string,
    lastName: string,
    age: number,
    address: string
  ) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.age = age;
    this.address = address;
  }
}