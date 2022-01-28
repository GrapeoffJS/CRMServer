import { Test, TestingModule } from '@nestjs/testing';
import { AdminsService } from '../../services/admins/admins.service';
import { getModelToken } from 'nestjs-typegoose';


describe('AdminService', () => {
    let service: AdminsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AdminsService, {
                provide: getModelToken('Admin'),
                useValue: {}
            }]
        }).compile();

        service = module.get<AdminsService>(AdminsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
