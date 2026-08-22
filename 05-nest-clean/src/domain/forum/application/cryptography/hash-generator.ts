export abstract class HashGenerator {
  abstract hash(plain: string): Promise<string>;
}

// SOLID
// Single Reponsibility
// Open Closed Principle
// Liskov
// Interface Segregation <--
// Dependency Inversion