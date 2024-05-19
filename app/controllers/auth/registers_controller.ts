import User from '#models/user'
import { registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'


export default class RegistersController {

  async show({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }

  async register({ request, response, auth }: HttpContext) {
    // 1. Grab our request data and validate it

    // try {
      const data = await request.validateUsing(registerValidator)

      // 2. Create our user
      const user = await User.create(data)
      // 3. Login that user
      await auth.use('web').login(user)
    // } catch (error) {
    //   if (error instanceof errors.E_VALIDATION_ERROR) {
    //     // array created by SimpleErrorReporter
    //     console.log(error.messages)
    //   }
    // }




    // 4. Return the user back to home
    return response.redirect().toRoute('/login')
  }
}