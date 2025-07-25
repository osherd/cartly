export class Role {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description?: string,
    public readonly permissions?: string[],
  ) { }
}