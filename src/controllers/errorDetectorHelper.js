import ConflicError from '../errors/ConflictError.js';
import NotFoundError from '../errors/NotFoundError.js';
import UnformattedDataError from '../errors/UnformattedDataError.js';

function errorIsKnown(error) {
    if (error instanceof ConflicError
       || error instanceof NotFoundError
       || error instanceof UnformattedDataError) {
        return true;
    }
    return false;
}

export default errorIsKnown;
