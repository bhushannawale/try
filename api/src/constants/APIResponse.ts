
export class APIResponse<T> {

    private statusCode: number;
    private data?: T;
    private error?: T;
    private message?: string;

    public constructor(statusCode: number, data?: T, error?: T, message?: string) {

        this.statusCode =   statusCode;
        this.data       =   data;
        this.error      =   error;
        this.message    =   message;

    }


}
