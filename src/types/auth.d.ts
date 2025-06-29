export interface JwtPayload {
    sub: number;
    email: string;
    role: string;
    tokenType?: 'access' | 'refresh';
}
