declare global {
    export interface PaginationMeta {
        totalItems: number;
        itemCount: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
    }

    export interface PaginationLinks {
        first: string;
        previous: string | null;
        next: string | null;
        last: string;
    }

    export interface PaginatedData<T> {
        items: T[];
        meta: PaginationMeta;
        links: PaginationLinks;
    }

    export interface ApiResponse<T> {
        readonly success: boolean;
        readonly message: string;
        readonly data: T | PaginatedData<T>;
    }
}

export {};
