export class UserGetQuery {
  readonly id: number;

  private constructor(id: number) {
    this.id = id;
  }

  static create(id: number): UserGetQuery {
    return new UserGetQuery(id);
  }
}
