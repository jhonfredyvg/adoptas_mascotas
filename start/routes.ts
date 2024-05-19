/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import LoginController from '#controllers/auth/login_controller'
import RegistersController from '#controllers/auth/registers_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import LogoutController from '#controllers/auth/logout_controller'
import HomeController from '#controllers/home_controller'
import FilesController from '#controllers/files_controller'
import PetsController from '#controllers/pets/pets_controller'



router.on('/').render('index')
// router.on('/home').render('pages/home').use(middleware.auth())

router.get('/home', [HomeController, 'index']).use(middleware.auth())
router.post('/upload', [FilesController, 'upload'])




router.on('/teams').render('pages/teams/index').use(middleware.auth())

//Api
router.group(() => {
    router.post('login', [LoginController, 'login'])
    router.post('register', [RegistersController, 'register'])
    router.post('logout', [LogoutController, 'handle'])
}).prefix('/api')


// Auth
router.group(() => [
    router.on('/login').render('pages/auth/login'),
    router.on('/register').render('pages/auth/register')
])

//Pets

router.group(() => [
    router.get('/', [PetsController, 'index']).use(middleware.auth())
    
]).prefix('/pets')