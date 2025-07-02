import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthDto {
    @ApiProperty({
        example: '0x1234567890abcdef1234567890abcdef12345678',
        description: 'Wallet address of the user',
    })
    @IsNotEmpty()
    @IsString()
    readonly walletAddress: string;

    @ApiProperty({
        example: 'John Doe',
        description: 'Name of the user',
        required: false,
    })
    @IsOptional()
    @IsString()
    readonly name: string;

    @ApiProperty({
        example: 'john.doe@example.com',
        description: 'Email of the user',
        required: false,
    })
    @IsOptional()
    @IsEmail()
    readonly email: string;
}

export class AuthWithWalletResponse {
    isNewUser: boolean;
    accessToken: string;
    refreshToken: string;
}
