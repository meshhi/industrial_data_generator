import generateYearMonthByDaysStructure from '../utils/generateYearMonthByDaysStructure.js';
import mappers from '../utils/mappers.js';

class FinanceGenerator {
    constructor() {
        this.structure = {
            "revenue": Math.floor(Math.random() * 1000000),
            "profit": 0,
            "EBITDA": 0,
            "expenses": 0,
            "revenue_consolidated": {
                "plan": 0,
                "fact": 0,
            },
            "profit_consolidated": {
                "EBITDA": 0,
                "profit": 0,
                "profitability": 0,
                "profitability_month_detalized": 0
            },
            "expenses_consolidated": {
                "plan": 0,
                "fact": 0
            },
            "revenue_cost_ratio": {
                "left_values": 0,
                "right_values": 0,
                "data": 0,
                "links": 0
            },
            "revenue_diff": 0,
            "revenue_diff_color": 2,
            "profit_diff": 0,
            "profit_diff_color": 2,
            "EBITDA_diff": 0,
            "EBITDA_diff_color": 2,
            "expenses_diff": 0,
            "expenses_diff_color": 2
        }
    }

    generateData(custom, type, year, month) {
        this.structure.revenue_consolidated.plan = generateYearMonthByDaysStructure(year, month)
        this.structure.revenue_consolidated.fact = generateYearMonthByDaysStructure(year, month)
        this.structure.profit_consolidated.EBITDA = generateYearMonthByDaysStructure(year, month)
        this.structure.profit_consolidated.profit = generateYearMonthByDaysStructure(year, month)
        // 
        this.structure.profit_consolidated.profitability = {
            1: 1,
            2: 3,
            3: 5,
            4: 7,
            5: 9,
            6: 11,
            7: 13,
            8: 15,
            9: 17,
            10: 19,
            11: 21,
            12: 23,
        }
        // 
        this.structure.profit_consolidated.profitability_month_detalized = generateYearMonthByDaysStructure(year, month)
        this.structure.expenses_consolidated.plan = generateYearMonthByDaysStructure(year, month)
        this.structure.expenses_consolidated.fact = generateYearMonthByDaysStructure(year, month)

        this.generateSankeyData();
        
        return this.structure;
    }

    generateSankeyLinks(custom, count) {
        const result = [];
        for (let i = 1; i <= count; i++) {
            result.push({
                "source": mappers.sankeyLeftNames[0],
                "target": mappers.sankeyRightNames[0],
                "value": Math.round(Math.random())
            });
        }
        return result;
    }

    generateSankeyData(custom, type, year, month) {
        this.structure.revenue_cost_ratio.left_values = [0, 0, 0, 0];
        this.structure.revenue_cost_ratio.right_values = [0, 0, 0, 0];
        this.structure.revenue_cost_ratio.data = [...mappers.sankeyLeftNames, ...mappers.sankeyRightNames];
        this.structure.revenue_cost_ratio.links = this.generateSankeyLinks(null, 16);
    }
}

export default FinanceGenerator;