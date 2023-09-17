import generateYearMonthByDaysStructure from '../utils/generateYearMonthByDaysStructure.js';
import howMuchDays from '../utils/howMuchDays.js';
import mappers from '../utils/mappers.js';

class DeliveryGenerator {
    static yearPlanProduced = {};
    static yearFactProduced = {};
    static yearPlanProducedSummaryValue = {};
    static yearFactProducedSummaryValue = {};

    static yearPlanShipped = {};
    static yearFactShipped = {};
    static yearPlanShippedSummaryValue = {};
    static yearFactShippedSummaryValue = {};

    static yearMapData = {};
    constructor() {
        this.structure = {
            "produced": 0,
            "shipped": 0,
            "defective": 0,
            "produced_consolidated": {
                "plan": 0,
                "fact": 0
            },
            "shipped_consolidated": {
                "plan": 0,
                "fact": 0
            },
            "requisitions": [],
            "map": mappers.mapData,
            "produced_diff": 0,
            "produced_diff_color": 2,
            "shipped_diff": 0,
            "shipped_diff_color": 2,
            "defective_diff": 0,
            "defective_diff_color": 2
        }
    }

    generateData(custom, type, year, month) {
        // PRODUCED
        // PLAN
        if (!DeliveryGenerator.yearPlanProduced[type]) {
            DeliveryGenerator.yearPlanProduced[type] = {};
        }
        if (!DeliveryGenerator.yearPlanProducedSummaryValue[type]) {
            DeliveryGenerator.yearPlanProducedSummaryValue[type] = {};
        }
        if (!DeliveryGenerator.yearPlanProduced[type][year]) {
            DeliveryGenerator.yearPlanProduced[type][year] = generateYearMonthByDaysStructure(year, month)
            DeliveryGenerator.yearPlanProducedSummaryValue[type][year] = {};
            for (let month in DeliveryGenerator.yearPlanProduced[type][year]) {
                for (let day in DeliveryGenerator.yearPlanProduced[type][year][month]) {
                    let currentDayValue = Math.round(Math.random() * (500-300) + 300);
                    DeliveryGenerator.yearPlanProduced[type][year][month][day] = currentDayValue;
                    if (!DeliveryGenerator.yearPlanProducedSummaryValue[type][year][month]) {
                        DeliveryGenerator.yearPlanProducedSummaryValue[type][year][month] = 0;
                    }
                    DeliveryGenerator.yearPlanProducedSummaryValue[type][year][month] += currentDayValue;
                }
            }
        }
        // FACT
        if (!DeliveryGenerator.yearFactProduced[type]) {
            DeliveryGenerator.yearFactProduced[type] = {};
        }
        if (!DeliveryGenerator.yearFactProducedSummaryValue[type]) {
            DeliveryGenerator.yearFactProducedSummaryValue[type] = {};
        }
        if (!DeliveryGenerator.yearFactProduced[type][year]) {
            DeliveryGenerator.yearFactProduced[type][year] = generateYearMonthByDaysStructure(year, month)
            DeliveryGenerator.yearFactProducedSummaryValue[type][year] = {};
            for (let month in DeliveryGenerator.yearFactProduced[type][year]) {
                for (let day in DeliveryGenerator.yearFactProduced[type][year][month]) {
                    let currentDayValue = Math.round(Math.random() * (500-300) + 300);
                    const currentDate = new Date();
                    const currentYear = currentDate.getFullYear();
                    const currentMonth = currentDate.getMonth() + 1;
                    const currentDay = currentDate.getDate();
                    if ((year > currentYear) || ((year == currentYear) && (month > currentMonth)) || ((year == currentYear) && (month == currentMonth) && (day > currentDay))) {
                        currentDayValue = 0;
                    }
                    DeliveryGenerator.yearFactProduced[type][year][month][day] = currentDayValue;
                    if (!DeliveryGenerator.yearFactProducedSummaryValue[type][year][month]) {
                        DeliveryGenerator.yearFactProducedSummaryValue[type][year][month] = 0;
                    }
                    DeliveryGenerator.yearFactProducedSummaryValue[type][year][month] += currentDayValue;
                }
            }
        }
        this.structure.produced_consolidated.plan = DeliveryGenerator.yearPlanProduced[type][year]
        this.structure.produced_consolidated.fact = DeliveryGenerator.yearFactProduced[type][year]

        this.structure.produced = DeliveryGenerator.yearFactProducedSummaryValue[type][year][month];
        // SHIPPED
        // PLAN
        if (!DeliveryGenerator.yearPlanShipped[type]) {
            DeliveryGenerator.yearPlanShipped[type] = {};
        }
        if (!DeliveryGenerator.yearPlanShippedSummaryValue[type]) {
            DeliveryGenerator.yearPlanShippedSummaryValue[type] = {};
        }
        if (!DeliveryGenerator.yearPlanShipped[type][year]) {
            DeliveryGenerator.yearPlanShipped[type][year] = generateYearMonthByDaysStructure(year, month)
            DeliveryGenerator.yearPlanShippedSummaryValue[type][year] = {};
            for (let month in DeliveryGenerator.yearPlanShipped[type][year]) {
                for (let day in DeliveryGenerator.yearPlanShipped[type][year][month]) {
                    let currentDayValue = Math.round(Math.random() * (DeliveryGenerator.yearPlanProduced[type][year][month][day]-DeliveryGenerator.yearPlanProduced[type][year][month][day]*0.3) + DeliveryGenerator.yearPlanProduced[type][year][month][day]*0.3);
                    DeliveryGenerator.yearPlanShipped[type][year][month][day] = currentDayValue;
                    if (!DeliveryGenerator.yearPlanShippedSummaryValue[type][year][month]) {
                        DeliveryGenerator.yearPlanShippedSummaryValue[type][year][month] = 0;
                    }
                    DeliveryGenerator.yearPlanShippedSummaryValue[type][year][month] += currentDayValue;
                }
            }
        }
        // FACT
        if (!DeliveryGenerator.yearFactShipped[type]) {
            DeliveryGenerator.yearFactShipped[type] = {};
        }
        if (!DeliveryGenerator.yearFactShippedSummaryValue[type]) {
            DeliveryGenerator.yearFactShippedSummaryValue[type] = {};
        }
        if (!DeliveryGenerator.yearFactShipped[type][year]) {
            DeliveryGenerator.yearFactShipped[type][year] = generateYearMonthByDaysStructure(year, month)
            DeliveryGenerator.yearFactShippedSummaryValue[type][year] = {};
            for (let month in DeliveryGenerator.yearFactShipped[type][year]) {
                for (let day in DeliveryGenerator.yearFactShipped[type][year][month]) {
                    let currentDayValue = Math.round(Math.random() * (DeliveryGenerator.yearFactProduced[type][year][month][day]-DeliveryGenerator.yearFactProduced[type][year][month][day]*0.3) + DeliveryGenerator.yearFactProduced[type][year][month][day]*0.3);
                    const currentDate = new Date();
                    const currentYear = currentDate.getFullYear();
                    const currentMonth = currentDate.getMonth() + 1;
                    const currentDay = currentDate.getDate();
                    if ((year > currentYear) || ((year == currentYear) && (month > currentMonth)) || ((year == currentYear) && (month == currentMonth) && (day > currentDay))) {
                        currentDayValue = 0;
                    }
                    DeliveryGenerator.yearFactShipped[type][year][month][day] = currentDayValue;
                    if (!DeliveryGenerator.yearFactShippedSummaryValue[type][year][month]) {
                        DeliveryGenerator.yearFactShippedSummaryValue[type][year][month] = 0;
                    }
                    DeliveryGenerator.yearFactShippedSummaryValue[type][year][month] += currentDayValue;
                }
            }
        }
        this.structure.shipped_consolidated.plan = DeliveryGenerator.yearPlanShipped[type][year]
        this.structure.shipped_consolidated.fact = DeliveryGenerator.yearFactShipped[type][year]

        this.structure.shipped = DeliveryGenerator.yearFactShippedSummaryValue[type][year][month];

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();
        if ((year > currentYear) || ((year == currentYear) && (month > currentMonth))) {
            console.log(`delivery generation ignored on ${year}-${month} date!`)
        } else {
            // REQUISITIONS
            this.structure.requisitions = this.generateRequisitions(custom, type, 10, year, month, DeliveryGenerator.yearFactShippedSummaryValue[type][year][month]);
            // MAP
            this.structure.map = this.generateMap(custom, type, year, month);
    
            // DEFECTIVE
            let defectiveVal = DeliveryGenerator.yearFactShippedSummaryValue[type][year][month] * Math.random();
            this.structure.defective = defectiveVal / DeliveryGenerator.yearFactShippedSummaryValue[type][year][month] * 100;
            if (!this.structure.defective) {
                this.structure.defective = 0;
            }
        }
        return this.structure;
    }

