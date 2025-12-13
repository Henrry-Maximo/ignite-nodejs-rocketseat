export class OrganizationNotExists extends Error {
  constructor() {
    super('Organization not exists.');
  }
}