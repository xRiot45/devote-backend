import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNumber, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';

export class ProposalDto {
    @IsString()
    @MaxLength(255)
    title: string;

    @IsString()
    description: string;

    @IsString()
    @MaxLength(100)
    category: string;

    @IsDate()
    @Type(() => Date)
    startTime: Date;

    @IsDate()
    @Type(() => Date)
    endTime: Date;

    @ValidateNested({ each: true })
    @Type(() => ProposalOptionDto)
    options: ProposalOptionDto[];
}

export class ProposalOptionDto {
    @IsString()
    @MaxLength(100)
    label: string;

    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsNumber()
    order: number;
}

export class ReorderProposalOptionsDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OptionOrderDto)
    options: OptionOrderDto[];
}

export class OptionOrderDto {
    @IsNumber()
    id: number;

    @IsNumber()
    order: number;
}
