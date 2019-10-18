export function getParams(search, sort) {
    if (isEmpty(search) && isEmpty(sort)) {
        return ``;
    } else if (!isEmpty(search) && !isEmpty(sort)) {
        return `?search=${search}&sort=${sort}`;
    } else if (isEmpty(search) && !isEmpty(sort)) {
        return `?sort=${sort}`;
    } else if (!isEmpty(search) && isEmpty(sort)) {
        return `?search=${search}`;
    }
}

function isEmpty(param) {
    return param === undefined || param.length === 0;
}