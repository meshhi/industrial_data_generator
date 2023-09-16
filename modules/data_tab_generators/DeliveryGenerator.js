import generateYearMonthByDaysStructure from '../utils/generateYearMonthByDaysStructure.js';
import mappers from '../utils/mappers.js';

class DeliveryGenerator {
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
            "requisitions": 0,
            "map": 0,
            "produced_diff": 0,
            "produced_diff_color": 2,
            "shipped_diff": 0,
            "shipped_diff_color": 2,
            "defective_diff": 0,
            "defective_diff_color": 2
        }
    }

    generateData(custom, type, year, month) {
        this.structure.requisitions = this.generateRequisitions(custom, type, 10, year, month);
        this.structure.map = this.generateMap();
        this.structure.produced_consolidated.plan = generateYearMonthByDaysStructure(year, month)
        this.structure.produced_consolidated.fact = generateYearMonthByDaysStructure(year, month)
        this.structure.shipped_consolidated.plan = generateYearMonthByDaysStructure(year, month)
        this.structure.shipped_consolidated.fact = generateYearMonthByDaysStructure(year, month)
        return this.structure;
    }

    generateRequisitions(custom = null, type = null, count = 10, year = null, month = null) {
        const result = [];
        for (let i = 1; i <= count; i++) {
            // 
            let day = 4;
            let color = 2;
            // 
            const requisition = {
                "requisition_number": `${year}-${i}-${Math.floor(Math.random() * 1000)}`,
                "region": mappers.regions[Math.floor(Math.random() * mappers.regions.length)],
                "product": mappers.industrialTypesTranslate[type],
                "delivery_time": Math.floor(Math.random() * (20 - 1) + 1),
                "delivery_date": `${day >= 10 ? day : '0' + String(day)}.${month >= 10 ? month : '0' + String(month)}.${year}`,
                "plan": 0,
                "fact": 0,
                "color": color,
                "non_compliance_reason": (color == 3) ? mappers.reasons[Math.floor(Math.random() * mappers.reasons.length)] : 'Нет'
            }
            result.push(requisition)
        }
        return result;
    }

    generateMap() {
        return [
            {
                "name": "Московская область",
                "okato": "46000000000",
                "timeliness": 0,
                "equipment": 0,
                "quality": 0,
                "value": [38, 56, 0]
            },
            {
                "name": "Тамбовская область",
                "okato": "68000000000",
                "timeliness": 0,
                "equipment": 0,
                "quality": 0,
                "value": [41.5, 52.5, 0]
            },
            {
                "name": "Волгоградская область",
                "okato": "18000000000",
                "timeliness": 0,
                "equipment": 0,
                "quality": 0,
                "value": [44.5, 49.5, 0]
            },
            {
                "name": "Томская область",
                "okato": "69000000000",
                "timeliness": 0,
                "equipment": 0,
                "quality": 0,
                "value": [81, 58.5, 0]
            },
            {
                "name": "Амурская область",
                "okato": "10000000000",
                "timeliness": 0,
                "equipment": 0,
                "quality": 0,
                "value": [128, 54, 0]
            },
            {
                "name": "Красноярский край",
                "okato": "04000000000",
                "timeliness": 0,
                "equipment": 0,
                "quality": 0,
                "value": [96, 65, 0]
            },
            {
                "name": "Республика Саха (Якутия)",
                "okato": "98000000000",
                "timeliness": 0,
                "equipment": 0,
                "quality": 0,
                "value": [123, 65, 0]
            },
            {
                "name": "Республика Татарстан (Татарстан)",
                "okato": "92000000000",
                "timeliness": 0,
                "equipment": 0,
                "quality": 0,
                "value": [52, 55, 0]
            },
            {
                "name": "Архангельская область",
                "okato": "11000000000",
                "timeliness": 0,
                "equipment": 0,
                "quality": 0,
                "value": [42, 64, 0]
            },
            {
                "name": "Ненецкий автономный округ",
                "okato": "11100000000",
                "timeliness": 0,
                "equipment": 0,
                "quality": 0,
                "value": [55, 68, 0]
            },
            {
                "name": "Чукотский автономный округ",
                "okato": "77000000000",
                "timeliness": 0,
                "equipment": 0,
                "quality": 0,
                "value": [169, 67, 0]
            }
        ]
    }

}

export default DeliveryGenerator;