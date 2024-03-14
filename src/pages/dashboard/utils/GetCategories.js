const GetCategories = (products) => {
    let categories = {}
    products.forEach(ele => {
        if (categories[ele.category]) categories[ele.category]++
        else categories[ele.category] = 1
    });
    return { productCategories: Object.keys(categories), productCategoryValues: Object.values(categories) }
}

export default GetCategories