import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GroupsModule } from './groups/groups.module';
import { SearchModule } from './search/search.module';
import { StudentsModule } from './students/students.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        ConfigModule,
        AuthModule,
        GroupsModule,
        SearchModule,
        StudentsModule
    ]
})
export class CrmModule {}
