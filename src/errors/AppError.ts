class AppError {
    public readonly StatusCode: number;

    public readonly message: string;

    constructor(message: string, StatusCode = 400) {
        this.StatusCode = StatusCode;
        this.message = message;
    }
}

export default AppError;
