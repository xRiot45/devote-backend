import { RoleEnum } from 'src/enums/role.enum';

export class UserResponse {
    id: number;
    walletAddress: string;
    name: string;
    email: string;
    role: string | RoleEnum;
}
