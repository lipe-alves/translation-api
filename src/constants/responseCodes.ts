const responseCodes = {
    SUCCESS: "SUCCESS" as const,
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR" as const,
    CLIENT_ERROR: "CLIENT_ERROR" as const,
    MISSING_PARAM_ERROR: "MISSING_PARAM_ERROR" as const,
    INVALID_PARAM_ERROR: "INVALID_PARAM_ERROR" as const,
};

export default responseCodes;
export { responseCodes };
