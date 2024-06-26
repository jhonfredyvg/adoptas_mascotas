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
import AccountsController from '#controllers/account/accounts_controller'
import PoliciesController from '#controllers/policies/policies_controller'



router.on('/').render('index')
// router.on('/home').render('pages/home').use(middleware.auth())

router.get('/home', [HomeController, 'index']).use(middleware.auth())


router.on('/teams').render('pages/teams/index').use(middleware.auth())

//Api
router.group(() => {
    //Auth
    router.post('login', [LoginController, 'login'])
    router.post('register', [RegistersController, 'register'])
    router.post('logout', [LogoutController, 'handle'])
    //Pets
    router.post('pet/update/:id', [PetsController, 'update'])    
    router.post('pet/create', [PetsController, 'create'])   
    //File
    router.post('/upload/:pet_id', [FilesController, 'upload']) 
    router.get('/delete/:pet_id/:image_id', [FilesController, 'delete']) 
}).prefix('/api')


// Auth
router.group(() => [
    router.on('/login').render('pages/auth/login'),
    router.on('/register').render('pages/auth/register')
])

//Pets
router.group(() => [
    router.get('/', [PetsController, 'index']).use(middleware.auth()),
    router.get('request', [PetsController, 'request']).use(middleware.auth())
]).prefix('/pets')

//Account
router.group(() => [
    router.get('/', [AccountsController, 'index']).use(middleware.auth()),
    router.get('mypets', [AccountsController, 'mypets']).use(middleware.auth()),
    router.get('myrequest', [AccountsController, 'myrequest']).use(middleware.auth()),
    router.get('upload/:id', [AccountsController, 'upload']).use(middleware.auth()),
    router.get('update/:id', [AccountsController, 'update']).use(middleware.auth()),
    router.get('create', [AccountsController, 'create']).use(middleware.auth())
]).prefix('/account')

//Policies
router.group(() => [
    router.get('/', [PoliciesController, 'index']).use(middleware.auth())
]).prefix('/policies')