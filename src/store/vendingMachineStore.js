import Store from './index.js';

export const ACTION_ADD_PRODUCT = 'ACTION_ADD_PRODUCT';

function addProduct(originProducts, newProduct) {
  const originProductIndex = originProducts.findIndex(
    ({ name }) => name === newProduct.name
  );

  if (originProductIndex > -1) {
    originProducts.splice(originProductIndex, 1, newProduct);
  } else {
    originProducts.push(newProduct);
  }

  return originProducts;
}

class VendingMachineStore extends Store {
  constructor(props) {
    super({ name: 'VendingMachineStore', ...props });
  }

  reducer(state, action) {
    switch (action.type) {
      case ACTION_ADD_PRODUCT:
        return {
          products: addProduct(state.products, action.payload),
        };
      default:
        return state;
    }
  }
}

const defaultState = {
  /**
   * @type {Product}
   */
  products: [],
};

export default new VendingMachineStore({ defaultState });
