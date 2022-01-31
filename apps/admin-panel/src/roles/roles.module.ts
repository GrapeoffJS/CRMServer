import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { RoleModel } from './models/Role.model';

@Module({
    imports: [TypegooseModule.forFeature([{ typegooseClass: RoleModel }])],
    providers: [RolesService],
    controllers: [RolesController]
})
export class RolesModule {}
