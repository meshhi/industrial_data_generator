import moraleGenerator from "./data_tab_generators/MoraleGenerator.js"
import deliveryGenerator from "./data_tab_generators/DeliveryGenerator.js"
import financeGenerator from "./data_tab_generators/FinanceGenerator.js"

export default class DataGenerator {
    constructor() {
        this.resultTemplate = {
            'all': {},
            'pipes': {},
            'polycarbonate': {},
            'polyethylene': {},
            'organic_chemistry': {}
        }
    }

    generateData() {
        this.resultTemplate.all = this.generateMonthData();
        return this.resultTemplate;
    }

    generateMonthData() {
        const finance = financeGenerator.generateData();
        const delivery = deliveryGenerator.generateData();
        const morale = moraleGenerator.generateData();
        return {
            'finance': finance,
            'delivery_and_quality': delivery,
            'security_and_morale': morale,
        }
    }
}