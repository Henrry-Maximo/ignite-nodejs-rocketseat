import { Entity } from "./entity"

// simbolizar que é o aggregate root
export abstract class AggregateRoot<Props> extends Entity<Props> {}