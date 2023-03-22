import { SetMetadata } from '@nestjs/common';

export const Nombre = (...args: string[]) => SetMetadata('nombre', args);
