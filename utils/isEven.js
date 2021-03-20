const isEven = function (number) {
    if (parseInt(number)) {
        return number % 2 === 0
    }
    return false
}

module.exports = isEven