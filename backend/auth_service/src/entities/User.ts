
export class User {
  constructor(
    public readonly email: string,
    public readonly name: string,
    public readonly password: string,
    public readonly id: string,
    public readonly salt?: string,
  ) { }
}
