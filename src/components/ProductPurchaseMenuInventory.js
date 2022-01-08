import View from '../common/View.js';
import vendingMachineStore, {
  ACTION_PURCHASE_PRODUCT,
} from '../store/vendingMachineStore.js';

export default class ProductPurchaseMenuInventory extends View {
  constructor(props) {
    vendingMachineStore.subscribe(() => this.render());
    super(props);
  }

  purchaseProduct(productName) {
    const { amountOfCharge, subtractAmount } = this.props;
    const products = vendingMachineStore.getters('products');
    const { quantity, price } = products.find(
      ({ name }) => name === productName
    );

    if (quantity === 0) {
      alert('매진된 상품입니다.');
      return;
    }
    if (price > amountOfCharge) {
      alert('충전 금액이 부족합니다.');
      return;
    }

    const isSuccessSubtract = subtractAmount(price);
    if (isSuccessSubtract) {
      vendingMachineStore.dispatch({
        type: ACTION_PURCHASE_PRODUCT,
        payload: productName,
      });
    }
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
           <td>${
             quantity === 0
               ? '매진'
               : `<button data-ref="purchase-product" product-name="${name}">구매</button>`
           }</td> 
          </tr>
        `
      )
      .join('');

    this.$el.innerHTML = `
      <table class="product-inventory">
        <colgroup>
          <col style="width: 140px" />
          <col style="width: 100px" />
          <col style="width: 100px" />
          <col style="width: 100px" />
        </colgroup>
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
            <th>구매</th>
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
      if (target.getAttribute('data-ref') === 'purchase-product') {
        this.purchaseProduct(target.getAttribute('product-name'));
        return;
      }
    });
  }
}
