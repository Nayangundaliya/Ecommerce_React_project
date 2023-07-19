
const filterReducer = (state, action) => {
    switch (action.type) {
        case "LOAD_FILTER_PRODUCT":

            let priceArr = action.payload.map((curElem)=> curElem.selling_price)
            let maxPrice = Math.max(...priceArr)
            
            return {
                ...state,
                filter_products: [...action.payload],
                all_products: [...action.payload],
                filters:{...state.filters, maxPrice, price:maxPrice},
            }
        
        case "SET_GRID_VIEW":
            return {
                ...state,
                grid_view: true,
            };

        case "SET_LIST_VIEW":
            return {
                ...state,
                grid_view: false,
            };
        
        case "GET_SORT_VALUE":
            return {
                ...state,
                sorting_value: action.payload,
            }
        
        case "SORTING_PRODUCTS":
            let newSortData;
            let tempSortProduct = [...action.payload];

            if (state.sorting_value === "lowest") {
                const sortingProduct = (a, b) => {
                    return a.selling_price - b.selling_price;
                };

                newSortData = tempSortProduct.sort(sortingProduct);
            }

            if (state.sorting_value === "heighest") {
                const sortingProduct = (a, b) => {
                    return b.selling_price - a.selling_price;
                };

                newSortData = tempSortProduct.sort(sortingProduct);
            }

            if (state.sorting_value === "a-z") {
                newSortData = tempSortProduct.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );    
            }

            if (state.sorting_value === "z-a") {
                newSortData = tempSortProduct.sort((a, b) =>
                    b.name.localeCompare(a.name)
                );
            }

            return {
                ...state,
                filter_products:newSortData,
            }
        
        case "UPDATE_FILTER_VALUE":
            const { name, value } = action.payload;

            return {
                ...state,
                filters: {
                    ...state.filters,
                    [name]: value,
                },
            };

        
        case "FILTER_PRODUCTS": {

            let { all_products } = state;
            let tempFilterProduct = [...all_products];

            const { text, category, color, selling_price } = state.filters;
            if (text) {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.name.toLowerCase().includes(text.toLowerCase());
                });
            }

            if (category !== "all") {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.category === category;
                })
            }

            if (color !== "all") {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.colors.includes(color);
                })
            }

            if (selling_price) {
                tempFilterProduct = tempFilterProduct.filter((curElem) => curElem.selling_price <= selling_price);
            }

            return {
                ...state,
                filter_products: tempFilterProduct,
            }

        }
            
        case "CLEAR_FILTERS":
            return {
                ...state,
                filters: {
                    ...state.filters,
                    text: "",
                    category: "all",
                    color: "all",
                    maxPrice: 0,
                    price: 0,
                    minPrice: 0,
                }
            }

        default:
            return state;
    }
}

export default filterReducer;