    generateRequisitions(custom = null, type = null, count = 10, year = null, month = null, totalShipped = 0) {
        const possibleDays = howMuchDays(year, month);
        const result = [];
        for (let i = 1; i <= count; i++) {
            // 
            let currentFact = totalShipped/count;
            let currentPlan = Math.round(currentFact * 100) / 100;
            let color = 2;
            if (currentPlan > currentFact) {
                color = 3;
            }
            if (currentPlan < currentFact) {
                color = 1;
            }
            let dayUpdated = Math.floor(Math.random() * (possibleDays-5) + 5);
            const deliveryTime = Math.floor(Math.random() * (20 - 1) + 1);
            const requisition = {
                "requisition_number": `${year}-${month}-${type}-${i}`,
                "region": mappers.regions[Math.floor(Math.random() * mappers.regions.length)],
                "product": mappers.industrialTypesTranslate[type],
                "delivery_time": deliveryTime,
                "delivery_date": `${dayUpdated >= 10 ? (dayUpdated > possibleDays) ? possibleDays : dayUpdated : '0' + String(dayUpdated)}.${month >= 10 ? month : '0' + String(month)}.${year}`,
                "plan": currentPlan,
                "fact": currentFact,
                "color": color,
                "non_compliance_reason": (color == 3) ? mappers.reasons[Math.floor(Math.random() * mappers.reasons.length)] : 'Нет'
            }
            result.push(requisition)
        }
        return result;
    }

    generateMap(custom = null, type = null, year = null, month = null) {
        if (!DeliveryGenerator.yearMapData[type]) {
            DeliveryGenerator.yearMapData[type] = {};
        }
        if (!DeliveryGenerator.yearMapData[type][year]) {
            DeliveryGenerator.yearMapData[type][year] = {};
        }
        if (!DeliveryGenerator.yearMapData[type][year][month]) {
            DeliveryGenerator.yearMapData[type][year][month] = {};
        }

        let map = JSON.parse(JSON.stringify(mappers.mapData));
        map = map.map((item) => {
            item.timeliness = Number((Math.random() * (5-3) + 3).toFixed(1));
            item.equipment = Number((Math.random() * (5-3) + 3).toFixed(1));
            item.quality = Number((Math.random() * (5-3) + 3).toFixed(1));
            item.value[2] = Number(((item.timeliness + item.equipment + item.quality) / 3).toFixed(1));
            return item;
        })
        DeliveryGenerator.yearMapData[type][year][month] = map;
        return JSON.parse(JSON.stringify(map));
    }

}

export default DeliveryGenerator;