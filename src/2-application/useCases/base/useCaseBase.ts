import { Entity } from '#enterprise/entities/entity'

export interface UseCaseBase {
  run (input: {}): Promise<Entity | Array<Entity> | void | {}>
}
