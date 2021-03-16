import dynamoose, { ModelConstructor, Schema } from 'dynamoose'
import { UserConnection } from '#enterprise/entities/userConnection'
import { BaseDataSchema, BaseKeySchema } from '#framework/models/baseModel'

export type UserConnectionDataSchema = BaseDataSchema<UserConnection>
export type UserConnectionKeySchema = BaseKeySchema

export type UserConnectionSchema = ModelConstructor<
  UserConnectionDataSchema,
  UserConnectionKeySchema
>

const schema = {
  pk: {
    type: String,
    required: true,
    hashKey: true
  },
  sk: {
    type: String,
    required: true,
    rangeKey: true
  },
  connectionId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  }
}

export const UserConnectionModel: UserConnectionSchema = dynamoose.model<
  UserConnectionDataSchema,
  UserConnectionKeySchema>(
    'SIGO',
    new Schema(schema, {
      timestamps: true,
      saveUnknown: true,
      useDocumentTypes: false
    })
  )
