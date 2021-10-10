import { Test, TestingModule } from '@nestjs/testing';
import { CRMAccountsService } from './crmaccounts.service';
import { CRMAccountsController } from './crmaccounts.controller';
import { company, helpers, internet, name } from 'faker/locale/ru';
import { RolesController } from '../roles/roles.controller';
import { RolesService } from '../roles/roles.service';
import { AccountTypes } from './models/AccountTypes';
import { TypegooseModule } from 'nestjs-typegoose';
import { dbUri } from '../../../../test-utils/dbUri';
import mongoConnectionOptions from '../../../crmserver/src/config/mongoConnectionOptions';
import CRMUser from './models/CRMUser.model';
import { Role } from '../roles/models/Role.model';
import { SearchIndexer } from '../../../crmserver/src/SearchIndexer/SearchIndexer';
import { elasticUri } from '../../../../test-utils/elasticUri';
import { DocumentType } from '@typegoose/typegoose';

describe('CRMAccounts', () => {
    let service: CRMAccountsService;
    let controller: CRMAccountsController;
    let rolesController: RolesController;

    SearchIndexer.getInstance().connect({ node: elasticUri });

    const accountTypes: AccountTypes[] = [
        AccountTypes.Manager,
        AccountTypes.Teacher,
        AccountTypes.Admin,
        AccountTypes.Partner,
        AccountTypes.SeniorTeacher,
        AccountTypes.SupportManager
    ];

    let accountType;

    let user: DocumentType<CRMUser>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypegooseModule.forRoot(dbUri, mongoConnectionOptions),
                TypegooseModule.forFeature([
                    {
                        typegooseClass: CRMUser,
                        schemaOptions: { collection: 'CRMUsers' }
                    },
                    {
                        typegooseClass: Role,
                        schemaOptions: { collection: 'Roles' }
                    }
                ])
            ],
            controllers: [CRMAccountsController, RolesController],
            providers: [CRMAccountsService, RolesService]
        }).compile();

        service = module.get<CRMAccountsService>(CRMAccountsService);
        controller = module.get<CRMAccountsController>(CRMAccountsController);

        rolesController = module.get<RolesController>(RolesController);

        accountType = helpers.randomize(accountTypes);
    });

    it('Controller should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('Service should be defined', () => {
        expect(service).toBeDefined();
    });

    it('Should create a new user', async () => {
        const created: DocumentType<CRMUser> = await controller.create({
            name: name.firstName(),
            surname: name.lastName(),
            midname: name.middleName(),
            login: internet.userName(),
            password: internet.password(),
            accountType,
            role: (
                await rolesController.create({
                    name: company.companyName(),
                    actionPermissions: [],
                    dataPermissions: { forGroup: {}, forPupil: {} }
                })
            ).id
        });

        expect(created).toBeDefined();
        expect(created).toHaveProperty('name');
        expect(created).toHaveProperty('surname');
        expect(created).toHaveProperty('midname');
        expect(created).toHaveProperty('role');
        expect(created).toHaveProperty('password');
        expect(created).toHaveProperty('accountType');
        expect(created).toHaveProperty('login');
        expect(created.accountType).toBe(accountType);

        user = created;
    });

    it('Should update user', async () => {
        const updated: DocumentType<CRMUser> = await controller.edit(
            { id: user.id },
            {
                name: name.firstName(),
                surname: name.lastName(),
                midname: name.middleName(),
                accountType,
                login: internet.userName()
            }
        );

        expect(updated).toHaveProperty('name');
        expect(updated).toHaveProperty('surname');
        expect(updated).toHaveProperty('midname');
        expect(updated).toHaveProperty('role');
        expect(updated).toHaveProperty('password');
        expect(updated).toHaveProperty('accountType');
        expect(updated).toHaveProperty('login');
        expect(updated).toBeDefined();
        expect(updated.name).not.toBe(user.name);
        expect(updated.surname).not.toBe(user.surname);
        expect(updated.midname).not.toBe(user.midname);
        expect(updated.accountType).not.toBe(user.accountType);
        expect(updated.login).not.toBe(user.login);

        user = updated;
    });

    it('Should find created user by id', async () => {
        const found: DocumentType<CRMUser> = await controller.findById({
            id: user.id
        });

        expect(found).toBeDefined();
        expect(found).toHaveProperty('name');
        expect(found).toHaveProperty('surname');
        expect(found).toHaveProperty('midname');
        expect(found).toHaveProperty('role');
        expect(found).toHaveProperty('password');
        expect(found).toHaveProperty('accountType');
        expect(found).toHaveProperty('login');
    });

    it('Should delete user', async () => {
        const deleted: DocumentType<CRMUser> = await controller.delete(
            user.login
        );

        expect(deleted).toBeDefined();
        expect(deleted).toHaveProperty('name');
        expect(deleted).toHaveProperty('surname');
        expect(deleted).toHaveProperty('midname');
        expect(deleted).toHaveProperty('role');
        expect(deleted).toHaveProperty('password');
        expect(deleted).toHaveProperty('accountType');
        expect(deleted).toHaveProperty('login');
    });
});
