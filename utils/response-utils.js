function buildResponse(status, data, error) {
    return { status, data, error };
}

function successResponse(data) {
    return buildResponse("success", data, null);
}

function errorResponse(message, code) {
    return buildResponse("error", null, { message, code });
}

module.exports = { successResponse, errorResponse };
