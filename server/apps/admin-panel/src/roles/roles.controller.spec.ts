import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { dbUri } from '../../../../test-utils/dbUri';
import mongoConnectionOptions from '../../../crmserver/src/config/mongoConnectionOptions';
import { Role } from './models/Role.model';
import { ActionPermissions } from './models/ActionPermissions';
import { DataPermissions } from './models/DataPermissions';
import { random } from 'faker/locale/ru';
import { DocumentType } from '@typegoose/typegoose';

describe('Roles', () => {
    let service: RolesService;
    let controller: RolesController;

    let mockRole: DocumentType<Role>;

    const mockActionPermissions: ActionPermissions[] = [
        ActionPermissions.CanAddPupilsToGroup,
        ActionPermissions.CanAddTutor,
        ActionPermissions.CanCreateNote,
        ActionPermissions.CanCreatePupil,
        ActionPermissions.CanSetGroupSchedule,
        ActionPermissions.CanUpdatePupilSchedule,
        ActionPermissions.CanUseSearch,
        ActionPermissions.CanCreatePupil,
        ActionPermissions.CanImportFile
    ];

    const mockDataPermissions: DataPermissions = {
        forPupil: {
            balance: 1,
            dateOfBirth: 1,
            discord: 1,
            groups: 1,
            groupsHistory: 1,
            localSchedule: 1,
            parentFullname: 1
        },
        forGroup: {
            global_schedule: 1,
            group_name: 1,
            level: 1,
            places: 1,
            pupils: 1,
            tutor: 1
        }
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypegooseModule.forRoot(dbUri, mongoConnectionOptions),
                TypegooseModule.forFeature([
                    {
                        typegooseClass: Role,
                        schemaOptions: { collection: 'Roles' }
                    }
                ])
            ],
            controllers: [RolesController],
            providers: [RolesService]
        }).compile();

        service = module.get<RolesService>(RolesService);
        controller = module.get<RolesController>(RolesController);
    });

    it('Controller should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('Service should be defined', () => {
        expect(service).toBeDefined();
    });

    it('Should create a new role', async () => {
        const role: DocumentType<Role> = await controller.create({
            actionPermissions: mockActionPermissions,
            dataPermissions: mockDataPermissions,
            name: random.word()
        });

        expect(role).toBeDefined();
        expect(role.name).toBeDefined();
        expect(role.dataPermissions).toEqual(mockDataPermissions);
        expect(role.actionPermissions).not.toEqual(mockDataPermissions);
        expect(role.dataPermissions).not.toEqual(mockActionPermissions);

        mockRole = role;
    });

    it('Should update created role', async () => {
        const role: DocumentType<Role> = await controller.update(
            { id: mockRole.id },
            {
                name: random.word() + random.word() + random.alpha(),
                actionPermissions: [],
                dataPermissions: { forGroup: {}, forPupil: {} }
            }
        );

        expect(role).toBeDefined();
        expect(role.name).not.toBe(mockRole.name);
        expect(role.actionPermissions).not.toEqual(mockRole.actionPermissions);
        expect(role.dataPermissions).not.toEqual(mockRole.dataPermissions);

        mockRole = role;
    });

    it('Should return an array of roles', async () => {
        const roles: DocumentType<Role>[] = await controller.findAll();

        expect(roles).toBeDefined();
        expect(roles).toBeInstanceOf(Array);
    });

    it('Should delete role', async () => {
        const role = await controller.delete({ id: mockRole.id });

        expect(role).toBeDefined();
    });
});
