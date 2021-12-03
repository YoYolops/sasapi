class UnformattedDataError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Unformatted Data';
        this.statusCode = 422;
    }
}

export default UnformattedDataError;
