type BaseModel = {
  pk: string
  sk: string
}

export type BaseDataSchema<T> = T & BaseModel
export type BaseKeySchema = Pick<BaseModel, any>
