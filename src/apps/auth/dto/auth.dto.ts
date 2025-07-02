import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthDto {
    @IsNotEmpty()
    @IsString()
    readonly walletAddress: string;

    @IsOptional()
    @IsString()
    readonly name: string;

    @IsOptional()
    @IsEmail()
    readonly email: string;
}

export class AuthWithWalletResponse {
    isNewUser: boolean;
    accessToken: string;
    refreshToken: string;
}
