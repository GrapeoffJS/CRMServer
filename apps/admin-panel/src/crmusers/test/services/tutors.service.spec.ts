import { Test, TestingModule } from '@nestjs/testing';
import { TutorsService } from '../../services/tutors/tutors.service';

describe('TutorService', () => {
    let service: TutorsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TutorsService]
        }).compile();

        service = module.get<TutorsService>(TutorsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
