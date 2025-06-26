import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(private readonly entityManager: EntityManager) {}
}
