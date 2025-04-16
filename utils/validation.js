function validationRequest(value, fieldName) {
    if (!value) throw new Error(`${fieldName} wajib diisi`);
    
    const parsedValue = parseInt(value);
    if (isNaN(parsedValue)) throw new Error(`${fieldName} harus berupa angka`);

    return parsedValue;
}

function blankValidationRequest(value, fieldName) {
    if (!value) {
        throw new Error (`${fieldName} Harus Di isi `)
    } else {
        return value
    }
}


module.exports ={
    validationRequest,
    blankValidationRequest
}