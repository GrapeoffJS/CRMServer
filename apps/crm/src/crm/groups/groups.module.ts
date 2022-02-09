import { Module } from '@nestjs/common';
import { CompositionModule } from './composition/composition.module';
import { CrudModule } from './crud/crud.module';

@Module({
    imports: [CrudModule, CompositionModule],
    providers: [],
    controllers: []
})
export class GroupsModule {}
