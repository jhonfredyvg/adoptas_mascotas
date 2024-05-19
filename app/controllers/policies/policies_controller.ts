import type { HttpContext } from '@adonisjs/core/http'

export default class PoliciesController {
  /**
   * Display a list of resource
   */
  async index({view}: HttpContext) {
    return view.render('pages/policies/index')
  }

  
}