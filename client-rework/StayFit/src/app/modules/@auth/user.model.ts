export class User {
  constructor(
    private username: string,
    private token: string,
    private expirationDate: Date,
    private userId: string,
    private roles:string[]
  ) {}

  get expireDate() {
    return this.expirationDate;
  }

  get getToken() {
    return this.token;
  }

  hasRole(role: string){
    return this.roles.some(r => r.toLowerCase() == role.toLowerCase())
  }
}
