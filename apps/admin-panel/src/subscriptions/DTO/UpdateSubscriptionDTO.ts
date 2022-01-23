import { PartialType } from '@nestjs/swagger';
import { CreateSubscriptionDTO } from './CreateSubscriptionDTO';

export class UpdateSubscriptionDTO extends PartialType(CreateSubscriptionDTO) {}
