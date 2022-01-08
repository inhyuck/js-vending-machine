import View from '../common/View.js';
import { $ } from '../utils/index.js';
import validator from '../utils/validator.js';
import vendingMachineStore, {
  ACTION_ADD_PRODUCT,
} from '../store/vendingMachineStore.js';

/**
 * @typedef {Object} Product
 * @property {string} name
 * @property {number} price
 * @property {number} quantity
 */

export default class ProductManageMenu extends View {
  constructor(props) {
    vendingMachineStore.subscribe(() => this.render());
    super(props);
  }

  addProduct() {
    const name = $('#product-name-input').value;
    const price = Number($('#product-price-input').value);
    const quantity = Number($('#product-quantity-input').value);

    if (
      !validator.validateProductName(name) ||
      !validator.validateProductPrice(price) ||
      !validator.validateProductQuantity(quantity)
    ) {
      return;
    }

    const newProduct = { name, price, quantity };
    vendingMachineStore.dispatch({
      type: ACTION_ADD_PRODUCT,
      payload: newProduct,
    });
  }

  render() {
    const products = vendingMachineStore.getters('products');
    const productsBlock = products
      .map(
        ({ name, price, quantity }) => `
          <tr>
           <td>${name}</td> 
           <td>${price}</td> 
           <td>${quantity}개</td> 
          </tr>
        `
      )
      .join('');

    this.$el.innerHTML = `
      <h3>상품 추가하기</h3>
      <div class="product-container">
        <input type="text" id="product-name-input" placeholder="상품명"/>
        <input type="number" id="product-price-input" placeholder="가격"/>
        <input type="number" id="product-quantity-input" placeholder="수량"/>
        <button id="product-add-button" data-ref="add-product">추가하기</button>
      </div>
      <table class="product-inventory">
        <colgroup>
          <col style="width: 140px"/>
          <col style="width: 100px"/>
          <col style="width: 100px"/>
        </colgroup>
        <thead>
        <tr>
          <th>상품명</th>
          <th>가격</th>
          <th>수량</th>
        </tr>
        </thead>
        <tbody id="product-inventory-container">
          ${productsBlock} 
        </tbody>
      </table>
    `;
  }

  bindEvents() {
    this.$el.addEventListener('click', ({ target }) => {
      if (target.getAttribute('data-ref') === 'add-product') {
        this.addProduct();
        return;
      }
    });
  }
}
