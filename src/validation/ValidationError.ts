

class ValidationError extends Error {
    errorMessage: string
    constructor(errorMessage: string) {
        super()
        this.errorMessage = errorMessage
    }
} 

export default ValidationError