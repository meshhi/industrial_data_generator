import moraleGenerator from "./data_tab_generators/MoraleGenerator.js"
import deliveryGenerator from "./data_tab_generators/DeliveryGenerator.js"
import financeGenerator from "./data_tab_generators/FinanceGenerator.js"
import mappers from "./utils/mappers.js"

export default class DataGenerator {
    constructor() {
        this.resultTemplate = {
            'all': {},
            'pipes': {},
            'polycarbonate': {},
            'polyethylene': {},
            'organic_chemistry': {}
        }
        this.yearStart = 2021;
        this.yearEnd = 2023;
    }

    generateData() {
        for (let type of mappers.industrialTypes) {
            for (let year = this.yearStart; year < this.yearEnd; year++) {
                if (!this.resultTemplate[type][year]) {
                    this.resultTemplate[type][year] = {};
                }
                for (let month = 1; month <= 12; month++) {
                    if (!this.resultTemplate[type][year][month]) {
                        this.resultTemplate[type][year][month] = {};
                    }
                    this.resultTemplate[type][year][month] = this.generateMonthData()
                }
            }
        }
        return this.resultTemplate;
    }

    generateMonthData() {
        const finance = financeGenerator.generateData();
        const delivery = deliveryGenerator.generateData();
        const morale = moraleGenerator.generateData();
        const result = {
            'finance': finance,
            'delivery_and_quality': delivery,
            'security_and_morale': morale,
        }
        return result
    }
}