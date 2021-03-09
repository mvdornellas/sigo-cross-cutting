import dynamoose, { ModelConstructor, Schema } from 'dynamoose'
import { UserLogged } from '#enterprise/entities/userLogged'

export type UserLoggedDataSchema = UserLogged
export type UserLoggedKeySchema = Pick<UserLogged, 'connectionId'>

export type UserLoggedSchema = ModelConstructor<
  UserLoggedDataSchema,
  UserLoggedKeySchema
>

const schema = {
  connectionId: {
    type: String,
    required: true,
    hashKey: true
  },
  createdAt: {
    type: Date,
    required: true
  }
}

export const UserLoggedModel: UserLoggedSchema = dynamoose.model<
  UserLoggedDataSchema,
  UserLoggedKeySchema>(
    'UserLogged',
    new Schema(schema, {
      timestamps: true,
      saveUnknown: true,
      useDocumentTypes: false
    })
  )
