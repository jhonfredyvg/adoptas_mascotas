import storage from '#services/storage_service'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'


export default class HomeController {

  async index({ view }: HttpContext) {
  
    const userCount = await db
      .from('users')
      .count('*', 'total')

    const petsCount = await db
      .from('pets')
      .count('*', 'total')

    const adoptionsCount = await db
      .from('pets')
      .where('is_adopted', true)
      .count('*', 'total')

    const count = {
      users: userCount[0].total,
      pets: petsCount[0].total,
      adoptions: adoptionsCount[0].total,
    }


   
    return view.render('pages/home', { count })
  }


}