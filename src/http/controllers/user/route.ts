import { Router } from 'express'
import { authenticateController } from './authenticate.user.controller'
import { refresh } from './refresh'
import { createUserController } from './create.user.controller'
import { userProfileController } from './get.user.controller'
import { verifyJWT } from '@/http/middlewares/verify.jwt'
import { getUsersController } from './get.users.controller'

const router = Router()

router.post('/sessions', authenticateController)

router.patch('/refresh/token', refresh)

router.post('/', createUserController)

router.get('/me', verifyJWT, userProfileController)

router.get('/users', verifyJWT, getUsersController)

export { router as userRoutes }
