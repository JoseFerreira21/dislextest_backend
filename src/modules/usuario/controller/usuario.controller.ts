import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
  HttpCode,
} from '@nestjs/common';

import { UsuarioService } from '../service/usuario.service';
import { CreateUsuarioDto, UpdateUsuarioDto } from '../dtos/usuario.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Public } from '../../../auth/decorators/public.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt.auth.guard';
import { UsuarioEmailDto } from '../dtos/usuarioemail.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';

//@ApiBearerAuth()
//@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('usuario')
@Controller('usuario')
export class UserProfileController {
  constructor(private usuarioService: UsuarioService) {}

  @Get()
  getUsuarios() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.findOne(id);
  }

  
  @Post()
  create(@Body() payload: CreateUsuarioDto) {
    return this.usuarioService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, payload);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.usuarioService.remove(id);
    return {
      message: `Usuario #${id} eliminado`,
    };
  }

  @HttpCode(201)
  @Post('is-available')
  isAvailable(@Body('email') email: string): any {
    const userEmail = this.usuarioService.findByMail(email);

    if (!userEmail) {
      return { message: 'true' };
    }
    return { message: 'false' };
  }
}
