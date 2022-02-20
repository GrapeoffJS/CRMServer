import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { RoleModel } from './models/role.model';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
    imports: [TypegooseModule.forFeature([{ typegooseClass: RoleModel }])],
    providers: [RolesService],
    controllers: [RolesController]
})
export class RolesModule {}
