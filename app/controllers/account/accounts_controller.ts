import storage from '#services/storage_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class AccountsController {
 
  async index({view}: HttpContext) {
    const url = storage.get('1716131052715.jpg')
    return view.render('pages/account/index')
  }

 
  async mypets({view}: HttpContext) {
    return view.render('pages/account/mypets')
  }


  async myrequest({ view }: HttpContext) {
    return view.render('pages/account/myrequest')
  }

 
}