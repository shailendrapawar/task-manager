


export const handleResponse = (res, statusCode, message, data = []) => {
    res.status(statusCode).json({
        data: data,
        success: true,
        message: message || null,
        data: data || null
    });
}


export const handleError = (res, statusCode, message) => {
    res.status(statusCode).json({ error: message });
}