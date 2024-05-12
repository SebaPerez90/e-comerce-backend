import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';
import { Request as NestRequest } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class PopulateUserMiddleware implements NestMiddleware {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}

  async use(@NestRequest() req: any, res: Response, next: NextFunction) {
    const userToken = req.headers.authorization?.split(' ')[1];

    if (userToken) {
      try {
        const decoded = jwt.verify(userToken, process.env.JWT_SECRET) as any;
        const email = decoded.email;
        const user = await this.userRepository.findOne({
          where: { email: email },
        });

        if (user) {
          req.user = user;
        } else {
          throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }
      } catch (error) {
        console.error('Error decoding JWT token:', error);
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      }
    }

    next();
  }
}
