/*
  Class (value-object) for working with ID
  @param {value} string - optional value for ID

  note -> if is necessary change the generator id,
  only to need modify unique-entity-id (class)
*/

import { randomUUID } from 'node:crypto'

export class UniqueEntityID {
  private value: string

  // get value

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }
}
