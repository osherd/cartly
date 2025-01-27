export class Product {
  constructor(
    public readonly id: number,
    public readonly sku: string,
    public readonly name: string,
    public readonly sellingPrice: number,
    public readonly description: string,
    public readonly stockQuantity: number) {
  }
}

