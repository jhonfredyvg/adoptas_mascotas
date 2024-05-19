import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Pet extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare breed: string

  @column()
  declare age: number

  @column()
  declare gender: string

  @column()
  declare size: string

  @column()
  declare isVaccinated: boolean

  @column()
  declare isNeutered: boolean

  @column()
  declare description: string

  @column()
  declare images: string[] 

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}