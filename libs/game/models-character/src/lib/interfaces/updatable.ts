export abstract class Updatable {
  abstract order: number
  abstract update(timeStep: number, delta: number): void
}
