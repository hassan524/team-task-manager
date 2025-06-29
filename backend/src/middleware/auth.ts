import { Request, Response, NextFunction } from 'express'

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if ((req.session as any).userId) {
    next() 
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}