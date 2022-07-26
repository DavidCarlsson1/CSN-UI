export interface ApiResponse {
    messages: {
        shortId: number;
        headline: string;
        text: string;
        hyperlink: string;
        author: string;
        startDate: string;
        endDate: string;
        publishingDate: string;
        logo: string;
    }[];
}