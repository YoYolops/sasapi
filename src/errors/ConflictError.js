class ConflicError extends Error {
    constructor(message) {
        super(message)
        this.name = "Conflict"
        this.statusCode = 409
    }
}

export default ConflicError;