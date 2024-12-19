import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express'
import { ZodError } from 'zod'
import { env } from './env'
import cors from 'cors'
import { userRoutes } from './http/controllers/user/route'

export const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/users', userRoutes)

const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    res.status(400).send({
      message: 'Validation error',
      details: err.format(),
    })
    return
  }

  if (env.NODE_ENV === 'development') {
    console.error(err)
  } else {
    console.error(err.message)
  }

  res.status(500).send({
    message: 'Internal server error',
  })
}

app.use(errorHandler)
