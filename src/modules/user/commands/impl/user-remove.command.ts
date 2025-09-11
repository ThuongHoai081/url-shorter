export class UserRemoveCommand {
  readonly id: number;

  private constructor(id: number) {
    this.id = id;
  }

  static create(id: number): UserRemoveCommand {
    return new UserRemoveCommand(id);
  }
}
