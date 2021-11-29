export class User {
  constructor(
    private username: string,
    private token: string,
    private expirationDate: Date,
    private userId: string
  ) {}

  get expireDate() {
    return this.expirationDate;
  }
}
