class AppError{
    public readonly message: string;
    public readonly statuscode: number;
    public readonly data?: any;

    constructor(message:string, statuscode = 400, data?:any){
        this.message = message;
        this.statuscode = statuscode;
        this.data = data;
    }
}

export default AppError;