import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Request extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ isPrimary: true })
  declare user_id: number

  @column({ isPrimary: true })
  declare pet_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}