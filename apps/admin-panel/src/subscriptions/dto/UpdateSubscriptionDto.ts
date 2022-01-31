import { PartialType } from '@nestjs/swagger';
import { CreateSubscriptionDto } from './CreateSubscriptionDto';

export class UpdateSubscriptionDto extends PartialType(CreateSubscriptionDto) {}
