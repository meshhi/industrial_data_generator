class FinanceGenerator {
    constructor() {
        this.structure = {
            "revenue": 0,
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

    generateData() {
        return this.structure;
    }
}

export default new FinanceGenerator();