import { Request } from 'express'

export interface ExtendedRequest extends Request {
  body: object,
  isXHubValid: () => boolean
}