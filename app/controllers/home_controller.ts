import storage from '#services/storage_service'
import type { HttpContext } from '@adonisjs/core/http'


export default class HomeController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {    
    const url = storage.get('1716131052715.jpg')
    return view.render('pages/home',{url})
  }


}