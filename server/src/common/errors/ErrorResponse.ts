export class ErrorResponse {
    url: string;
    errorCode: number;
    devMessage: string;
    data: any;

    constructor(url: string, devMessage: string, errorCode: number, data: any) {
        this.url = url;
        this.devMessage = devMessage;
        this.errorCode = errorCode;
        this.data = data;
    }
}
