import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Role } from './models/Role.model';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: Role,
                schemaOptions: { collection: 'Roles' }
            }
        ])
    ],
    providers: [RolesService],
    controllers: [RolesController]
})
export class RolesModule {}
