import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class MinSizeValidatorPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const minSize = 10000;

    if (value.size < minSize)
      throw new BadRequestException('min size must be more than 10 kb');
    return value;
  }
}
