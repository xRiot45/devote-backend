import { diskStorage } from 'multer';
import { extname } from 'path';

export function createMulterConfig(destinationFolder: string) {
    return {
        storage: diskStorage({
            destination: `./uploads/${destinationFolder}`,
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                cb(null, `${uniqueSuffix}${ext}`);
            },
        }),
        fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                cb(null, true);
            } else {
                cb(new Error('Only JPEG and PNG files are allowed!'), false);
            }
        },
        limits: {
            fileSize: 5 * 1024 * 1024, // 5MB
        },
    };
}
