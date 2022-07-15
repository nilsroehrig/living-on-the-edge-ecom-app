export interface CategoryJson {
  id: string;
  name: string;
  slug: string;
  hero: string;
}

export class Category {
  constructor(
    private _id: string,
    private _name: string,
    private _slug: string,
    private _hero: string
  ) {}

  static fromCategoryJson({ id, name, slug, hero }: CategoryJson) {
    return new Category(id, name, slug, hero);
  }

  serialize(): CategoryJson {
    const { _id: id, _name: name, _slug: slug, _hero: hero } = this;
    return { id, name, slug, hero };
  }
}
