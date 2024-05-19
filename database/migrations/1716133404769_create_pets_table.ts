import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pets'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

          
      table.string('name').notNullable()
      table.string('breed').notNullable()
      table.integer('age').notNullable()
      table.string('breed').notNullable()
      table.string('breed').notNullable()
      table.boolean('is_vaccinated').defaultTo(false)
      table.boolean('is_neutered').defaultTo(false)
      table.text('description')
      table.specificType('images', 'text[]')
     
      table.timestamp('created_at')
      table.timestamp('updated_at')


    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}