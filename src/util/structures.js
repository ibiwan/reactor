export const sum = (a, b) => a + b

export const fold_fields = (objects, oper = sum, init = 0) => {
    const result = {}
    const accum = obj =>
        Object.keys(obj).forEach(key => {
            result[key] = result[key] ?? init
            result[key] = oper(result[key], obj[key])
        })
    objects.forEach(accum)
    return result
}

/*
    example:
    fold_fields(
        [
            {a: 2, b:  3      },
            {      b: 5, c: 10}
        ],
        sum,
        0)
    --> {a: 2, b: 8, c: 10}
*/