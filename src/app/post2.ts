export class Post2 {
    headline: string;
    text: string;
    hyperlink: string;
    author: string;
    startDate: string;
    endDate: string;

    constructor(headline: string, text: string, hyperlink: string, author: string, startDate: string, endDate: string) {
        this.headline = headline;
        this.text = text;
        this.hyperlink = hyperlink;
        this.author = author;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}