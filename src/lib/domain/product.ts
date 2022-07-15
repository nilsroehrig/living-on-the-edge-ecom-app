import { Category, type CategoryJson } from './category';

export interface ProductJson {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  origin: string;
  category: CategoryJson;
  filename: string;
}

export class Product {
  constructor(
    private _id: string,
    private _name: string,
    private _description: string,
    private _price: number,
    private _brand: string,
    private _origin: string,
    private _category: Category,
    private _filename: string
  ) {}

  static fromProductJson({
    id,
    name,
    brand,
    category,
    description,
    filename,
    origin,
    price,
  }: ProductJson) {
    return new Product(
      id,
      name,
      description,
      price,
      brand,
      origin,
      Category.fromCategoryJson(category),
      filename
    );
  }

  serialize(): ProductJson {
    const {
      _brand: brand,
      _category: category,
      _description: description,
      _filename: filename,
      _id: id,
      _name: name,
      _origin: origin,
      _price: price,
    } = this;
    return {
      brand,
      description,
      filename,
      id,
      name,
      origin,
      price,
      category: category.serialize(),
    };
  }
}
