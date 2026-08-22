import { UseCaseError } from "@/core/errors/use-case-error";

export class StudentAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Student "${identifier}" already exists.`);
    // super('Student with same e-mail address already exists.');
  }
}