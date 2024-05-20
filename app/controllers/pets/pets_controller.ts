import Pet from '#models/pet'
import { petValidator } from '#validators/pet'
import type { HttpContext } from '@adonisjs/core/http'

export default class PetsController {

  //Page
  async index({ view }: HttpContext) {
    // await PetFactory.createMany(10)
    const pets = await Pet
      .query()
      .where('is_adopted', false)
    return view.render('pages/pets/index', { pets })
  }

  async request({ view }: HttpContext) {
    return view.render('pages/pets/request')
  }

  //Api
  async create({ request, response }: HttpContext) {
    const data = await request.validateUsing(petValidator)
    await Pet.create(data)
    response.redirect('/account/mypets')
  }

  async update({ request, response, params }: HttpContext) {

    // try {
    //   const data = await request.validateUsing(createPetValidator)
    // } catch (error) {
    //   response.badRequest(error.messages)
    // }
    //  const body = await request.body()

    const data = await request.validateUsing(petValidator)

    const pet_id = params.id
    const pet = await Pet.find(pet_id)
    if (pet) {
      await pet.merge(data).save()
    }
    response.redirect('/account/mypets')
  }



}