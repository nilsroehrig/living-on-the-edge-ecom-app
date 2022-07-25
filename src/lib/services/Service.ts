import type { Option } from "prelude-ts";

export interface Service<EntityType, IDType> {
  getAll(): Promise<EntityType[]>;
  getOne(id: IDType): Promise<Option<EntityType>>;
}
