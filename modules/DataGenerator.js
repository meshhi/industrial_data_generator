import MoraleGenerator from "./data_tab_generators/MoraleGenerator.js"
import DeliveryGenerator from "./data_tab_generators/DeliveryGenerator.js"
import FinanceGenerator from "./data_tab_generators/FinanceGenerator.js"
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

    generateData(custom = null) {
        for (let type of mappers.industrialTypes) {
            for (let year = this.yearStart; year <= this.yearEnd; year++) {
                if (!this.resultTemplate[type][year]) {
                    this.resultTemplate[type][year] = {};
                }
                for (let month = 1; month <= 12; month++) {
                    if (!this.resultTemplate[type][year][month]) {
                        this.resultTemplate[type][year][month] = {};
                    }
                    this.resultTemplate[type][year][month] = this.generateMonthData(custom, type, year, month)
                }
            }
        }
        
        return this.resultTemplate;
    }

    generateMonthData(custom, type, year, month) {
        let financeGenerator = new FinanceGenerator();
        let deliveryGenerator = new DeliveryGenerator();
        let moraleGenerator = new MoraleGenerator();
        const finance = financeGenerator.generateData(null, type, year, month);
        const delivery = deliveryGenerator.generateData(null, type, year, month);
        const morale = moraleGenerator.generateData(null, type, year, month);
        const result = {
            'finance': finance,
            'delivery_and_quality': delivery,
            'security_and_morale': morale,
        }
        return result
    }

    sumDataByMonthsFilter(yearData) {
            let sumObj = {}
            const sumDataInObjects = (obj, iteration, isPercentage = false, isDays = false, lastDay = false) => {
                for (let key in obj) {
                    if (!sumObj[key]) {
                        sumObj[key] = 0
                    }
                    sumObj[key] += Number(obj[key].toFixed(2))
                }
                if (!isDays) {
                    if (iteration == 12) {
                        const sumObjCopy = JSON.parse(JSON.stringify(sumObj));
                        if (isPercentage) {
                            for (let key in sumObjCopy) {
                                sumObjCopy[key] = Number((sumObjCopy[key] / 12).toFixed(2))
                            }
                        }
                        sumObj = {}
                        return sumObjCopy
                    }
                } else {
                    if (iteration == lastDay) {
                        const sumObjCopy = JSON.parse(JSON.stringify(sumObj));
                        if (isPercentage) {
                            for (let key in sumObjCopy) {
                                sumObjCopy[key] = Number((sumObjCopy[key] / 12).toFixed(2))
                            }
                        }
                        sumObj = {}
                        return sumObjCopy
                    }
                }
            }
            let number = 0
            let fluidity = 0
            let addHours = 0
            let eventsTrainingEvents = 0
            let eventsWorkplaceImprovements = 0
            let eventsWelnessEvents = 0
            let eventsTrainingEventsDetalization = {}
            let eventsWorkplaceImprovementsDetalization = {}
            let eventssWelnessEventsDetalization = {}
            let employeeSatisfaction = {}
            let incidents = 0
            let incidentsMax = 0
            let incidentsAffected = 0
            let incidentsOutage = 0
            let incidentCategories = {}
            let equipT = {}
            let equipPE = {}
            let equipPK = {}
            let equipOX = {}
    
            for (let month in yearData) {
                number += yearData[month]['security_and_morale']['number']
                fluidity += yearData[month]['security_and_morale']['fluidity']
                addHours += yearData[month]['security_and_morale']['additional_shifts_hours']
                eventsTrainingEvents += yearData[month]['security_and_morale']['events']['training_events']
                eventsWorkplaceImprovements += yearData[month]['security_and_morale']['events']['workplace_improvements']
                eventsWelnessEvents += yearData[month]['security_and_morale']['events']['wellness_events']
    
                incidents += yearData[month]['security_and_morale']['incidents']
                incidentsMax += yearData[month]['security_and_morale']['incidents_max']
                incidentsAffected += yearData[month]['security_and_morale']['incidents_affected']
                incidentsOutage += yearData[month]['security_and_morale']['incidents_outage_hours']
    
            }
            fluidity = Number((fluidity/12).toFixed(2))
            for (let month in yearData) {
                eventsTrainingEventsDetalization = sumDataInObjects(yearData[month]['security_and_morale']['events_detalization']['training_events'], month)
            }
            for (let month in yearData) {
                eventsWorkplaceImprovementsDetalization = sumDataInObjects(yearData[month]['security_and_morale']['events_detalization']['workplace_improvements'], month)
            }
            for (let month in yearData) {
                eventssWelnessEventsDetalization = sumDataInObjects(yearData[month]['security_and_morale']['events_detalization']['wellness_events'], month)
            }
            for (let month in yearData) {
                employeeSatisfaction = sumDataInObjects(yearData[month]['security_and_morale']['employee_satisfaction'], month, true)
            }
            for (let month in yearData) {
                employeeSatisfaction = sumDataInObjects(yearData[month]['security_and_morale']['employee_satisfaction'], month, true)
            }
            for (let month in yearData) {
                incidentCategories = sumDataInObjects(yearData[month]['security_and_morale']['incident_categories'], month)
            }
            for (let month in yearData) {
                incidentCategories = sumDataInObjects(yearData[month]['security_and_morale']['incident_categories'], month)
            }
            for (let month in yearData) {
                equipT = sumDataInObjects(yearData[month]['security_and_morale']['equipment_lifetime']['T'], month, true)
            }
            for (let month in yearData) {
                equipPE = sumDataInObjects(yearData[month]['security_and_morale']['equipment_lifetime']['PE'], month, true)
            }
            for (let month in yearData) {
                equipPK = sumDataInObjects(yearData[month]['security_and_morale']['equipment_lifetime']['PK'], month, true)
            }
            for (let month in yearData) {
                equipOX = sumDataInObjects(yearData[month]['security_and_morale']['equipment_lifetime']['OX'], month, true)
            }
    
            const sec_n_morale_all = {
                "number": number,
                "fluidity": fluidity,
                "additional_shifts_hours": addHours,
                "events": {
                    "training_events": eventsTrainingEvents,
                    "workplace_improvements": eventsWorkplaceImprovements,
                    "wellness_events": eventsWelnessEvents
                },
                "events_detalization": {
                    "training_events": eventsTrainingEventsDetalization,
                    "workplace_improvements": eventsWorkplaceImprovementsDetalization,
                    "wellness_events": eventssWelnessEventsDetalization,
                },
                "employee_satisfaction": employeeSatisfaction,
                "incidents": incidents,
                "incidents_max": incidentsMax,
                "incident_categories": incidentCategories,
                "incidents_affected": incidentsAffected,
                "incidents_outage_hours": incidentsOutage,
                "equipment_lifetime": {
                    "Т": equipT,
                    "PE": equipPE,
                    "PK": equipPK,
                    "OX": equipOX
                },
                "number_diff_percent": 0,
                "number_diff_percent_color": 2,
                "fluidity_diff_percent": 0,
                "fluidity_diff_percent_color": 2,
                "additional_shifts_hours_diff_percent": 0,
                "additional_shifts_hours_diff_percent_color": 2,
            }
    
            let revenue = 0
            let profit = 0
            let EBITDA = 0
            let expenses = 0
            let revenueConsolidatedPlan = {}
            let revenueConsolidatedFact = {}
            let profitConsolidatedEBITDA = {}
            let revenueConsolidatedProfit = {}
            let currentProfitability = {}
            let currentProfitabilityMonth = {}
            let expensesConsolidatedPlan = {}
            let expensesConsolidatedFact = {}
    
            for (let month in yearData) {
                revenue += yearData[month]['finance']['revenue']
                profit += yearData[month]['finance']['profit']
                EBITDA += yearData[month]['finance']['EBITDA']
                expenses += yearData[month]['finance']['expenses']
            }
            expenses = expenses/12
            for (let month in yearData) {
                revenueConsolidatedPlan[month] = {}
                let lastDay = 0
                for (let day in yearData[month]['finance']['revenue_consolidated']['plan'][month]) {
                    lastDay = day
                }
                for (let day in yearData[month]['finance']['revenue_consolidated']['plan'][month]) {
                    revenueConsolidatedPlan[month] = sumDataInObjects(yearData[month]['finance']['revenue_consolidated']['plan'][month], day, false, true, lastDay)
                }
            }
    
            for (let month in yearData) {
                revenueConsolidatedFact[month] = {}
                let lastDay = 0
                for (let day in yearData[month]['finance']['revenue_consolidated']['fact'][month]) {
                    lastDay = day
                }
                for (let day in yearData[month]['finance']['revenue_consolidated']['fact'][month]) {
                    revenueConsolidatedFact[month] = sumDataInObjects(yearData[month]['finance']['revenue_consolidated']['fact'][month], day, false, true, lastDay)
                }
            }
            for (let month in yearData) {
                profitConsolidatedEBITDA[month] = {}
                let lastDay = 0
                for (let day in yearData[month]['finance']['profit_consolidated']['EBITDA'][month]) {
                    lastDay = day
                }
                for (let day in yearData[month]['finance']['profit_consolidated']['EBITDA'][month]) {
                    profitConsolidatedEBITDA[month] = sumDataInObjects(yearData[month]['finance']['profit_consolidated']['EBITDA'][month], day, false, true, lastDay)
                }
            }
            for (let month in yearData) {
                revenueConsolidatedProfit[month] = {}
                let lastDay = 0
                for (let day in yearData[month]['finance']['profit_consolidated']['profit'][month]) {
                    lastDay = day
                }
                for (let day in yearData[month]['finance']['profit_consolidated']['profit'][month]) {
                    revenueConsolidatedProfit[month] = sumDataInObjects(yearData[month]['finance']['profit_consolidated']['profit'][month], day, false, true, lastDay)
                }
            }
            for (let month in yearData) {
                currentProfitability = sumDataInObjects(yearData[month]['finance']['profit_consolidated']['profitability'], month, true)
            }
    
            for (let month in yearData) {
                currentProfitabilityMonth[month] = {}
                let lastDay = 0
                for (let day in yearData[month]['finance']['profit_consolidated']['profitability_month_detalized'][month]) {
                    lastDay = day
                }
                for (let day in yearData[month]['finance']['profit_consolidated']['profitability_month_detalized'][month]) {
                    currentProfitabilityMonth[month] = sumDataInObjects(yearData[month]['finance']['profit_consolidated']['profitability_month_detalized'][month], day, false, true, lastDay)
                }
            }
    
    
            for (let month in yearData) {
                expensesConsolidatedPlan[month] = {}
                let lastDay = 0
                for (let day in yearData[month]['finance']['expenses_consolidated']['plan'][month]) {
                    lastDay = day
                }
                for (let day in yearData[month]['finance']['expenses_consolidated']['plan'][month]) {
                    expensesConsolidatedPlan[month] = sumDataInObjects(yearData[month]['finance']['expenses_consolidated']['plan'][month], day, false, true, lastDay)
                }
            }
            for (let month in yearData) {
                expensesConsolidatedFact[month] = {}
                let lastDay = 0
                for (let day in yearData[month]['finance']['expenses_consolidated']['fact'][month]) {
                    lastDay = day
                }
                for (let day in yearData[month]['finance']['expenses_consolidated']['fact'][month]) {
                    expensesConsolidatedFact[month] = sumDataInObjects(yearData[month]['finance']['expenses_consolidated']['fact'][month], day, false, true, lastDay)
                }
            }
            let revenueCostRatioLeft = [0, 0, 0, 0]
            let revenueCostRatioRight = [0, 0, 0, 0]
            for (let month in yearData) {
                revenueCostRatioLeft[0] += yearData[month]['finance']['revenue_cost_ratio']['left_values'][0]
                revenueCostRatioLeft[1] += yearData[month]['finance']['revenue_cost_ratio']['left_values'][1]
                revenueCostRatioLeft[2] += yearData[month]['finance']['revenue_cost_ratio']['left_values'][2]
                revenueCostRatioLeft[3] += yearData[month]['finance']['revenue_cost_ratio']['left_values'][3]
    
                revenueCostRatioRight[0] += yearData[month]['finance']['revenue_cost_ratio']['right_values'][0]
                revenueCostRatioRight[1] += yearData[month]['finance']['revenue_cost_ratio']['right_values'][1]
                revenueCostRatioRight[2] += yearData[month]['finance']['revenue_cost_ratio']['right_values'][2]
                revenueCostRatioRight[3] += yearData[month]['finance']['revenue_cost_ratio']['right_values'][3]
    
            }
    
            // todo revenue_cost_ratio
            const finances_all = {
                "revenue": revenue,
                "profit": profit,
                "EBITDA": EBITDA,
                "expenses": expenses,
                "revenue_consolidated": {
                    "plan": revenueConsolidatedPlan,
                    "fact": revenueConsolidatedFact,
                },
                "profit_consolidated": {
                    "EBITDA": profitConsolidatedEBITDA,
                    "profit": revenueConsolidatedProfit,
                    "profitability": currentProfitability,
                    "profitability_month_detalized": currentProfitabilityMonth
                },
                "expenses_consolidated": {
                    "plan": expensesConsolidatedPlan,
                    "fact": expensesConsolidatedFact
                },
                // todo
                "revenue_cost_ratio": {
                    "left_values": revenueCostRatioLeft,
                    "right_values": revenueCostRatioRight,
                    "data": yearData[1]['finance']['revenue_cost_ratio']['data'],
                    "links": yearData[1]['finance']['revenue_cost_ratio']['links']
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
    
    
    
            let produced = 0
            let shipped = 0
            let defective = 0
            let producedConsolidatedPlan = {}
            let producedConsolidatedFact = {}
            let shippedConsolidatedPlan = {}
            let shippedConsolidatedFact = {}
            let requisitions = []
            for (let month in yearData) {
                produced += yearData[month]['delivery_and_quality']['produced']
                shipped += yearData[month]['delivery_and_quality']['shipped']
                defective += yearData[month]['delivery_and_quality']['defective']
            }
            defective = defective/12
            for (let month in yearData) {
                producedConsolidatedPlan[month] = {}
                let lastDay = 0
                for (let day in yearData[month]['delivery_and_quality']['produced_consolidated']['plan'][month]) {
                    lastDay = day
                }
                for (let day in yearData[month]['delivery_and_quality']['produced_consolidated']['plan'][month]) {
                    producedConsolidatedPlan[month] = sumDataInObjects(yearData[month]['delivery_and_quality']['produced_consolidated']['plan'][month], day, false, true, lastDay)
                }
            }
    
            for (let month in yearData) {
                producedConsolidatedFact[month] = {}
                let lastDay = 0
                for (let day in yearData[month]['delivery_and_quality']['produced_consolidated']['fact'][month]) {
                    lastDay = day
                }
                for (let day in yearData[month]['delivery_and_quality']['produced_consolidated']['fact'][month]) {
                    producedConsolidatedFact[month] = sumDataInObjects(yearData[month]['delivery_and_quality']['produced_consolidated']['fact'][month], day, false, true, lastDay)
                }
            }
    
            for (let month in yearData) {
                shippedConsolidatedPlan[month] = {}
                let lastDay = 0
                for (let day in yearData[month]['delivery_and_quality']['shipped_consolidated']['plan'][month]) {
                    lastDay = day
                }
                for (let day in yearData[month]['delivery_and_quality']['shipped_consolidated']['plan'][month]) {
                    shippedConsolidatedPlan[month] = sumDataInObjects(yearData[month]['delivery_and_quality']['shipped_consolidated']['plan'][month], day, false, true, lastDay)
                }
            }
    
            for (let month in yearData) {
                shippedConsolidatedFact[month] = {}
                let lastDay = 0
                for (let day in yearData[month]['delivery_and_quality']['shipped_consolidated']['fact'][month]) {
                    lastDay = day
                }
                for (let day in yearData[month]['delivery_and_quality']['shipped_consolidated']['fact'][month]) {
                    shippedConsolidatedFact[month] = sumDataInObjects(yearData[month]['delivery_and_quality']['shipped_consolidated']['fact'][month], day, false, true, lastDay)
                }
            }
    
            for (let month in yearData) {
                requisitions = [...requisitions, ...yearData[month]['delivery_and_quality']['requisitions']]
            }
    
            let regionsCount = 0; 
            let r1_1Sum = 0
            let r1_2Sum = 0
            let r1_3Sum = 0
            let r1__sum = 0
            for (let month in yearData) {
                if (regionsCount == 0) {
                    regionsCount = yearData[month]['delivery_and_quality']['map'].length
                }
                r1_1Sum += Number(yearData[month]['delivery_and_quality']['map'][0]['timeliness'])
                r1_2Sum += Number(yearData[month]['delivery_and_quality']['map'][0]['equipment'])
                r1_3Sum += Number(yearData[month]['delivery_and_quality']['map'][0]['quality'])
    
            }
            r1_1Sum = Number((r1_1Sum/regionsCount).toFixed(1))
            r1_2Sum = Number((r1_2Sum/regionsCount).toFixed(1))
            r1_3Sum = Number((r1_3Sum/regionsCount).toFixed(1))
            r1__sum = Number(((Number(r1_1Sum) + Number(r1_2Sum) + Number(r1_3Sum))/3).toFixed(1))
    
            let r2_1Sum = 0
            let r2_2Sum = 0
            let r2_3Sum = 0
            let r2__sum = 0
            for (let month in yearData) {
                if (regionsCount == 0) {
                    regionsCount = yearData[month]['delivery_and_quality']['map'].length
                }
                r2_1Sum += Number(yearData[month]['delivery_and_quality']['map'][1]['timeliness'])
                r2_2Sum += Number(yearData[month]['delivery_and_quality']['map'][1]['equipment'])
                r2_3Sum += Number(yearData[month]['delivery_and_quality']['map'][1]['quality'])
    
            }
            r2_1Sum = Number((r2_1Sum/regionsCount).toFixed(1))
            r2_2Sum = Number((r2_2Sum/regionsCount).toFixed(1))
            r2_3Sum = Number((r2_3Sum/regionsCount).toFixed(1))
            r2__sum = Number(((Number(r2_1Sum) + Number(r2_2Sum) + Number(r2_3Sum))/3).toFixed(1))
    
    
            let r3_1Sum = 0
            let r3_2Sum = 0
            let r3_3Sum = 0
            let r3__sum = 0
            for (let month in yearData) {
                if (regionsCount == 0) {
                    regionsCount = yearData[month]['delivery_and_quality']['map'].length
                }
                r3_1Sum += Number(yearData[month]['delivery_and_quality']['map'][2]['timeliness'])
                r3_2Sum += Number(yearData[month]['delivery_and_quality']['map'][2]['equipment'])
                r3_3Sum += Number(yearData[month]['delivery_and_quality']['map'][2]['quality'])
            }
            r3_1Sum = Number((r3_1Sum/regionsCount).toFixed(1))
            r3_2Sum = Number((r3_2Sum/regionsCount).toFixed(1))
            r3_3Sum = Number((r3_3Sum/regionsCount).toFixed(1))
            r3__sum = Number(((Number(r3_1Sum) + Number(r3_2Sum) + Number(r3_3Sum))/3).toFixed(1))
    
    
            let r4_1Sum = 0
            let r4_2Sum = 0
            let r4_3Sum = 0
            let r4__sum = 0
            for (let month in yearData) {
                if (regionsCount == 0) {
                    regionsCount = yearData[month]['delivery_and_quality']['map'].length
                }
                r4_1Sum += Number(yearData[month]['delivery_and_quality']['map'][3]['timeliness'])
                r4_2Sum += Number(yearData[month]['delivery_and_quality']['map'][3]['equipment'])
                r4_3Sum += Number(yearData[month]['delivery_and_quality']['map'][3]['quality'])
    
            }
            r4_1Sum = Number((r4_1Sum/regionsCount).toFixed(1))
            r4_2Sum = Number((r4_2Sum/regionsCount).toFixed(1))
            r4_3Sum = Number((r4_3Sum/regionsCount).toFixed(1))
            r4__sum = Number(((Number(r4_1Sum) + Number(r4_2Sum) + Number(r4_3Sum))/3).toFixed(1))
    
    
            let r5_1Sum = 0
            let r5_2Sum = 0
            let r5_3Sum = 0
            let r5__sum = 0
            for (let month in yearData) {
                if (regionsCount == 0) {
                    regionsCount = yearData[month]['delivery_and_quality']['map'].length
                }
                r5_1Sum += Number(yearData[month]['delivery_and_quality']['map'][4]['timeliness'])
                r5_2Sum += Number(yearData[month]['delivery_and_quality']['map'][4]['equipment'])
                r5_3Sum += Number(yearData[month]['delivery_and_quality']['map'][4]['quality'])
    
            }
            r5_1Sum = Number((r5_1Sum/regionsCount).toFixed(1))
            r5_2Sum = Number((r5_2Sum/regionsCount).toFixed(1))
            r5_3Sum = Number((r5_3Sum/regionsCount).toFixed(1))
            r5__sum = Number(((Number(r5_1Sum) + Number(r5_2Sum) + Number(r5_3Sum))/3).toFixed(1))
    
    
            let r6_1Sum = 0
            let r6_2Sum = 0
            let r6_3Sum = 0
            let r6__sum = 0
            for (let month in yearData) {
                if (regionsCount == 0) {
                    regionsCount = yearData[month]['delivery_and_quality']['map'].length
                }
                r6_1Sum += Number(yearData[month]['delivery_and_quality']['map'][5]['timeliness'])
                r6_2Sum += Number(yearData[month]['delivery_and_quality']['map'][5]['equipment'])
                r6_3Sum += Number(yearData[month]['delivery_and_quality']['map'][5]['quality'])
    
            }
            r6_1Sum = Number((r6_1Sum/regionsCount).toFixed(1))
            r6_2Sum = Number((r6_2Sum/regionsCount).toFixed(1))
            r6_3Sum = Number((r6_3Sum/regionsCount).toFixed(1))
            r6__sum = Number(((Number(r6_1Sum) + Number(r6_2Sum) + Number(r6_3Sum))/3).toFixed(1))
    
    
    
            let r7_1Sum = 0
            let r7_2Sum = 0
            let r7_3Sum = 0
            let r7__sum = 0
            for (let month in yearData) {
                if (regionsCount == 0) {
                    regionsCount = yearData[month]['delivery_and_quality']['map'].length
                }
                r7_1Sum += Number(yearData[month]['delivery_and_quality']['map'][6]['timeliness'])
                r7_2Sum += Number(yearData[month]['delivery_and_quality']['map'][6]['equipment'])
                r7_3Sum += Number(yearData[month]['delivery_and_quality']['map'][6]['quality'])
    
            }
            r7_1Sum = Number((r7_1Sum/regionsCount).toFixed(1))
            r7_2Sum = Number((r7_2Sum/regionsCount).toFixed(1))
            r7_3Sum = Number((r7_3Sum/regionsCount).toFixed(1))
            r7__sum = Number(((Number(r7_1Sum) + Number(r7_2Sum) + Number(r7_3Sum))/3).toFixed(1))
    
    
    
            let r8_1Sum = 0
            let r8_2Sum = 0
            let r8_3Sum = 0
            let r8__sum = 0
            for (let month in yearData) {
                if (regionsCount == 0) {
                    regionsCount = yearData[month]['delivery_and_quality']['map'].length
                }
                r8_1Sum += Number(yearData[month]['delivery_and_quality']['map'][7]['timeliness'])
                r8_2Sum += Number(yearData[month]['delivery_and_quality']['map'][7]['equipment'])
                r8_3Sum += Number(yearData[month]['delivery_and_quality']['map'][7]['quality'])
    
            }
            r8_1Sum = Number((r8_1Sum/regionsCount).toFixed(1))
            r8_2Sum = Number((r8_2Sum/regionsCount).toFixed(1))
            r8_3Sum = Number((r8_3Sum/regionsCount).toFixed(1))
            r8__sum = Number(((Number(r8_1Sum) + Number(r8_2Sum) + Number(r8_3Sum))/3).toFixed(1))
    
    
    
            let r9_1Sum = 0
            let r9_2Sum = 0
            let r9_3Sum = 0
            let r9__sum = 0
            for (let month in yearData) {
                if (regionsCount == 0) {
                    regionsCount = yearData[month]['delivery_and_quality']['map'].length
                }
                r9_1Sum += Number(yearData[month]['delivery_and_quality']['map'][8]['timeliness'])
                r9_2Sum += Number(yearData[month]['delivery_and_quality']['map'][8]['equipment'])
                r9_3Sum += Number(yearData[month]['delivery_and_quality']['map'][8]['quality'])
    
            }
            r9_1Sum = Number((r9_1Sum/regionsCount).toFixed(1))
            r9_2Sum = Number((r9_2Sum/regionsCount).toFixed(1))
            r9_3Sum = Number((r9_3Sum/regionsCount).toFixed(1))
            r9__sum = Number(((Number(r9_1Sum) + Number(r9_2Sum) + Number(r9_3Sum))/3).toFixed(1))
    
    
    
            let r10_1Sum = 0
            let r10_2Sum = 0
            let r10_3Sum = 0
            let r10__sum = 0
            for (let month in yearData) {
                if (regionsCount == 0) {
                    regionsCount = yearData[month]['delivery_and_quality']['map'].length
                }
                r10_1Sum += Number(yearData[month]['delivery_and_quality']['map'][9]['timeliness'])
                r10_2Sum += Number(yearData[month]['delivery_and_quality']['map'][9]['equipment'])
                r10_3Sum += Number(yearData[month]['delivery_and_quality']['map'][9]['quality'])
    
            }
            r10_1Sum = Number((r10_1Sum/regionsCount).toFixed(1))
            r10_2Sum = Number((r10_2Sum/regionsCount).toFixed(1))
            r10_3Sum = Number((r10_3Sum/regionsCount).toFixed(1))
            r10__sum = Number(((Number(r10_1Sum) + Number(r10_2Sum) + Number(r10_3Sum))/3).toFixed(1))
    
    
    
            let r11_1Sum = 0
            let r11_2Sum = 0
            let r11_3Sum = 0
            let r11__sum = 0
            for (let month in yearData) {
                if (regionsCount == 0) {
                    regionsCount = yearData[month]['delivery_and_quality']['map'].length
                }
                r11_1Sum += Number(yearData[month]['delivery_and_quality']['map'][10]['timeliness'])
                r11_2Sum += Number(yearData[month]['delivery_and_quality']['map'][10]['equipment'])
                r11_3Sum += Number(yearData[month]['delivery_and_quality']['map'][10]['quality'])
    
            }
            r11_1Sum = Number((r11_1Sum/regionsCount).toFixed(1))
            r11_2Sum = Number((r11_2Sum/regionsCount).toFixed(1))
            r11_3Sum = Number((r11_3Sum/regionsCount).toFixed(1))
            r11__sum = Number(((Number(r11_1Sum) + Number(r11_2Sum) + Number(r11_3Sum))/3).toFixed(1))
    
            const del_n_qual_all = {
                "produced": produced,
                "shipped": shipped,
                "defective": defective,
                "produced_consolidated": {
                    "plan": producedConsolidatedPlan,
                    "fact": producedConsolidatedFact
                },
                "shipped_consolidated": {
                    "plan": shippedConsolidatedPlan,
                    "fact": shippedConsolidatedFact
                },
                "requisitions": requisitions,
                // todo
                "map": [
                    {
                        "name": "Московская область",
                        "okato": "46000000000",
                        "timeliness": r1_1Sum,
                        "equipment": r1_2Sum,
                        "quality": r1_3Sum,
                        "value": [38, 56, r1__sum]
                    },
                    {
                        "name": "Тамбовская область",
                        "okato": "68000000000",
                        "timeliness": r2_1Sum,
                        "equipment": r2_2Sum,
                        "quality": r2_3Sum,
                        "value": [41.5, 52.5, r2__sum]
                    },
                    {
                        "name": "Волгоградская область",
                        "okato": "18000000000",
                        "timeliness": r3_1Sum,
                        "equipment": r3_2Sum,
                        "quality": r3_3Sum,
                        "value": [44.5, 49.5, r3__sum]
                    },
                    {
                        "name": "Томская область",
                        "okato": "69000000000",
                        "timeliness": r4_1Sum,
                        "equipment": r4_2Sum,
                        "quality": r4_3Sum,
                        "value": [81, 58.5, r4__sum]
                    },
                    {
                        "name": "Амурская область",
                        "okato": "10000000000",
                        "timeliness": r5_1Sum,
                        "equipment": r5_2Sum,
                        "quality": r5_3Sum,
                        "value": [128, 54, r5__sum]
                    },
                    {
                        "name": "Красноярский край",
                        "okato": "04000000000",
                        "timeliness": r6_1Sum,
                        "equipment": r6_2Sum,
                        "quality": r6_3Sum,
                        "value": [96, 65, r6__sum]
                    },
                    {
                        "name": "Республика Саха (Якутия)",
                        "okato": "98000000000",
                        "timeliness": r7_1Sum,
                        "equipment": r7_2Sum,
                        "quality": r7_3Sum,
                        "value": [123, 65, r7__sum]
                    },
                    {
                        "name": "Республика Татарстан (Татарстан)",
                        "okato": "92000000000",
                        "timeliness": r8_1Sum,
                        "equipment": r8_2Sum,
                        "quality": r8_3Sum,
                        "value": [52, 55, r8__sum]
                    },
                    {
                        "name": "Архангельская область",
                        "okato": "11000000000",
                        "timeliness": r9_1Sum,
                        "equipment": r9_2Sum,
                        "quality": r9_3Sum,
                        "value": [42, 64, r9__sum]
                    },
                    {
                        "name": "Ненецкий автономный округ",
                        "okato": "11100000000",
                        "timeliness": r10_1Sum,
                        "equipment": r10_2Sum,
                        "quality": r10_3Sum,
                        "value": [55, 68, r10__sum]
                    },
                    {
                        "name": "Чукотский автономный округ",
                        "okato": "77000000000",
                        "timeliness": r11_1Sum,
                        "equipment": r11_2Sum,
                        "quality": r11_3Sum,
                        "value": [169, 67, r11__sum]
                    }
                ],
                "produced_diff": 0,
                "produced_diff_color": 2,
                "shipped_diff": 0,
                "shipped_diff_color": 2,
                "defective_diff": 0,
                "defective_diff_color": 2
            }
    
    
            return {
                'security_and_morale': sec_n_morale_all,
                'finance': finances_all,
                'delivery_and_quality': del_n_qual_all,
            };
        
    }

    generateMonthSumAllFilterData = () => {
        for (let type in this.resultTemplate) {
            for (let year in this.resultTemplate[type]) {
                this.resultTemplate[type][year]['all'] = this.sumDataByMonthsFilter(this.resultTemplate[type][year]);
            }
        }
        return this.resultTemplate;
    }
    
    generateIndustryTypesSumAllFilterData() {
        // first mock
        let resultAllData = JSON.parse(JSON.stringify(this.resultTemplate['pipes']));
        for (let year in resultAllData) {
            for (let month in resultAllData[year]) {
                for (let tab in resultAllData[year][month]) {
                    if (tab == 'delivery_and_quality') {
                        // +
                        let defectiveSum = 0
                        for (let type of mappers.industrialTypes) {
                            defectiveSum += this.resultTemplate[type][year][month][tab]['defective']
                        }
                        resultAllData[year][month][tab]['defective'] = defectiveSum/4;
                        // todo change percent logic
                        let defectiveDiffSum = 0
                        for (let type of mappers.industrialTypes) {
                            // defectiveDiffSum += this.resultTemplate[type][year][month]['delivery_and_quality']['defective_diff']
                        }
                        resultAllData[year][month][tab]['defective_diff'] = defectiveDiffSum;
                        // todo make defective diff color logicresult[type]
                        let defectiveDiffColor = 2
                        resultAllData[year][month][tab]['defective_diff_color'] = defectiveDiffColor;

                        let map = resultAllData[year][month][tab]['map']
                        map.map(item => {
                            let itemTime = 0
                            for (let type of mappers.industrialTypes) {
                                itemTime += Number(this.resultTemplate[type][year][month][tab]['map'].find(el => el.name == item.name).timeliness);
                            }
                            itemTime = Number(itemTime/mappers.industrialTypes.length).toFixed(1)
                            item.timeliness = Number(itemTime)

                            let itemEq = 0
                            for (let type of mappers.industrialTypes) {
                                itemEq += Number(this.resultTemplate[type][year][month][tab]['map'].find(el => el.name == item.name).equipment);
                            }
                            itemEq = Number(itemTime/mappers.industrialTypes.length).toFixed(1)
                            item.equipment = Number(itemEq)

                            let itemQu = 0
                            for (let type of mappers.industrialTypes) {
                                itemQu += Number(this.resultTemplate[type][year][month][tab]['map'].find(el => el.name == item.name).quality);
                            }
                            itemQu = Number(itemQu/mappers.industrialTypes.length).toFixed(1)
                            item.quality = Number(itemQu)
                            item.value[2] = Number(((Number(itemQu) + Number(itemEq) + Number(itemTime))/3).toFixed(1))
                        })    
                        resultAllData[year][month][tab]['map'] = map;

                        let producedSum = 0
                        for (let type of mappers.industrialTypes) {
                            producedSum += this.resultTemplate[type][year][month][tab]['produced']
                        }
                        resultAllData[year][month][tab]['produced'] = producedSum;

                        let producedConsolidatedPlanSum = resultAllData[year][month][tab]['produced_consolidated']['plan']
                        for (let month in producedConsolidatedPlanSum) {
                            for (let day in producedConsolidatedPlanSum[month]) {
                                let sum = 0
                                for (let type of mappers.industrialTypes) {
                                    sum += this.resultTemplate[type][year][month][tab]['produced_consolidated']['plan'][month][day]
                                }
                                producedConsolidatedPlanSum[month][day] = sum
                            }
                        }
                        resultAllData[year][month][tab]['produced_consolidated']['plan'] = producedConsolidatedPlanSum;

                        let producedConsolidatedFactSum = resultAllData[year][month][tab]['produced_consolidated']['fact']
                        for (let month in producedConsolidatedFactSum) {
                            for (let day in producedConsolidatedFactSum[month]) {
                                let sum = 0
                                for (let type of mappers.industrialTypes) {
                                    sum += this.resultTemplate[type][year][month][tab]['produced_consolidated']['fact'][month][day]
                                }
                                producedConsolidatedFactSum[month][day] = sum
                            }
                        }
                        resultAllData[year][month][tab]['produced_consolidated']['fact'] = producedConsolidatedFactSum;

                        // todo change percent diff
                        let producedDiff = 0
                        for (let type of mappers.industrialTypes) {
                            // producedDiff += this.resultTemplate[type][year][month]['delivery_and_quality']['produced_diff']
                        }
                        resultAllData[year][month][tab]['produced_diff'] = producedDiff;

                        // todo create color logic
                        let producedDiffColor = 2
                        resultAllData[year][month][tab]['produced_diff_color'] = producedDiffColor;

                        let requisitions = []
                        for (let type of mappers.industrialTypes) {
                            requisitions = [...requisitions, ...this.resultTemplate[type][year][month][tab]['requisitions']]
                        }
                        resultAllData[year][month][tab]['requisitions'] = requisitions;

                        let shippedSum = 0
                        for (let type of mappers.industrialTypes) {
                            shippedSum += this.resultTemplate[type][year][month][tab]['shipped']
                        }
                        resultAllData[year][month][tab]['shipped'] = shippedSum;

                        let shippedConsolidatedFactSum = resultAllData[year][month][tab]['shipped_consolidated']['fact']
                        for (let month in shippedConsolidatedFactSum) {
                            for (let day in shippedConsolidatedFactSum[month]) {
                                let sum = 0
                                for (let type of mappers.industrialTypes) {
                                    sum += this.resultTemplate[type][year][month][tab]['shipped_consolidated']['fact'][month][day]
                                }
                                shippedConsolidatedFactSum[month][day] = sum
                            }
                        }
                        resultAllData[year][month][tab]['shipped_consolidated']['fact'] = shippedConsolidatedFactSum;

                        let shippedConsolidatedPlanSum = resultAllData[year][month][tab]['shipped_consolidated']['plan']
                        for (let month in shippedConsolidatedPlanSum) {
                            for (let day in shippedConsolidatedPlanSum[month]) {
                                let sum = 0
                                for (let type of mappers.industrialTypes) {
                                    sum += this.resultTemplate[type][year][month][tab]['shipped_consolidated']['plan'][month][day]
                                }
                                shippedConsolidatedPlanSum[month][day] = sum
                            }
                        }
                        resultAllData[year][month][tab]['shipped_consolidated']['plan'] = shippedConsolidatedPlanSum;


                        // todo change percent diff
                        let shippedDiff = 0
                        for (let type of mappers.industrialTypes) {
                            // shippedDiff += this.resultTemplate[type][year][month]['delivery_and_quality']['shipped_diff']
                        }
                        resultAllData[year][month][tab]['shipped_diff'] = shippedDiff;
                        // todo create color logic
                        let shippedDiffColor = 2    
                        resultAllData[year][month][tab]['shipped_diff_color'] = shippedDiffColor;
                    }
                    if (tab == 'finance') {
                        let EBITDASum = 0
                        for (let type of mappers.industrialTypes) {
                            EBITDASum += this.resultTemplate[type][year][month][tab]['EBITDA']
                        }
                        resultAllData[year][month][tab]['EBITDA'] = EBITDASum;

                        // todo change percent diff
                        let EBITDADiff = 0
                        for (let type of mappers.industrialTypes) {
                            // EBITDADiff += this.resultTemplate[type][year][month][tab]['EBITDA_diff']
                        }
                        resultAllData[year][month][tab]['EBITDA_diff'] = EBITDADiff;
                        // todo create color logic
                        let EBITDADiffColor = 2
                        resultAllData[year][month][tab]['EBITDA_diff_color'] = EBITDADiffColor;


                        let expensesSum = 0
                        for (let type of mappers.industrialTypes) {
                            expensesSum += this.resultTemplate[type][year][month][tab]['expenses']
                        }
                        resultAllData[year][month][tab]['expenses'] = expensesSum/4;


                        let expensesConsolidatedPlanSum = resultAllData[year][month][tab]['expenses_consolidated']['plan']
                        for (let month in expensesConsolidatedPlanSum) {
                            for (let day in expensesConsolidatedPlanSum[month]) {
                                let sum = 0
                                for (let type of mappers.industrialTypes) {
                                    sum += this.resultTemplate[type][year][month][tab]['expenses_consolidated']['plan'][month][day]
                                }
                                expensesConsolidatedPlanSum[month][day] = sum
                            }
                        }
                        resultAllData[year][month][tab]['expenses_consolidated']['plan'] = expensesConsolidatedPlanSum;

                        let expensesConsolidatedFactSum = resultAllData[year][month][tab]['expenses_consolidated']['fact']
                        for (let month in expensesConsolidatedFactSum) {
                            for (let day in expensesConsolidatedFactSum[month]) {
                                let sum = 0
                                for (let type of mappers.industrialTypes) {
                                    sum += this.resultTemplate[type][year][month][tab]['expenses_consolidated']['fact'][month][day]
                                }
                                expensesConsolidatedFactSum[month][day] = sum
                            }
                        }
                        resultAllData[year][month][tab]['expenses_consolidated']['fact'] = expensesConsolidatedFactSum;

                        // todo change percent diff
                        let expensesDiff = 0
                        for (let type of mappers.industrialTypes) {
                            // expensesDiff += this.resultTemplate[type][year][month][tab]['expenses_diff']
                        }
                        resultAllData[year][month][tab]['expenses_diff'] = expensesDiff;
                        // todo create color logic
                        let expensesDiffColor = 2
                        resultAllData[year][month][tab]['expenses_diff_color'] = expensesDiffColor;


                        let profitSum = 0
                        for (let type of mappers.industrialTypes) {
                            profitSum += this.resultTemplate[type][year][month][tab]['profit']
                        }
                        resultAllData[year][month][tab]['profit'] = profitSum;


                        let EBITDAConsolidatedSum = resultAllData[year][month][tab]['profit_consolidated']['EBITDA']
                        for (let month in EBITDAConsolidatedSum) {
                            for (let day in EBITDAConsolidatedSum[month]) {
                                let sum = 0
                                for (let type of mappers.industrialTypes) {
                                    sum += this.resultTemplate[type][year][month][tab]['profit_consolidated']['EBITDA'][month][day]
                                }
                                EBITDAConsolidatedSum[month][day] = sum
                            }
                        }
                        resultAllData[year][month][tab]['profit_consolidated']['EBITDA'] = EBITDAConsolidatedSum;


                        let profitConsolidatedSum = resultAllData[year][month][tab]['profit_consolidated']['profit']
                        for (let month in profitConsolidatedSum) {
                            for (let day in profitConsolidatedSum[month]) {
                                let sum = 0
                                for (let type of mappers.industrialTypes) {
                                    sum += this.resultTemplate[type][year][month][tab]['profit_consolidated']['profit'][month][day]
                                }
                                profitConsolidatedSum[month][day] = sum
                            }
                        }
                        resultAllData[year][month][tab]['profit_consolidated']['profit'] = profitConsolidatedSum;

                        // todo change logic
                        let profitabilitySum = resultAllData[year][month][tab]['profit_consolidated']['profitability']
                        for (let month in profitabilitySum) {
                            let sum = 0
                            for (let type of mappers.industrialTypes) {
                                sum += Number((this.resultTemplate[type][year][month][tab]['profit_consolidated']['profitability'][month]).toFixed(2))
                            }
                            profitabilitySum[month] = Number((sum/4).toFixed(2))
                        }
                        resultAllData[year][month][tab]['profit_consolidated']['profitability'] = profitabilitySum;

                        let profitabilityMonthConsolidatedSum = resultAllData[year][month][tab]['profit_consolidated']['profitability_month_detalized']
                        for (let month in profitabilityMonthConsolidatedSum) {
                            for (let day in profitabilityMonthConsolidatedSum[month]) {
                                let sum = 0
                                for (let type of mappers.industrialTypes) {
                                    sum += this.resultTemplate[type][year][month][tab]['profit_consolidated']['profitability_month_detalized'][month][day]
                                }
                                profitabilityMonthConsolidatedSum[month][day] = sum
                            }
                        }
                        resultAllData[year][month][tab]['profit_consolidated']['profitability_month_detalized'] = profitabilityMonthConsolidatedSum;

                        // todo change percent diff
                        let profitDiff = 0
                        for (let type of mappers.industrialTypes) {
                            // profitDiff += this.resultTemplate[type][year][month][tab]['profit_diff']
                        }
                        resultAllData[year][month][tab]['profit_diff'] = profitDiff;
                        // todo create color logic
                        let profitDiffColor = 2
                        resultAllData[year][month][tab]['profit_diff_color'] = profitDiffColor;

                        let revenueSum = 0
                        for (let type of mappers.industrialTypes) {
                            revenueSum += this.resultTemplate[type][year][month][tab]['revenue']
                        }
                        resultAllData[year][month][tab]['revenue'] = revenueSum;





                        let revenueConsolidatedPlanSum = resultAllData[year][month][tab]['revenue_consolidated']['plan']
                        for (let month in revenueConsolidatedPlanSum) {
                            for (let day in revenueConsolidatedPlanSum[month]) {
                                let sum = 0
                                for (let type of mappers.industrialTypes) {
                                    sum += this.resultTemplate[type][year][month][tab]['revenue_consolidated']['plan'][month][day]
                                }
                                revenueConsolidatedPlanSum[month][day] = sum
                            }
                        }
                        resultAllData[year][month][tab]['revenue_consolidated']['plan'] = revenueConsolidatedPlanSum;

                        let revenueConsolidatedFactSum = resultAllData[year][month][tab]['revenue_consolidated']['fact']
                        for (let month in revenueConsolidatedFactSum) {
                            for (let day in revenueConsolidatedFactSum[month]) {
                                let sum = 0
                                for (let type of mappers.industrialTypes) {
                                    sum += this.resultTemplate[type][year][month][tab]['revenue_consolidated']['fact'][month][day]
                                }
                                revenueConsolidatedFactSum[month][day] = sum
                            }
                        }
                        resultAllData[year][month][tab]['revenue_consolidated']['fact'] = revenueConsolidatedFactSum;

                        // todo logic
                        let revenueCostRatioSum = resultAllData[year][month][tab]['revenue_cost_ratio']
                        revenueCostRatioSum['left_values'] = [0, 0, 0, 0]
                        revenueCostRatioSum['right_values'] = [0, 0, 0, 0]
                        for (let type of mappers.industrialTypes) {
                            revenueCostRatioSum['left_values'][0] += this.resultTemplate[type][year][month][tab]['revenue_cost_ratio']['left_values'][0]
                            revenueCostRatioSum['left_values'][1] += this.resultTemplate[type][year][month][tab]['revenue_cost_ratio']['left_values'][1]
                            revenueCostRatioSum['left_values'][2] += this.resultTemplate[type][year][month][tab]['revenue_cost_ratio']['left_values'][2]
                            revenueCostRatioSum['left_values'][3] += this.resultTemplate[type][year][month][tab]['revenue_cost_ratio']['left_values'][3]

                            revenueCostRatioSum['right_values'][0] += this.resultTemplate[type][year][month][tab]['revenue_cost_ratio']['right_values'][0]
                            revenueCostRatioSum['right_values'][1] += this.resultTemplate[type][year][month][tab]['revenue_cost_ratio']['right_values'][1]
                            revenueCostRatioSum['right_values'][2] += this.resultTemplate[type][year][month][tab]['revenue_cost_ratio']['right_values'][2]
                            revenueCostRatioSum['right_values'][3] += this.resultTemplate[type][year][month][tab]['revenue_cost_ratio']['right_values'][3]
                        }
                        resultAllData[year][month][tab]['revenue_cost_ratio'] = revenueCostRatioSum;


                        // todo change percent diff
                        let revenueDiff = 0
                        for (let type of mappers.industrialTypes) {
                            // revenueDiff += this.resultTemplate[type][year][month][tab]['revenue_diff']
                        }
                        resultAllData[year][month][tab]['revenue_diff'] = revenueDiff;
                        // todo create color logic
                        let revenueDiffColor = 2
                        resultAllData[year][month][tab]['revenue_diff_color'] = revenueDiffColor;
                    }
                    if (tab == 'security_and_morale') {
                        let additional_shifts_hoursSum = 0
                        for (let type of mappers.industrialTypes) {
                            additional_shifts_hoursSum += this.resultTemplate[type][year][month][tab]['additional_shifts_hours']
                        }
                        resultAllData[year][month][tab]['additional_shifts_hours'] = additional_shifts_hoursSum;

                        // todo change percent diff
                        let additional_shifts_hoursDiff = 0
                        for (let type of mappers.industrialTypes) {
                            additional_shifts_hoursDiff += this.resultTemplate[type][year][month][tab]['additional_shifts_hours_diff_percent']
                        }
                        resultAllData[year][month][tab]['additional_shifts_hours_diff_percent'] = additional_shifts_hoursDiff;
                        // todo create color logic
                        let additional_shifts_hoursDiffColor = 2
                        resultAllData[year][month][tab]['additional_shifts_hours_diff_percent_color'] = additional_shifts_hoursDiffColor;



                        // todo change logic
                        let satisSum = resultAllData[year][month][tab]['employee_satisfaction']
                        for (let status in satisSum) {
                            let sum = 0
                            for (let type of mappers.industrialTypes) {
                                sum += this.resultTemplate[type][year][month][tab]['employee_satisfaction'][status]
                            }
                            satisSum[status] = sum/mappers.industrialTypes.length
                        }
                        resultAllData[year][month][tab]['employee_satisfaction'] = satisSum;

                        for (let key in resultAllData[year][month][tab]['equipment_lifetime']) {
                            let eqSum = resultAllData[year][month][tab]['equipment_lifetime'][key]
                            for (let status in eqSum) {
                                let sum = 0
                                for (let type of mappers.industrialTypes) {
                                    sum += this.resultTemplate[type][year][month][tab]['equipment_lifetime'][key][status]
                                }
                                eqSum[status] = sum/mappers.industrialTypes.length
                            }
                            resultAllData[year][month][tab]['equipment_lifetime'][key] = eqSum;
                        }


                        for (let key in resultAllData[year][month][tab]['events']) {
                            let eqSum = resultAllData[year][month][tab]['events'][key]
                            for (let status in eqSum) {
                                let sum = 0
                                for (let type of mappers.industrialTypes) {
                                    sum += this.resultTemplate[type][year][month][tab]['events'][key][status]
                                }
                                eqSum[status] = sum
                            }
                            resultAllData[year][month][tab]['events'][key] = eqSum;
                        }


                        for (let eventType in resultAllData[year][month][tab]['events_detalization']) {
                            for (let key in resultAllData[year][month][tab]['events_detalization'][eventType]) {
                                let eqSum = resultAllData[year][month][tab]['events_detalization'][eventType][key]
                                for (let status in eqSum) {
                                    let sum = 0
                                    for (let type of mappers.industrialTypes) {
                                        sum += this.resultTemplate[type][year][month][tab]['events_detalization'][eventType][key][status]
                                    }
                                    eqSum[status] = sum
                                }
                                resultAllData[year][month][tab]['events_detalization'][eventType][key] = eqSum;
                            }
                        }


                        let fluiditySum = 0
                        for (let type of mappers.industrialTypes) {
                            fluiditySum += this.resultTemplate[type][year][month][tab]['fluidity']
                        }
                        resultAllData[year][month][tab]['fluidity'] = fluiditySum/4;


                        // todo change percent diff
                        let fluidityDiff = 0
                        for (let type of mappers.industrialTypes) {
                            // fluidityDiff += this.resultTemplate[type][year][month][tab]['fluidity_diff_percent']
                        }
                        resultAllData[year][month][tab]['fluidity_diff_percent'] = fluidityDiff;
                        // todo create color logic
                        let fluidityDiffColor = 2
                        resultAllData[year][month][tab]['fluidity_diff_percent_color'] = fluidityDiffColor;




                        for (let key in resultAllData[year][month][tab]['incident_categories']) {
                            let eqSum = resultAllData[year][month][tab]['incident_categories'][key]
                            for (let status in eqSum) {
                                let sum = 0
                                for (let type of mappers.industrialTypes) {
                                    sum += this.resultTemplate[type][year][month][tab]['incident_categories'][key][status]
                                }
                                eqSum[status] = sum
                            }
                            resultAllData[year][month][tab]['incident_categories'][key] = eqSum;
                        }


                        let incidentsSum = 0
                        for (let type of mappers.industrialTypes) {
                            incidentsSum += this.resultTemplate[type][year][month][tab]['incidents']
                        }
                        resultAllData[year][month][tab]['incidents'] = incidentsSum;

                        let incidentsMaxSum = 0
                        for (let type of mappers.industrialTypes) {
                            incidentsMaxSum += this.resultTemplate[type][year][month][tab]['incidents_max']
                        }
                        resultAllData[year][month][tab]['incidents_max'] = incidentsMaxSum;

                        let incidents_affectedSum = 0
                        for (let type of mappers.industrialTypes) {
                            incidents_affectedSum += this.resultTemplate[type][year][month][tab]['incidents_affected']
                        }
                        resultAllData[year][month][tab]['incidents_affected'] = incidents_affectedSum;

                        let incidents_outage_hoursSum = 0
                        for (let type of mappers.industrialTypes) {
                            incidents_outage_hoursSum += this.resultTemplate[type][year][month][tab]['incidents_outage_hours']
                        }
                        resultAllData[year][month][tab]['incidents_outage_hours'] = incidents_outage_hoursSum;


                        let numberSum = 0
                        for (let type of mappers.industrialTypes) {
                            numberSum += this.resultTemplate[type][year][month][tab]['number']
                        }
                        resultAllData[year][month][tab]['number'] = numberSum;

                        // todo change percent diff
                        let numberDiff = 0
                        for (let type of mappers.industrialTypes) {
                            // numberDiff += this.resultTemplate[type][year][month][tab]['number_diff_percent']
                        }
                        resultAllData[year][month][tab]['number_diff_percent'] = numberDiff;
                        // todo create color logic
                        let numberDiffColor = 2
                        resultAllData[year][month][tab]['number_diff_percent_color'] = numberDiffColor;
                    }
                }
            }
        }
        this.resultTemplate['all'] = resultAllData;
        return this.resultTemplate;
    }

    generateLetterColors = () => {
        for (let type in this.resultTemplate) {
            for (let year in this.resultTemplate[type]) {
                for (let month in this.resultTemplate[type][year]) {
                    let profitability = this.resultTemplate[type][year][month]['finance']['profit_consolidated']['profitability']
                    let p_res = 0
                    let counter = 0
                    for (let key in profitability) {
                        counter++;
                        p_res += profitability[key]
                    }
                    profitability = p_res/counter
                    let cColor = (profitability <= 5) ? 3 : (profitability <= 20) ? 2 : 1;
        
        
                    counter = 0
                    let timeliness = 0
                    this.resultTemplate[type][year][month]['delivery_and_quality']['map'].forEach(item => {
                        timeliness += item.timeliness
                        counter++
                    })
        
                    timeliness = timeliness/counter
                    let dColor = (timeliness <= 3) ? 3 : (timeliness <= 4) ? 2 : 1;
        
        
        
                    counter = 0
                    let defective = this.resultTemplate[type][year][month]['delivery_and_quality']['defective']
                    let qColor = (defective <= 5) ? 1 : (defective <= 10) ? 2 : 3;
        
        
                    counter = 0
                    let incidents = this.resultTemplate[type][year][month]['security_and_morale']['incident_categories']['trauma'] / (this.resultTemplate[type][year][month]['security_and_morale']['incident_categories']['trauma'] + this.resultTemplate[type][year][month]['security_and_morale']['incident_categories']['outage']) * 100
                    let sColor = (incidents <= 5) ? 1 : (incidents <= 10) ? 2 : 3;
        
                    
                    counter = 0
                    let fluidity = this.resultTemplate[type][year][month]['security_and_morale']['fluidity']
                    let mColor = (fluidity <= 25) ? 1 : (fluidity <= 50) ? 2 : 3;
        
        
                    
                    this.resultTemplate[type][year][month]['letters_color'] = {
                        'c': cColor,
                        'd': dColor,
                        'q': qColor,
                        's': sColor,
                        'm': mColor
                    }
        
                    if (year == 2023 && month == 'all') {
                        // console.log(fluidity)
                        // console.log(incidents)
                        // console.log(profitability)
                    }
                }
            }
        }
    }

    calculateDiffLocal = (prevMonthData, currMonthData, isFirst = false) => {
        // 1 - зеленый
        // 2 - желтый
        // 3 - красный
        if (!isFirst) {
            const calcDiffOper = (curr, prev, isPercentage = false) => {
                let diffValue
                let diffColor = 2;
                diffValue = curr - prev;
                if (isPercentage) {
                    if (diffValue > 0) {
                        diffColor = 3
                    }
                    if (diffValue < 0) {
                        diffColor = 1
                        diffValue = -diffValue
                    }
                    return [diffValue, diffColor]
                }
                let diff = 0;
                if (prev == 0) {
                    diff = diffValue
                } else {
                    diff = diffValue / prev * 100;
                }
                if (diff > 40) {
                    diffColor = 1
                }
                if (diff < 0) {
                    diffColor = 3
                    diff = -diff
                }
                return [diff, diffColor]
            }
            // delivery
            let [defectiveDiff, defectiveDiffColor] = calcDiffOper(currMonthData.delivery_and_quality.defective, prevMonthData.delivery_and_quality.defective, true)
            currMonthData.delivery_and_quality.defective_diff = defectiveDiff;
            currMonthData.delivery_and_quality.defective_diff_color = defectiveDiffColor;
    
            let [producedDiff, producedDiffColor]= calcDiffOper(currMonthData.delivery_and_quality.produced, prevMonthData.delivery_and_quality.produced);
            currMonthData.delivery_and_quality.produced_diff = producedDiff;
            currMonthData.delivery_and_quality.produced_diff_color = producedDiffColor;
    
            let [shippedDiff, shippedDiffColor]= calcDiffOper(currMonthData.delivery_and_quality.shipped, prevMonthData.delivery_and_quality.shipped);
            currMonthData.delivery_and_quality.shipped_diff = shippedDiff;
            currMonthData.delivery_and_quality.shipped_diff_color = shippedDiffColor;
    
            //finance
            let [EBITDADiff, EBITDADiffColor]= calcDiffOper(currMonthData.finance.EBITDA, prevMonthData.finance.EBITDA);
            currMonthData.finance.EBITDA_diff = EBITDADiff;
            currMonthData.finance.EBITDA_diff_color = EBITDADiffColor;
    
            let [expensesDiff, expensesDiffColor]= calcDiffOper(currMonthData.finance.expenses, prevMonthData.finance.expenses, true);
            currMonthData.finance.expenses_diff = expensesDiff;
            currMonthData.finance.expenses_diff_color = expensesDiffColor;
    
            let [profitDiff, profitDiffColor]= calcDiffOper(currMonthData.finance.profit, prevMonthData.finance.profit);
            currMonthData.finance.profit_diff = profitDiff;
            currMonthData.finance.profit_diff_color = profitDiffColor;
    
            let [revenueDiff, revenueDiffColor]= calcDiffOper(currMonthData.finance.revenue, prevMonthData.finance.revenue);
            currMonthData.finance.revenue_diff = revenueDiff;
            currMonthData.finance.revenue_diff_color = revenueDiffColor;
    
            // sec n morale
            let [hoursDiff, hoursDiffColor]= calcDiffOper(currMonthData.security_and_morale.additional_shifts_hours, prevMonthData.security_and_morale.additional_shifts_hours);
            currMonthData.security_and_morale.additional_shifts_hours_diff_percent = hoursDiff;
            currMonthData.security_and_morale.additional_shifts_hours_diff_percent_color = hoursDiffColor;
    
            let [fluidityDiff, fluidityDiffColor]= calcDiffOper(currMonthData.security_and_morale.fluidity, prevMonthData.security_and_morale.fluidity, true);
            currMonthData.security_and_morale.fluidity_diff_percent = fluidityDiff;
            currMonthData.security_and_morale.fluidity_diff_percent_color = fluidityDiffColor;
    
            let [numberDiff, numberDiffColor]= calcDiffOper(currMonthData.security_and_morale.number, prevMonthData.security_and_morale.number);
            currMonthData.security_and_morale.number_diff_percent = numberDiff;
            currMonthData.security_and_morale.number_diff_percent_color = numberDiffColor;
        }
    }

    calculateDiffGlobal = () => {
        // calc for each month at first
        for (let type in this.resultTemplate) {
            for (let year = this.yearStart; year <= this.yearEnd; year++) {
                for (let month = 1; month <= 12; month++) {
                    if (month == 1) {
                        let prevYear = year-1
                        if (prevYear >= this.yearStart) {
                            this.calculateDiffLocal(this.resultTemplate[type][prevYear][12], this.resultTemplate[type][year][month])
                        } else {
                            this.calculateDiffLocal(null, null, true)
                        }
                    } else {
                        this.calculateDiffLocal(this.resultTemplate[type][year][month-1], this.resultTemplate[type][year][month])
                    }
                }
            }
        }
        // and calc for each year summary
        for (let type in this.resultTemplate) {
            for (let year = this.yearStart; year <= this.yearEnd; year++) {
                let prevYear = year-1
                if (prevYear >= this.yearStart) {
                    this.calculateDiffLocal(this.resultTemplate[type][year-1]['all'], this.resultTemplate[type][year]['all'])
                }
            }
        }

    }

    fixSankey() {
        for (let type in this.resultTemplate) {
            if (type == 'all') {
                for (let year in this.resultTemplate[type]) {
                    for (let month in this.resultTemplate[type][year]) {
                        if (month == 'all') {
                            this.resultTemplate[type][year][month]['finance']['revenue_cost_ratio']['left_values'] = [this.resultTemplate['pipes'][year][month]['finance']['revenue'], this.resultTemplate['polyethylene'][year][month]['finance']['revenue'], this.resultTemplate['polycarbonate'][year][month]['finance']['revenue'], this.resultTemplate['organic_chemistry'][year][month]['finance']['revenue']]
                        }
                    }
                }

            }
        }
        for (let type in this.resultTemplate) {
            if (type !== 'all') {
                for (let year in this.resultTemplate[type]) {
                    for (let month in this.resultTemplate[type][year]) {
                        if (month == 'all') {
                            this.resultTemplate[type][year][month]['finance']['revenue_cost_ratio']['left_values'] = this.resultTemplate['all'][year][month]['finance']['revenue_cost_ratio']['left_values']
                        }
                    }
                }

            }
        }

        for (let type in this.resultTemplate) {
            if (type == 'all') {
                for (let year in this.resultTemplate[type]) {
                    for (let month in this.resultTemplate[type][year]) {
                        if (month == 'all') {
                            if (!FinanceGenerator.yearFactExpensesSummaryValue['all']) {
                                FinanceGenerator.yearFactExpensesSummaryValue['all'] = {}
                            }
                            if (!FinanceGenerator.yearFactExpensesSummaryValue['all'][year]) {
                                FinanceGenerator.yearFactExpensesSummaryValue['all'][year] = {}
                            }
                            if (!FinanceGenerator.yearFactExpensesSummaryValue['all'][year][type]) {
                                FinanceGenerator.yearFactExpensesSummaryValue['all'][year][type] = 0
                            }
                        }
                    }
                }

            }
        }


        for (let type in this.resultTemplate) {
            for (let year in this.resultTemplate[type]) {
                for (let month in this.resultTemplate[type][year]) {
                    if (type !== 'all') {
                        if (month !== 'all') {
                            if (!FinanceGenerator.yearFactExpensesSummaryValue['all'][year][type]) {
                                FinanceGenerator.yearFactExpensesSummaryValue['all'][year][type] = 0
                            }
                            if (!FinanceGenerator.yearFactExpensesSummaryValue['all'][year][`${type}_${month}`]) {
                                FinanceGenerator.yearFactExpensesSummaryValue['all'][year][`${type}_${month}`] = 0
                            }
                            FinanceGenerator.yearFactExpensesSummaryValue['all'][year][type] += FinanceGenerator.yearFactExpensesSummaryValue[type][year][month]
                            FinanceGenerator.yearFactExpensesSummaryValue['all'][year][`${type}_${month}`] += FinanceGenerator.yearFactExpensesSummaryValue[type][year][month]
                        }
                    }
                }
            }
        }


        for (let type in this.resultTemplate) {
            for (let year in this.resultTemplate[type]) {
                for (let month in this.resultTemplate[type][year]) {
                    if (type == 'all') {
                        if (month !== 'all') {
                            this.resultTemplate[type][year][month]['finance']['revenue_cost_ratio']['right_values'] = [FinanceGenerator.yearFactExpensesSummaryValue['all'][year][`${'pipes'}_${month}`], FinanceGenerator.yearFactExpensesSummaryValue['all'][year][`${'polyethylene'}_${month}`]
                            , FinanceGenerator.yearFactExpensesSummaryValue['all'][year][`${'polycarbonate'}_${month}`], FinanceGenerator.yearFactExpensesSummaryValue['all'][year][`${'organic_chemistry'}_${month}`]]
                        }
                    }
                }
            }
        }


        for (let type in this.resultTemplate) {
            if (type !== 'all') {
                for (let year in this.resultTemplate[type]) {
                    for (let month in this.resultTemplate[type][year]) {
                        if (month == 'all') {
                            this.resultTemplate[type][year][month]['finance']['revenue_cost_ratio']['right_values'] = this.resultTemplate['all'][year][month]['finance']['revenue_cost_ratio']['right_values']
                        }
                    }
                }

            }
        }

        // TODO BY MONTHS
        for (let type in this.resultTemplate) {
            if (type == 'all') {
                for (let year in this.resultTemplate[type]) {
                    for (let month in this.resultTemplate[type][year]) {
                        if (month !== 'all') {
                            this.resultTemplate[type][year][month]['finance']['revenue_cost_ratio']['left_values'] = [this.resultTemplate['pipes'][year][month]['finance']['revenue'], this.resultTemplate['polyethylene'][year][month]['finance']['revenue'], this.resultTemplate['polycarbonate'][year][month]['finance']['revenue'], this.resultTemplate['organic_chemistry'][year][month]['finance']['revenue']]
                        }
                    }
                }

            }
        }
        for (let type in this.resultTemplate) {
            if (type !== 'all') {
                for (let year in this.resultTemplate[type]) {
                    for (let month in this.resultTemplate[type][year]) {
                        if (month !== 'all') {
                            this.resultTemplate[type][year][month]['finance']['revenue_cost_ratio']['left_values'] = this.resultTemplate['all'][year][month]['finance']['revenue_cost_ratio']['left_values']
                        }
                    }
                }

            }
        }

        for (let type in this.resultTemplate) {
            if (type !== 'all') {
                for (let year in this.resultTemplate[type]) {
                    for (let month in this.resultTemplate[type][year]) {
                        if (month !== 'all') {
                            this.resultTemplate[type][year][month]['finance']['revenue_cost_ratio']['right_values'] = this.resultTemplate['all'][year][month]['finance']['revenue_cost_ratio']['right_values']
                        }
                    }
                }

            }
        }
    }
}