import Store from './index.js';
import { COIN_TYPE } from '../consts/coin.js';
import vendingMachineManageService from '../services/vendingMachineManageService.js';

export const ACTION_ADD_PRODUCT = 'ACTION_ADD_PRODUCT';
export const ACTION_CHARGE_COINS = 'ACTION_CHARGE_COINS';

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

function chargeCoins(originCoins, amount) {
  const newCoins = vendingMachineManageService.convertToCoins(amount);
  return vendingMachineManageService.mergeCoins(originCoins, newCoins);
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

      case ACTION_CHARGE_COINS:
        return {
          coins: chargeCoins(state.coins, action.payload),
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
  coins: {
    [COIN_TYPE.UNIT_500]: 0,
    [COIN_TYPE.UNIT_100]: 0,
    [COIN_TYPE.UNIT_50]: 0,
    [COIN_TYPE.UNIT_10]: 0,
  },
};

export default new VendingMachineStore({ defaultState });
