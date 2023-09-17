import generateYearMonthByDaysStructure from '../utils/generateYearMonthByDaysStructure.js';
import howMuchDays from '../utils/howMuchDays.js';
import mappers from '../utils/mappers.js';

class FinanceGenerator {
    static yearPlanRevenue = {};
    static yearFactRevenue = {};
    static yearPlanRevenueSummaryValue = {};
    static yearFactRevenueSummaryValue = {};

    static yearPlanEBITDA = {};
    static yearFactEBITDA = {};
    static yearPlanEBITDASummaryValue = {};
    static yearFactEBITDASummaryValue = {};

    static yearPlanProfit = {};
    static yearFactProfit = {};
    static yearPlanProfitSummaryValue = {};
    static yearFactProfitSummaryValue = {};

    static yearFactProfitability = {};
    static yearFactProfitabilitySummaryValue = {};
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

    generateData(custom, type, year, month) {
        // REVENUE
        // PLAN
        if (!FinanceGenerator.yearPlanRevenue[type]) {
            FinanceGenerator.yearPlanRevenue[type] = {};
        }
        if (!FinanceGenerator.yearPlanRevenueSummaryValue[type]) {
            FinanceGenerator.yearPlanRevenueSummaryValue[type] = {};
        }
        if (!FinanceGenerator.yearPlanRevenue[type][year]) {
            FinanceGenerator.yearPlanRevenue[type][year] = generateYearMonthByDaysStructure(year, month)
            FinanceGenerator.yearPlanRevenueSummaryValue[type][year] = {};
            for (let month in FinanceGenerator.yearPlanRevenue[type][year]) {
                for (let day in FinanceGenerator.yearPlanRevenue[type][year][month]) {
                    let currentDayValue = Math.round(Math.random() * (500-300) + 300);
                    FinanceGenerator.yearPlanRevenue[type][year][month][day] = currentDayValue;
                    if (!FinanceGenerator.yearPlanRevenueSummaryValue[type][year][month]) {
                        FinanceGenerator.yearPlanRevenueSummaryValue[type][year][month] = 0;
                    }
                    FinanceGenerator.yearPlanRevenueSummaryValue[type][year][month] += currentDayValue;
                }
            }
        }
        // FACT
        if (!FinanceGenerator.yearFactRevenue[type]) {
            FinanceGenerator.yearFactRevenue[type] = {};
        }
        if (!FinanceGenerator.yearFactRevenueSummaryValue[type]) {
            FinanceGenerator.yearFactRevenueSummaryValue[type] = {};
        }
        if (!FinanceGenerator.yearFactRevenue[type][year]) {
            FinanceGenerator.yearFactRevenue[type][year] = generateYearMonthByDaysStructure(year, month)
            FinanceGenerator.yearFactRevenueSummaryValue[type][year] = {};
            for (let month in FinanceGenerator.yearFactRevenue[type][year]) {
                for (let day in FinanceGenerator.yearFactRevenue[type][year][month]) {
                    let currentDayValue = Math.round(Math.random() * (500-300) + 300);
                    const currentDate = new Date();
                    const currentYear = currentDate.getFullYear();
                    const currentMonth = currentDate.getMonth() + 1;
                    const currentDay = currentDate.getDate();
                    if ((year > currentYear) || ((year == currentYear) && (month > currentMonth)) || ((year == currentYear) && (month == currentMonth) && (day > currentDay))) {
                        currentDayValue = 0;
                    }
                    FinanceGenerator.yearFactRevenue[type][year][month][day] = currentDayValue;
                    if (!FinanceGenerator.yearFactRevenueSummaryValue[type][year][month]) {
                        FinanceGenerator.yearFactRevenueSummaryValue[type][year][month] = 0;
                    }
                    FinanceGenerator.yearFactRevenueSummaryValue[type][year][month] += currentDayValue;
                }
            }
        }
        this.structure.revenue_consolidated.plan = FinanceGenerator.yearPlanRevenue[type][year];
        this.structure.revenue_consolidated.fact = FinanceGenerator.yearFactRevenue[type][year];
        this.structure.revenue = FinanceGenerator.yearFactRevenueSummaryValue[type][year][month];

        // EBITDA
        // PLAN
        if (!FinanceGenerator.yearPlanEBITDA[type]) {
            FinanceGenerator.yearPlanEBITDA[type] = {};
        }
        if (!FinanceGenerator.yearPlanEBITDASummaryValue[type]) {
            FinanceGenerator.yearPlanEBITDASummaryValue[type] = {};
        }
        if (!FinanceGenerator.yearPlanEBITDA[type][year]) {
            FinanceGenerator.yearPlanEBITDA[type][year] = generateYearMonthByDaysStructure(year, month)
            FinanceGenerator.yearPlanEBITDASummaryValue[type][year] = {};
            for (let month in FinanceGenerator.yearPlanEBITDA[type][year]) {
                for (let day in FinanceGenerator.yearPlanEBITDA[type][year][month]) {
                    let revenueVal = FinanceGenerator.yearPlanRevenue[type][year][month][day];
                    let currentDayValue = Math.round(Math.random() * (revenueVal-(revenueVal*0,3)) + (revenueVal*0,3));
                    FinanceGenerator.yearPlanEBITDA[type][year][month][day] = currentDayValue;
                    if (!FinanceGenerator.yearPlanEBITDASummaryValue[type][year][month]) {
                        FinanceGenerator.yearPlanEBITDASummaryValue[type][year][month] = 0;
                    }
                    FinanceGenerator.yearPlanEBITDASummaryValue[type][year][month] += currentDayValue;
                }
            }
        }
        // FACT
        if (!FinanceGenerator.yearFactEBITDA[type]) {
            FinanceGenerator.yearFactEBITDA[type] = {};
        }
        if (!FinanceGenerator.yearFactEBITDASummaryValue[type]) {
            FinanceGenerator.yearFactEBITDASummaryValue[type] = {};
        }
        if (!FinanceGenerator.yearFactEBITDA[type][year]) {
            FinanceGenerator.yearFactEBITDA[type][year] = generateYearMonthByDaysStructure(year, month)
            FinanceGenerator.yearFactEBITDASummaryValue[type][year] = {};
            for (let month in FinanceGenerator.yearFactEBITDA[type][year]) {
                for (let day in FinanceGenerator.yearFactEBITDA[type][year][month]) {
                    let revenueVal = FinanceGenerator.yearFactRevenue[type][year][month][day];
                    let currentDayValue = Math.round(Math.random() * (revenueVal-(revenueVal*0,3)) + (revenueVal*0,3));
                    const currentDate = new Date();
                    const currentYear = currentDate.getFullYear();
                    const currentMonth = currentDate.getMonth() + 1;
                    const currentDay = currentDate.getDate();
                    
                    if ((year > currentYear) || ((year == currentYear) && (month > currentMonth)) || ((year == currentYear) && (month == currentMonth) && (day > currentDay))) {
                        currentDayValue = 0;
                    }
                    FinanceGenerator.yearFactEBITDA[type][year][month][day] = currentDayValue;
                    if (!FinanceGenerator.yearFactEBITDASummaryValue[type][year][month]) {
                        FinanceGenerator.yearFactEBITDASummaryValue[type][year][month] = 0;
                    }
                    FinanceGenerator.yearFactEBITDASummaryValue[type][year][month] += currentDayValue;
                }
            }
        }
        this.structure.profit_consolidated.EBITDA = FinanceGenerator.yearFactEBITDA[type][year];
        this.structure.EBITDA = FinanceGenerator.yearFactEBITDASummaryValue[type][year][month];


        // PROFIT
        // PLAN
        if (!FinanceGenerator.yearPlanProfit[type]) {
            FinanceGenerator.yearPlanProfit[type] = {};
        }
        if (!FinanceGenerator.yearPlanProfitSummaryValue[type]) {
            FinanceGenerator.yearPlanProfitSummaryValue[type] = {};
        }
        if (!FinanceGenerator.yearPlanProfit[type][year]) {
            FinanceGenerator.yearPlanProfit[type][year] = generateYearMonthByDaysStructure(year, month)
            FinanceGenerator.yearPlanProfitSummaryValue[type][year] = {};
            for (let month in FinanceGenerator.yearPlanProfit[type][year]) {
                for (let day in FinanceGenerator.yearPlanProfit[type][year][month]) {
                    let revenueVal = FinanceGenerator.yearPlanEBITDA[type][year][month][day];
                    let currentDayValue = Math.round(Math.random() * (revenueVal-(revenueVal*0,3)) + (revenueVal*0,3));
                    FinanceGenerator.yearPlanProfit[type][year][month][day] = currentDayValue;
                    if (!FinanceGenerator.yearPlanProfitSummaryValue[type][year][month]) {
                        FinanceGenerator.yearPlanProfitSummaryValue[type][year][month] = 0;
                    }
                    FinanceGenerator.yearPlanProfitSummaryValue[type][year][month] += currentDayValue;
                }
            }
        }
        // FACT
        if (!FinanceGenerator.yearFactProfit[type]) {
            FinanceGenerator.yearFactProfit[type] = {};
        }
        if (!FinanceGenerator.yearFactProfitSummaryValue[type]) {
            FinanceGenerator.yearFactProfitSummaryValue[type] = {};
        }
        if (!FinanceGenerator.yearFactProfitability[type]) {
            FinanceGenerator.yearFactProfitability[type] = {};
        }
        if (!FinanceGenerator.yearFactProfitabilitySummaryValue[type]) {
            FinanceGenerator.yearFactProfitabilitySummaryValue[type] = {};
        }
        if (!FinanceGenerator.yearFactProfit[type][year]) {
            FinanceGenerator.yearFactProfit[type][year] = generateYearMonthByDaysStructure(year, month)
            FinanceGenerator.yearFactProfitSummaryValue[type][year] = {};

            FinanceGenerator.yearFactProfitability[type][year] = generateYearMonthByDaysStructure(year, month)
            FinanceGenerator.yearFactProfitabilitySummaryValue[type][year] = {};

            for (let month in FinanceGenerator.yearFactProfit[type][year]) {
                for (let day in FinanceGenerator.yearFactProfit[type][year][month]) {
                    let revenueVal = FinanceGenerator.yearFactEBITDA[type][year][month][day];
                    let currentDayValue = Math.round(Math.random() * (revenueVal-(revenueVal*0,3)) + (revenueVal*0,3));
                    const currentDate = new Date();
                    const currentYear = currentDate.getFullYear();
                    const currentMonth = currentDate.getMonth() + 1;
                    const currentDay = currentDate.getDate();
                    
                    if ((year > currentYear) || ((year == currentYear) && (month > currentMonth)) || ((year == currentYear) && (month == currentMonth) && (day > currentDay))) {
                        currentDayValue = 0;
                    }
                    FinanceGenerator.yearFactProfit[type][year][month][day] = currentDayValue;
                    if (!FinanceGenerator.yearFactProfitSummaryValue[type][year][month]) {
                        FinanceGenerator.yearFactProfitSummaryValue[type][year][month] = 0;
                    }
                    FinanceGenerator.yearFactProfitSummaryValue[type][year][month] += currentDayValue;

                    let profitabilityPercent = FinanceGenerator.yearFactProfit[type][year][month][day] / FinanceGenerator.yearFactRevenue[type][year][month][day] * 100;
                    if (!profitabilityPercent) {
                        profitabilityPercent = 0;
                    }
                    FinanceGenerator.yearFactProfitability[type][year][month][day] = profitabilityPercent;
                    if (!FinanceGenerator.yearFactProfitabilitySummaryValue[type][year][month]) {
                        FinanceGenerator.yearFactProfitabilitySummaryValue[type][year][month] = 0;
                    }
                    FinanceGenerator.yearFactProfitabilitySummaryValue[type][year][month] += profitabilityPercent/howMuchDays(year, month);
                }
            }
        }
        this.structure.profit_consolidated.profit = FinanceGenerator.yearFactProfit[type][year];
        this.structure.profit = FinanceGenerator.yearFactProfitSummaryValue[type][year][month];

        this.structure.profit_consolidated.profitability = FinanceGenerator.yearFactProfitabilitySummaryValue[type][year];
        this.structure.profit_consolidated.profitability_month_detalized = FinanceGenerator.yearFactProfitability[type][year];



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