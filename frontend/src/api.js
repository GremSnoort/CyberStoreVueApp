const endpoint = 'http://localhost:8090'
const target_userlogin = '/user/login'
const target_orderplace = '/order/place'
const target_categories = '/categories' //'/api/category/'
const target_category = '/category/list/' //'/api/category/'
//const target_subcategory = '/api/subcategory/'
const target_products = '/product/get/' //'/api/products/'

function buildPath(target) {
    let ep = endpoint
    return ep.concat('/', target)
}

function makeStruct(keys) {
    if (!keys) return null;
    const k = keys.split(', ');
    const count = k.length;

    /** @constructor */
    function constructor() {
        for (let i = 0; i < count; i++) this[k[i]] = arguments[i];
    }
    return constructor;
}

async function userLogin(credentials) {
    let ep = endpoint
    const remote = ep.concat('', `${target_userlogin}?username=${credentials.email}&password=${credentials.password}`)
    console.log(remote)
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
        },
    };
    const response = await fetch(remote, requestOptions)
    return response.json();
}

async function placeOrder(jsonbody, accessToken) {
    let ep = endpoint
    const remote = ep.concat('', target_orderplace)
    console.log(remote)
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
            "Authorization": `Bearer ${accessToken}`
        },
        body: jsonbody,
    };
    const response = await fetch(remote, requestOptions)
    console.log(response)
    return response.json();
}

async function getCategories() {
    let ep = endpoint
    const remote = ep.concat('', target_categories)
    console.log(remote)
    const response = await fetch(remote)
    return response.json();
}

async function getCategory(id) {
    let ep = endpoint
    const remote = ep.concat('', `${target_category}${id}`)
    console.log(remote)
    const response = await fetch(remote)
    return response.json();
}

async function getProduct(id) {
    let ep = endpoint
    const response = await fetch(ep.concat('', `${target_products}${id}`))
    return response.json();
}

export {buildPath, makeStruct, userLogin, placeOrder, getCategories, getCategory, getProduct};
