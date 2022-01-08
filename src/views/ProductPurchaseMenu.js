import View from '../common/View.js';
import { $ } from '../utils/index.js';
import validator from '../utils/validator.js';

export default class ProductPurchaseMenu extends View {
  constructor(props) {
    const defaultState = {
      amountOfCharge: 0,
    };
    super(props, defaultState);
  }

  chargeAmount() {
    const extraAmount = $('#charge-input', this.$el).value;
    if (!validator.validateAmountOfCharge(extraAmount)) {
      return;
    }

    const { amountOfCharge } = this.state;
    this.setState({
      amountOfCharge: amountOfCharge + Number(extraAmount),
    });
  }

  render() {
    const { amountOfCharge } = this.state;

    this.$el.innerHTML = `
      <div class="purchase-container">
        <h3>충전하기</h3>
        <div class="vending-machine-wrapper">
          <input type="number" name="charge-amount" id="charge-input" />
          <button id="charge-button">충전하기</button>
        </div>
        <p>충전 금액: ${amountOfCharge}원</p>
        
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
          <tbody id="product-inventory-container"></tbody>
        </table>
        
        <h3>잔돈</h3>
        <button id="coin-return-button">반환하기</button>
        <table class="cashbox-change">
          <colgroup>
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>동전</th>
              <th>개수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>500원</td>
              <td id="coin-500-quantity"></td>
            </tr>
            <tr>
              <td>100원</td>
              <td id="coin-100-quantity"></td>
            </tr>
            <tr>
              <td>50원</td>
              <td id="coin-50-quantity"></td>
            </tr>
            <tr>
              <td>10원</td>
              <td id="coin-10-quantity"></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  bindEvents() {
    this.$el.addEventListener('click', ({ target }) => {
      if (target.id === 'charge-button') {
        this.chargeAmount();
        return;
      }
    });
  }
}
