import 'reflect-metadata'
import { Container } from 'typedi/Container'
import { Sequelize, Options } from 'sequelize'
import { Logger } from '#framework/common/logger'

export default async function sequelize () {
  const logger = Container.get(Logger)
  try {
    const database = {
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      userName: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    }
    logger.info({
      file: `database.ts`,
      method: `init`,
      message: `Initializing the sequelize with the database parameters ${JSON.stringify(database)}`
    })
    const dbConnection: Options = {
      dialect: 'mysql',
      host: database.host,
      port: parseInt(database.port || '3306', 10),
      username: database.userName,
      password: database.password,
      database: database.database,
      pool: {
        max: 5,
        min: 1
      },
      define: {
        timestamps: false
      },
      logging: console.log
    }
    const sequelize = new Sequelize(dbConnection)
    Container.set({ id: Sequelize, value: sequelize })
    Container.getMany('models')
  } catch (error) {
    logger.error({
      file: `database.ts`,
      method: 'init',
      message: `Error`,
      stackTrace: error
    })
  }
}
