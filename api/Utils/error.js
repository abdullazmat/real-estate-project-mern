export const errorHandler = (statuscode, message) => {
    const error = new Error(message);
    error.statuscode = statuscode;
    return error;
};
