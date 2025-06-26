import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
    @IsNotEmpty()
    @IsString()
    readonly walletAddress: string;

    @IsEmpty()
    @IsString()
    readonly name: string;

    @IsEmpty()
    @IsString()
    readonly email: string;
}
