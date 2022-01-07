import View from '../common/View.js';
import { $ } from '../utils/index.js';
import { COIN_INFO } from '../consts/coin.js';
import vendingMachineManageService from '../services/vendingMachineManageService.js';
import validator from '../utils/validator.js';
import vendingMachineStore, {
  ACTION_CHARGE_COINS,
} from '../store/vendingMachineStore.js';

export default class VendingMachineManageMenu extends View {
  constructor(props) {
    vendingMachineStore.subscribe(() => this.render());
    super(props);
  }

  chargeCoins() {
    const amount = $('#vending-machine-charge-input').value;

    if (!validator.validateVendingMachineAmount(amount)) {
      return;
    }

    vendingMachineStore.dispatch({
      type: ACTION_CHARGE_COINS,
      payload: amount,
    });
  }

  render() {
    const coins = vendingMachineStore.getters('coins');

    const totalAmount = vendingMachineManageService.computeTotalAmount(coins);
    const coinsBlock = Object.entries(coins)
      .map(([coinType, count]) => {
        return `
        <tr>
          <td>${COIN_INFO[coinType].text}</td>
          <td>${count}개</td>
        </tr>
      `;
      })
      .join('');

    this.$el.innerHTML = `
      <h3>자판기 돈통 충전하기</h3>
      <div class="vending-machine-wrapper">
        <input type="number" name="vending-machine-charge-amount" id="vending-machine-charge-input" autoFocus/>
        <button id="vending-machine-charge-button" data-ref="charge-coin">충전하기</button>
      </div>
        <p>보유 금액: <span id="vending-machine-charge-amount">${totalAmount}</span>원</p>
        <h3>동전 보유 현황</h3>
        <table class="cashbox-remaining">
          <colgroup>
            <col/>
            <col/>
          </colgroup>
          <thead>
            <tr>
              <th>동전</th>
              <th>개수</th>
            </tr>
          </thead>
          <tbody>
            ${coinsBlock}
          </tbody>
        </table> 
      `;
  }

  bindEvents() {
    this.$el.addEventListener('click', ({ target }) => {
      if (target.getAttribute('data-ref') === 'charge-coin') {
        this.chargeCoins();
        return;
      }
    });
  }
}
