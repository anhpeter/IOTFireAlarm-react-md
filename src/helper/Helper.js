const Helper = {
    strPad: function (value, length, c) {
        value = value + '';
        if (value) {
            return value.length >= length
                ? value
                : c.repeat(length - value.length) + value;
        }
        return value;
    }
}
export default Helper;