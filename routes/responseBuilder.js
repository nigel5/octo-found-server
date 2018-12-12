// The methods in this file are used to format api responses
export const success = (data) => {
    return {
        'data': data
    }
};

export const error = (error) => {
    return {
        'error': error
    }
};