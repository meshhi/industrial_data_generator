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

    generateData(custom, type, year, month) {
        for (let type of mappers.industrialTypes) {
            for (let year = this.yearStart; year < this.yearEnd; year++) {
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
                "number_diff_percent": "0",
                "number_diff_percent_color": "0",
                "fluidity_diff_percent": "0",
                "fluidity_diff_percent_color": "0",
                "additional_shifts_hours_diff_percent": "0",
                "additional_shifts_hours_diff_percent_color": "0",
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
                "revenue_diff": "0",
                "revenue_diff_color": "0",
                "profit_diff": "0",
                "profit_diff_color": "0",
                "EBITDA_diff": "0",
                "EBITDA_diff_color": "0",
                "expenses_diff": "0",
                "expenses_diff_color": "0"
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
            r1_1Sum = (r1_1Sum/regionsCount).toFixed(1)
            r1_2Sum = (r1_2Sum/regionsCount).toFixed(1)
            r1_3Sum = (r1_3Sum/regionsCount).toFixed(1)
            r1__sum = ((Number(r1_1Sum) + Number(r1_2Sum) + Number(r1_3Sum))/3).toFixed(1)
    
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
            r2_1Sum = (r2_1Sum/regionsCount).toFixed(1)
            r2_2Sum = (r2_2Sum/regionsCount).toFixed(1)
            r2_3Sum = (r2_3Sum/regionsCount).toFixed(1)
            r2__sum = ((Number(r2_1Sum) + Number(r2_2Sum) + Number(r2_3Sum))/3).toFixed(1);
    
    
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
            r3_1Sum = (r3_1Sum/regionsCount).toFixed(1)
            r3_2Sum = (r3_2Sum/regionsCount).toFixed(1)
            r3_3Sum = (r3_3Sum/regionsCount).toFixed(1)
            r3__sum = ((Number(r3_1Sum) + Number(r3_2Sum) + Number(r3_3Sum))/3).toFixed(1)
    
    
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
            r4_1Sum = (r4_1Sum/regionsCount).toFixed(1)
            r4_2Sum = (r4_2Sum/regionsCount).toFixed(1)
            r4_3Sum = (r4_3Sum/regionsCount).toFixed(1)
            r4__sum = ((Number(r4_1Sum) + Number(r4_2Sum) + Number(r4_3Sum))/3).toFixed(1)
    
    
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
            r5_1Sum = (r5_1Sum/regionsCount).toFixed(1)
            r5_2Sum = (r5_2Sum/regionsCount).toFixed(1)
            r5_3Sum = (r5_3Sum/regionsCount).toFixed(1)
            r5__sum = ((Number(r5_1Sum) + Number(r5_2Sum) + Number(r5_3Sum))/3).toFixed(1)
    
    
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
            r6_1Sum = (r6_1Sum/regionsCount).toFixed(1)
            r6_2Sum = (r6_2Sum/regionsCount).toFixed(1)
            r6_3Sum = (r6_3Sum/regionsCount).toFixed(1)
            r6__sum = ((Number(r6_1Sum) + Number(r6_2Sum) + Number(r6_3Sum))/3).toFixed(1)
    
    
    
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
            r7_1Sum = (r7_1Sum/regionsCount).toFixed(1)
            r7_2Sum = (r7_2Sum/regionsCount).toFixed(1)
            r7_3Sum = (r7_3Sum/regionsCount).toFixed(1)
            r7__sum = ((Number(r7_1Sum) + Number(r7_2Sum) + Number(r7_3Sum))/3).toFixed(1)
    
    
    
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
            r8_1Sum = (r8_1Sum/regionsCount).toFixed(1)
            r8_2Sum = (r8_2Sum/regionsCount).toFixed(1)
            r8_3Sum = (r8_3Sum/regionsCount).toFixed(1)
            r8__sum = ((Number(r8_1Sum) + Number(r8_2Sum) + Number(r8_3Sum))/3).toFixed(1)
    
    
    
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
            r9_1Sum = (r9_1Sum/regionsCount).toFixed(1)
            r9_2Sum = (r9_2Sum/regionsCount).toFixed(1)
            r9_3Sum = (r9_3Sum/regionsCount).toFixed(1)
            r9__sum = ((Number(r9_1Sum) + Number(r9_2Sum) + Number(r9_3Sum))/3).toFixed(1)
    
    
    
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
            r10_1Sum = (r10_1Sum/regionsCount).toFixed(1)
            r10_2Sum = (r10_2Sum/regionsCount).toFixed(1)
            r10_3Sum = (r10_3Sum/regionsCount).toFixed(1)
            r10__sum = ((Number(r10_1Sum) + Number(r10_2Sum) + Number(r10_3Sum))/3).toFixed(1)
    
    
    
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
            r11_1Sum = (r11_1Sum/regionsCount).toFixed(1)
            r11_2Sum = (r11_2Sum/regionsCount).toFixed(1)
            r11_3Sum = (r11_3Sum/regionsCount).toFixed(1)
            r11__sum = ((Number(r11_1Sum) + Number(r11_2Sum) + Number(r11_3Sum))/3).toFixed(1)
    
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
                "produced_diff": "0",
                "produced_diff_color": "0",
                "shipped_diff": "0",
                "shipped_diff_color": "0",
                "defective_diff": "0",
                "defective_diff_color": "0"
            }
    
    
            return {
                'security_and_morale': sec_n_morale_all,
                'finance': finances_all,
                'delivery_and_quality': del_n_qual_all,
            };
        
    }

    generateMonthSumAllFilterData = (rawData) => {
        for (let type in rawData) {
            for (let year in rawData[type]) {
                rawData[type][year]['all'] = this.sumDataByMonthsFilter(rawData[type][year]);
            }
        }
        return rawData;
    }
    
}