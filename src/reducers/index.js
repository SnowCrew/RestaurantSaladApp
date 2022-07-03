const initialState = {
    menu: [],
    loading: true,
    error: false,
    items:[],
    total: 0   
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false,
                error: false
            };
        case 'MENU_REQUESTED':
            return {
                ...state,
                menu: state.menu,
                loading: true,
                error: false
            };
        case 'MENU_ERROR':
            return {
                ...state,
                menu: state.menu,
                loading: true,
                error: true
            };
        case "ITEM_ADD_TO_CART":
            const id = action.payload;

            const itemInd = state.items.findIndex(item => item.id === id);

            if (itemInd >= 0) {
                const elemInState = state.items.find(item => item.id === id);
                const newElem = {
                    ...elemInState,
                    counterIdentical: ++elemInState.counterIdentical
                }
                return {
                    ...state,
                    items: [
                        ...state.items.slice(0, itemInd),
                        newElem,
                        ...state.items.slice(itemInd + 1)
                    ],
                    total: state.total + newElem.price
                }
            }

            const item = state.menu.find(item => item.id === id);
            const newItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                id: item.id,
                counterIdentical: 1,
            }
            return {
                ...state,
                items: [
                    ...state.items,
                    newItem
                ],
                total: state.total + newItem.price
            };

        case "ITEM_REMOVE_FROM_CART":
            const idx = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === idx);
            const itemDel = state.items.find(item => item.id === idx);
            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemIndex),
                    ...state.items.slice(itemIndex+1)
                ],
                total: state.total - (itemDel.price * itemDel.counterIdentical)
            };

        case "ORDER_COMPLETED" :
            return {
                ...state,
                items: [],
                total: 0
            };
                            
        default: 
            return state;
    }
}

export default reducer;