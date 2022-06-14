export interface InfoState {
    count: number;
    pages: number;
    currentPage: number;
    loading: boolean;
    error: string | null;
}

export interface Info {
    count: number;
    pages: number;
    next: string | null;
    prev: null | string;
}

