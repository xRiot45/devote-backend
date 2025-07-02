import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthWithWalletDto {
    @IsNotEmpty()
    @IsString()
    walletAddress: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;
}

export class AuthWithWalletResponse {
    isNewUser: boolean;
    accessToken: string;
    refreshToken: string;
}

export class CheckWalletDto {
    @IsNotEmpty()
    @IsString()
    walletAddress: string;
}

export class CheckWalletResponse {
    isRegistered: boolean;
}
