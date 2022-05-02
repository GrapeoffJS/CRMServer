import { RightsBasedSerializerInterceptor } from '../rights-based-serializer.interceptor';

describe('RightsBasedSerializerInterceptor', () => {
    it('should be defined', () => {
        expect(new RightsBasedSerializerInterceptor(null, null)).toBeDefined();
    });
});
