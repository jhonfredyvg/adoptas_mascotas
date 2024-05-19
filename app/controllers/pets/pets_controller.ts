import { PetFactory } from '#database/factories/pet_factory'
import Pet from '#models/pet'
import type { HttpContext } from '@adonisjs/core/http'

export default class PetsController {
  /**
   * Display a list of resource
   */
  async index({view}: HttpContext) {

    // await PetFactory.createMany(10)
    const pets = await Pet
    .query()
    .where('is_adopted', false)
    
    
  

    // const pets = await Pet.all()
    return view.render('pages/pets/index', {pets})
  }

  /**
   * Display form to create a new record
   */
  async request({view}: HttpContext) {
    return view.render('pages/pets/request')
  }

  
}