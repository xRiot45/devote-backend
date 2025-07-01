import { Controller, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { createMulterConfig } from 'src/configs/multer.config';
import { Proposal } from 'src/databases/entities/proposal.entity';
import { User } from 'src/databases/entities/user.entity';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ProposalDto } from './dto/proposal.dto';
import { ProposalsService } from './proposals.service';

@Controller('proposals')
export class ProposalsController {
    constructor(private readonly proposalsService: ProposalsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AnyFilesInterceptor(createMulterConfig('proposals-images')))
    public async create(
        @UploadedFiles() files: Express.Multer.File[],
        @Req() req: Request,
        @CurrentUser() user: User,
    ): Promise<ApiResponse<Proposal>> {
        const body = req.body;

        const parsedOptions = Object.keys(body)
            .filter((key) => key.startsWith('options['))
            .reduce((acc, key) => {
                const match = key.match(/options\[(\d+)\]\.(\w+)/);
                if (match) {
                    const index = Number(match[1]);
                    const field = match[2];
                    acc[index] = acc[index] || {};
                    acc[index][field] = body[key];
                }
                return acc;
            }, []);

        const proposalDto: ProposalDto = {
            title: body.title,
            description: body.description,
            category: body.category,
            startTime: new Date(body.startTime),
            endTime: new Date(body.endTime),
            options: parsedOptions.map((opt, i) => ({
                ...opt,
                order: Number(opt.order),
                image: files.find((f) => f.fieldname === `image_${i}`)?.filename,
            })),
        };

        return this.proposalsService.create(proposalDto, user, files);
    }
}
