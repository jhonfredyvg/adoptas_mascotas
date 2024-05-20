import Pet from '#models/pet'
import type { HttpContext } from '@adonisjs/core/http'


export default class AccountsController {

  async index({ view }: HttpContext) {
    // const url = storage.get('1716131052715.jpg')
    return view.render('pages/account/index')
  }

  async mypets({ view, auth }: HttpContext) {
    const user_id = auth.user?.id

    if (user_id) {
      const pets = await Pet
        .query()
        .where('user_id', user_id)

      return view.render('pages/account/mypets', { pets })
    }

    // const pets = await Pet.findBy('user_id', user_id)
    return view.render('pages/account/mypets')
  }

  async myrequest({ view }: HttpContext) {
    return view.render('pages/account/myrequest')
  }

  async upload({ view, params }: HttpContext) {
    const pet_id = params.id
    return view.render('pages/account/upload', { pet_id })
  }

  async update({ view, params }: HttpContext) {
    const pet_id = params.id
    const pet = await Pet.find(pet_id)
    return view.render('pages/account/update', { pet })
  }

  async create({ view }: HttpContext) {    
    return view.render('pages/account/create')
  }

}