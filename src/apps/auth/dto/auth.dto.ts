import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
    @IsNotEmpty()
    @IsString()
    readonly walletAddress: string;

    @IsString()
    readonly name: string;

    @IsString()
    readonly email: string;
}
