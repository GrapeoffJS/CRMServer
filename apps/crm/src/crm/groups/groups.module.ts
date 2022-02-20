import { Module } from '@nestjs/common';

import { CompositionModule } from './composition/composition.module';
import { CrudModule } from './crud/crud.module';
import { PivotTableModule } from './pivot-table/pivot-table.module';

@Module({
    imports: [CrudModule, CompositionModule, PivotTableModule],
    providers: [],
    controllers: []
})
export class GroupsModule {}
