export default (value) => {
    // try to parse value if is not Date
    if(!(value instanceof Date)) {
        value = Date.parse(value)
        if (!value) {
            return ''
        }

    }
    
    
    return value.toLocaleString('fi-FI')
}