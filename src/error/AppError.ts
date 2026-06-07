export class AppError extends Error{
    public statusCode: number =400;
    
    constructor(message:string, statusCode: number =400){
        super(message);
        this.name = "AppError";
        this.statusCode= statusCode;
    }
}