const fs = require("fs");

const result = {
  'all': {},
  'pipes': {},
  'polycarbonate': {},
  'polyethylene': {},
  'organic_chemistry': {}
}

const typesMapper = {
    'pipes': 'Трубы',
    'polycarbonate': 'Поликарбонат',
    'polyethylene': 'Полиэтилен',
    'organic_chemistry': 'Органическая химия'
}

const types = [
    'pipes',
    'polycarbonate',
    'polyethylene',
    'organic_chemistry'
]

const getSankeyValue = (source, target, year) => {
    let res = {
        2021: [
            {source: 'pipes', target: 'raw_material', value: 1},
    
            {source: 'pipes', target: 'transport', value: 1},
            
            {source: 'pipes', target: 'amortization', value: 1},
            
            {source: 'pipes', target: 'FOT', value: 1},
    
            {source: 'polyethylene', target: 'raw_material', value: 1},
    
            {source: 'polyethylene', target: 'transport', value: 1},
    
            {source: 'polyethylene', target: 'amortization', value: 1},
    
            {source: 'polyethylene', target: 'FOT', value: 1},
    
            {source: 'polycarbonate', target: 'raw_material', value: 1},
    
            {source: 'polycarbonate', target: 'transport', value: 1},
    
            {source: 'polycarbonate', target: 'amortization', value: 1},
    
            {source: 'polycarbonate', target: 'FOT', value: 1},
    
            {source: 'organic_chemistry', target: 'raw_material', value: 1},
    
            {source: 'organic_chemistry', target: 'transport', value: 1},
            {source: 'organic_chemistry', target: 'amortization', value: 1},
            {source: 'organic_chemistry', target: 'FOT', value: 1}
        ],
        2022: [
            {source: 'pipes', target: 'raw_material', value: 1},
    
            {source: 'pipes', target: 'transport', value: 1},
            
            {source: 'pipes', target: 'amortization', value: 1},
            
            {source: 'pipes', target: 'FOT', value: 1},
    
            {source: 'polyethylene', target: 'raw_material', value: 1},
    
            {source: 'polyethylene', target: 'transport', value: 1},
    
            {source: 'polyethylene', target: 'amortization', value: 1},
    
            {source: 'polyethylene', target: 'FOT', value: 1},
    
            {source: 'polycarbonate', target: 'raw_material', value: 1},
    
            {source: 'polycarbonate', target: 'transport', value: 1},
    
            {source: 'polycarbonate', target: 'amortization', value: 1},
    
            {source: 'polycarbonate', target: 'FOT', value: 1},
    
            {source: 'organic_chemistry', target: 'raw_material', value: 1},
    
            {source: 'organic_chemistry', target: 'transport', value: 1},
            {source: 'organic_chemistry', target: 'amortization', value: 1},
            {source: 'organic_chemistry', target: 'FOT', value: 1}
        ],
        2023: [
            {source: 'pipes', target: 'raw_material', value: 1},
    
            {source: 'pipes', target: 'transport', value: 1},
            
            {source: 'pipes', target: 'amortization', value: 1},
            
            {source: 'pipes', target: 'FOT', value: 1},
    
            {source: 'polyethylene', target: 'raw_material', value: 1},
    
            {source: 'polyethylene', target: 'transport', value: 1},
    
            {source: 'polyethylene', target: 'amortization', value: 1},
    
            {source: 'polyethylene', target: 'FOT', value: 1},
    
            {source: 'polycarbonate', target: 'raw_material', value: 1},
    
            {source: 'polycarbonate', target: 'transport', value: 1},
    
            {source: 'polycarbonate', target: 'amortization', value: 1},
    
            {source: 'polycarbonate', target: 'FOT', value: 1},
    
            {source: 'organic_chemistry', target: 'raw_material', value: 1},
    
            {source: 'organic_chemistry', target: 'transport', value: 1},
            {source: 'organic_chemistry', target: 'amortization', value: 1},
            {source: 'organic_chemistry', target: 'FOT', value: 1}
        ]
    }
    let res2 = res[year].find(item => (item.source == source) && (item.target == target))
    return res2.value
    }


const regions = ["Московская область", "Тамбовская область", "Волгоградская область", "Томская область", "Амурская область", "Красноярский край", "Республика Саха (Якутия)", "Республика Татарстан (Татарстан)", "Архангельская область", "Ненецкий автономный округ", "Чукотский автономный округ"]

const reasons = ["Переработки", "Логистическая проблема", "Нехватка рабочей силы", "Погодные условия", "Контракт расторгнут"]
const howMuchDays = ( year , month) => {
  var date1 = new Date(year, month-1, 1);
  var date2 = new Date(year, month, 1);
  return Math.round((date2 - date1) / 1000 / 3600 / 24);
}
const genDoli = (keys, isPercentage = false) => {
  let doli = []
//  new doli logic
for (let i = 0; i < keys.length; i++) {
    doli.push(100/keys.length)
}

const doliAverageVal = doli[0]

const randomizeDoli = (doli, isPercentage = false) => {
    const len = doli.length;
    let randomIndex1 = Math.floor(Math.random()*doli.length);
    let randomIndex2 = Math.floor(Math.random()*doli.length);
    while (randomIndex1 == randomIndex2) {
        randomIndex2 = Math.floor(Math.random()*doli.length);
    }
    let val1 = doli[randomIndex1];
    let diff = Math.floor(Math.random()*val1);
    let newVal1 = val1 - diff
    let val2 = doli[randomIndex2];
    let newVal2 = val2 + diff
    while (newVal2 > 100) {
        randomIndex2 = Math.floor(Math.random()*doli.length);
        while (randomIndex1 == randomIndex2) {
            randomIndex2 = Math.floor(Math.random()*doli.length);
        }
        val2 = doli[randomIndex2];
        newVal2 = val2 + diff
    }
    doli[randomIndex1] = newVal1;
    doli[randomIndex2] = newVal2;
    return doli
}
    for (let i = 0; i < keys.length * 2; i++) {
        doli = randomizeDoli(doli, isPercentage)
    }
    if (isPercentage) {
        let sum = 0
        doli = doli.map(item => Math.floor(item))
        doli.forEach(item => sum += item)
        if (sum < 100) {
            let diff = 100 - sum
            doli[Math.floor(Math.random() * 2)] += diff
        }
    }
  return doli.map(item => item/100)
}
const generateValuesInRange = (keys, limit, isPercentage = false, year = false, month = false, custom = false, limitateValue = false) => {
  const doli = genDoli(keys, isPercentage)
  const result = {}
  for (let [index, item] of Object.entries(keys)) {
    result[item] = Math.floor(limit * doli[index])
  }

  if (year == 2023 && custom == 'sColor') {
    while (result.trauma/(result.trauma+result.outage)*100 < 5) {
        result.outage--;
        result.trauma++;
    }
    while (result.trauma/(result.trauma+result.outage)*100 > 10) {
        result.outage++;
        result.trauma--;
    }
  }
  
  return result
}

// базовые коеффициенты для безопасности и морального духа
let baseNumber = Math.floor(Math.random() * (1500 - 1200) + 1200);
let baseFluidity = Math.floor(Math.random() * (100 - 0) + 0);
let baseAddHours = Math.floor(Math.random() * (500 - 100) + 200);
let baseEventsTrainingEvents = Math.floor(Math.random() * (150 - 50) + 50);
let baseEventsWorkplaceImprovements = Math.floor(Math.random() * (100 - 10) + 10);
let baseEventsWelnessEvents = Math.floor(Math.random() * (100 - 10) + 10);
let baseIncidents = Math.floor(Math.random() * (200 - 10) + 10);

// базовые коеффициенты для финансов
let baseRevenue = Math.floor(Math.random() * (5000000 - 3000000) + 3000000);

// базовые коеффициенты для доставки и качества
let baseProduced = Math.floor(Math.random() * (1000000 - 100000) + 100000);

const generateMonthData = (prevData, year, month, type) => {

if (year == 2023) {
    baseNumber = Math.floor(Math.random() * (1500 - 1200) + 1200);
    baseFluidity = Math.floor(Math.random() * (40 - 30) + 30);
    baseAddHours = Math.floor(Math.random() * (500 - 100) + 200);
    baseEventsTrainingEvents = Math.floor(Math.random() * (150 - 50) + 50);
    baseEventsWorkplaceImprovements = Math.floor(Math.random() * (100 - 10) + 10);
    baseEventsWelnessEvents = Math.floor(Math.random() * (100 - 10) + 10);
    baseIncidents = Math.floor(Math.random() * (200 - 10) + 10);
}

  // безопасность и моральный дух
  let currFluidity = baseFluidity + Math.floor(Math.random()* baseFluidity) * (Math.random() < 0.5 ? -1 : 1);
  let currEventsTrainingEvents = baseEventsTrainingEvents + Math.floor(Math.random()* baseEventsTrainingEvents) * (Math.random() < 0.5 ? -1 : 1);
  let currEventsWorkplaceImprovements = baseEventsWorkplaceImprovements + Math.floor(Math.random()* baseEventsWorkplaceImprovements) * (Math.random() < 0.5 ? -1 : 1);
  let currEventsWelnessEvents = baseEventsWelnessEvents + Math.floor(Math.random()* baseEventsWelnessEvents) * (Math.random() < 0.5 ? -1 : 1);
  let currBaseIncidents = baseIncidents + Math.floor(Math.random()* baseIncidents) * (Math.random() < 0.5 ? -1 : 1);
  let currDivercedIncidents = generateValuesInRange(['outage', 'trauma'], currBaseIncidents, false, year, month, 'sColor');

  if (year == 2023) {
    currFluidity = baseFluidity + Math.floor(Math.random() * baseFluidity * 0.1) * (Math.random() < 0.5 ? -1 : 1);
}

  // 
  const sec_n_morale = {
    "number": baseNumber + Math.floor(Math.random() * baseNumber) * (Math.random() < 0.5 ? -1 : 1),
    "fluidity": currFluidity > 100 ? 100 : currFluidity,
    "additional_shifts_hours": baseAddHours + Math.floor(Math.random()* baseAddHours) * (Math.random() < 0.5 ? -1 : 1),
    "events": {
        "training_events": currEventsTrainingEvents,
        "workplace_improvements": currEventsWorkplaceImprovements,
        "wellness_events": currEventsWelnessEvents
    },
    "events_detalization": {
        "training_events": generateValuesInRange(['Обучение', 'Курсы повышения квалификации'], currEventsTrainingEvents),
        "workplace_improvements": generateValuesInRange(['Ремонт', 'Вынос мусора'], currEventsWorkplaceImprovements),
        "wellness_events": generateValuesInRange(['Турнир по футболу', 'Марафон'], currEventsWelnessEvents),
    },
    "employee_satisfaction": generateValuesInRange(['low', 'middle', 'high'], 100, true),
    "incidents": currBaseIncidents,
    "incidents_max": currBaseIncidents + Math.floor(Math.random() * 100),
    "incident_categories": currDivercedIncidents,
    "incidents_affected": currDivercedIncidents.trauma + Math.floor(Math.random()* currDivercedIncidents.trauma) * (Math.random() < 0.5 ? -1 : 1),
    "incidents_outage_hours": currDivercedIncidents.outage * Math.floor(Math.random() * 3),
    "equipment_lifetime": {
        "T": generateValuesInRange(['more_than_5', 'from_1_to_5', 'less_than_1'], 100),
        "PE": generateValuesInRange(['more_than_5', 'from_1_to_5', 'less_than_1'], 100),
        "PK": generateValuesInRange(['more_than_5', 'from_1_to_5', 'less_than_1'], 100),
        "OX": generateValuesInRange(['more_than_5', 'from_1_to_5', 'less_than_1'], 100)
    },
    "number_diff_percent": "0",
    "number_diff_percent_color": "0",
    "fluidity_diff_percent": "0",
    "fluidity_diff_percent_color": "0",
    "additional_shifts_hours_diff_percent": "0",
    "additional_shifts_hours_diff_percent_color": "0",
  }
  // нужно дополнительно чекнуть, что числа после округления сходятся
  // дописать логику проверки diff_percent и diff_percent_color
// 
// 
// 
  // финансы
  let currRevenue = baseRevenue + Math.floor(Math.random()* baseRevenue) * (Math.random() < 0.5 ? -1 : 1);
  let currProfit = currRevenue - Math.floor(Math.random()* currRevenue);
  let EBITDAdiff = Math.floor(Math.random() * 1000000)
  let currEBITDA = currProfit + EBITDAdiff;
  let expenses = currRevenue * (((Math.random() * (30 - 10) + 10))/100);
  let currExpenses = (expenses / currRevenue) * 100

  if (year == 2023) {
    currRevenue = baseRevenue + Math.floor(Math.random()* baseRevenue) * (Math.random() < 0.5 ? -1 : 1);
    currProfit = currRevenue * 0.02 - Math.floor(Math.random()* currRevenue * 0.02);
    EBITDAdiff = Math.floor(Math.random() * 10000)
    currEBITDA = currProfit + EBITDAdiff;
  }


  const revenueConsolidatedPlan = {};
  for (let i = 1; i <= 12; i++) {
    const daysInMonth = [];
    for (let j = 1; j <= howMuchDays(year, i); j++) {
      daysInMonth.push(j)
    }
    const someMonthLimit = baseRevenue + Math.floor(Math.random()* baseRevenue) * (Math.random() < 0.5 ? -1 : 1)
    revenueConsolidatedPlan[i] = generateValuesInRange(daysInMonth, someMonthLimit)
  }
  // надо переписать на конкретные значения факт выручки

  const generateRevenueConsolidatedFact = () => {
    let revenueConsolidatedFact = {};
      for (let i = 1; i <= 12; i++) {
        const daysInMonth = [];
        for (let j = 1; j <= howMuchDays(year, i); j++) {
          daysInMonth.push(j)
        }
        const someMonthLimit = baseRevenue + Math.floor(Math.random()* baseRevenue) * (Math.random() < 0.5 ? -1 : 1)
        revenueConsolidatedFact[i] = generateValuesInRange(daysInMonth, someMonthLimit)
      }
      return revenueConsolidatedFact
  }
  let revenueConsolidatedFact = generateRevenueConsolidatedFact();

  if (year == 2023) {
    currRevenue = baseRevenue + Math.floor(Math.random()* baseRevenue) * (Math.random() < 0.5 ? -1 : 1);
    currProfit = currRevenue * 0.02 - Math.floor(Math.random()* currRevenue * 0.02);
    EBITDAdiff = Math.floor(Math.random() * 10000)
    currEBITDA = currProfit + EBITDAdiff;
  }


  const profitConsolidatedEBITDA = {};
  for (let i = 1; i <= 12; i++) {
    const daysInMonth = [];
    for (let j = 1; j <= howMuchDays(year, i); j++) {
      daysInMonth.push(j)
    }
    const someMonthLimit = currEBITDA + Math.floor(Math.random()* currEBITDA) * (Math.random() < 0.5 ? -1 : 1)
    profitConsolidatedEBITDA[i] = generateValuesInRange(daysInMonth, someMonthLimit)
  } 

    // BAD
    const checkValues = (bigger, lesser) => {
        for (let month in bigger) {
            for (let day in bigger[month]) {
                if (bigger[month][day] < lesser[month][day]) {
                    let val = lesser[month][day]
                    lesser[month][day] = bigger[month][day]
                    bigger[month][day] = val
                }
            }
        }
        return true
    }   

    


  // надо переписать на конкретные значения факт выручки
  const generateRevenueConsolidatedProfit = () => {
    let curr
      const revenueConsolidatedProfit = {};
      for (let i = 1; i <= 12; i++) {
        const daysInMonth = [];
        for (let j = 1; j <= howMuchDays(year, i); j++) {
          daysInMonth.push(j)
        }
        const someMonthLimit = currProfit + Math.floor(Math.random()* currProfit) * (Math.random() < 0.5 ? -1 : 1)
        revenueConsolidatedProfit[i] = generateValuesInRange(daysInMonth, someMonthLimit)
      }
      return revenueConsolidatedProfit;
  }
  let revenueConsolidatedProfit = generateRevenueConsolidatedProfit();


  let isTrully

  isTrully = checkValues(revenueConsolidatedFact, revenueConsolidatedProfit);




  const getCurrentProfitability = () => {
    const result = {}
    let revenueConsolidatedSum = {}
    for (let month in revenueConsolidatedFact) {
        let sum = 0
        for (let day in revenueConsolidatedFact[month]) {
        sum += revenueConsolidatedFact[month][day]
        }
        revenueConsolidatedSum[month] = sum;
    }

    const profitConsolidatedSum = {}
    for (let month in revenueConsolidatedProfit) {
        let sum = 0
        for (let day in revenueConsolidatedProfit[month]) {
        sum += revenueConsolidatedProfit[month][day]
        }
        profitConsolidatedSum[month] = sum;
    }
        
    // BAD
    for (let month in revenueConsolidatedSum) {
      result[month] = Number(((profitConsolidatedSum[month] / revenueConsolidatedSum[month]) * 100).toFixed(2));
    }
    return result
  }


  const currentProfitability = getCurrentProfitability();



  
  const getCurrentProfitabilityMonth = () => {
    const result = {}
        for (let month in revenueConsolidatedFact) {
            for (let day in revenueConsolidatedFact[month]) {
                if (!result[month]) {
                    result[month] = {}
                }
                result[month][day] = Number(((revenueConsolidatedProfit[month][day] / revenueConsolidatedFact[month][day]) * 100).toFixed(2));
            }
        }
        return result
    }
    

  const currentProfitabilityMonth = getCurrentProfitabilityMonth()

  const expensesConsolidatedPlan = {};
  for (let i = 1; i <= 12; i++) {
    const daysInMonth = [];
    for (let j = 1; j <= howMuchDays(year, i); j++) {
      daysInMonth.push(j)
    }
    const someMonthLimit = expenses + Math.floor(Math.random()* 500000) * (Math.random() < 0.5 ? -1 : 1)
    expensesConsolidatedPlan[i] = generateValuesInRange(daysInMonth, someMonthLimit)
  }

  const expensesConsolidatedFact = {};
  for (let i = 1; i <= 12; i++) {
    const daysInMonth = [];
    for (let j = 1; j <= howMuchDays(year, i); j++) {
      daysInMonth.push(j)
    }
    const someMonthLimit = expenses + Math.floor(Math.random()* 500000) * (Math.random() < 0.5 ? -1 : 1)
    expensesConsolidatedFact[i] = generateValuesInRange(daysInMonth, someMonthLimit)
  }

  const revenueCostRatioLeft = generateValuesInRange([1, 2, 3, 4], currRevenue)
  let arrRevenueCostRatioLeft = []
  for(let key in revenueCostRatioLeft) {
    arrRevenueCostRatioLeft.push(revenueCostRatioLeft[key])
  }

  const revenueCostRatioRight = generateValuesInRange([1, 2, 3, 4], currRevenue * (currExpenses / 100))
  let arrRevenueCostRatioRight = []
  for(let key in revenueCostRatioRight) {
    arrRevenueCostRatioRight.push(revenueCostRatioRight[key])
  }

  let leftNames = ['pipes','polyethylene', 'polycarbonate', 'organic_chemistry']
  let rightNames = ['raw_material','transport', 'amortization', 'FOT']
  let namesData = []
  leftNames.forEach(item => namesData.push({"name": item}))
  rightNames.forEach(item => namesData.push({"name": item}))


  // todo revenue_cost_ratio
  const generateLink = (source, target, value = false) => {
    return {
        "source": source,
        "target": target,
        "value": getSankeyValue(source, target, year),
        // "value": Math.round(Math.random())
    }
  }

  const generateLinks = () => {
    let links = []
    for (let leftName of leftNames) {
        for (let rightName of rightNames) {
            links.push(generateLink(leftName, rightName))
        }
    }
    return links
  }
  // 
  const finances = {
    "revenue": currRevenue,
    "profit": currProfit,
    "EBITDA": currEBITDA,
    "expenses": currExpenses,
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
    "revenue_cost_ratio": {
        "left_values": arrRevenueCostRatioLeft,
        "right_values": arrRevenueCostRatioRight,
        "data": namesData,
        "links": generateLinks()
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
  // нужно дополнительно чекнуть, что числа после округления сходятся
  // дописать логику проверки diff_percent и diff_percent_color
// 
// 
// 
  // доставка и качество
  const currProduced = baseProduced + Math.floor(Math.random()* baseProduced) * (Math.random() < 0.5 ? -1 : 1);
  const currShipped = currProduced - Math.floor(Math.random()* currProduced);
  const defective = currShipped * (Math.floor(Math.random() * 20)/100);
  const currDefective = (defective / currProduced) * 100;

  const producedConsolidatedPlan = {};
  for (let i = 1; i <= 12; i++) {
    const daysInMonth = [];
    for (let j = 1; j <= howMuchDays(year, i); j++) {
      daysInMonth.push(j)
    }
    const someMonthLimit = currProduced + Math.floor(Math.random()* currProduced) * (Math.random() < 0.5 ? -1 : 1)
    producedConsolidatedPlan[i] = generateValuesInRange(daysInMonth, someMonthLimit)
  }

  const producedConsolidatedFact = {};
  for (let i = 1; i <= 12; i++) {
    const daysInMonth = [];
    for (let j = 1; j <= howMuchDays(year, i); j++) {
      daysInMonth.push(j)
    }
    const someMonthLimit = currProduced + Math.floor(Math.random()* currProduced) * (Math.random() < 0.5 ? -1 : 1)
    producedConsolidatedFact[i] = generateValuesInRange(daysInMonth, someMonthLimit)
  }

  const shippedConsolidatedPlan = {};
  for (let i = 1; i <= 12; i++) {
    const daysInMonth = [];
    for (let j = 1; j <= howMuchDays(year, i); j++) {
      daysInMonth.push(j)
    }
    const someMonthLimit = currShipped + Math.floor(Math.random()* currShipped) * (Math.random() < 0.5 ? -1 : 1)
    shippedConsolidatedPlan[i] = generateValuesInRange(daysInMonth, someMonthLimit)
  }

  const shippedConsolidatedFact = {};
  for (let i = 1; i <= 12; i++) {
    const daysInMonth = [];
    for (let j = 1; j <= howMuchDays(year, i); j++) {
      daysInMonth.push(j)
    }
    const someMonthLimit = currShipped + Math.floor(Math.random()* currShipped) * (Math.random() < 0.5 ? -1 : 1)
    shippedConsolidatedFact[i] = generateValuesInRange(daysInMonth, someMonthLimit)
  }

  const generateRequisitions = () => {
    const requisitions = [];
    for (let i = 0; i <= Math.floor(Math.random() * (100 - 10) + 10); i++) {
        let plan = Math.floor(Math.random() * (200000 - 50000) + 50000)
        let fact = Math.floor(Math.random() * (300000 - 50000) + 50000)
        let color = 2;
        if (fact > plan) {
            color = 1
        } else {
            color = 3
        }
        let day = Math.floor(Math.random() * (28 - 1) + 1)
      const requisition = {
        "requisition_number": `${year}-${i}-${Math.floor(Math.random() * 1000)}`,
        "region": regions[Math.floor(Math.random() * regions.length)],
        "product": typesMapper[type],
        "delivery_time": Math.floor(Math.random() * (20 - 1) + 1),
        "delivery_date": `${day >= 10 ? day : '0' + String(day)}.${month >= 10 ? month : '0' + String(month)}.${year}`,
        "plan": plan,
        "fact": fact,
        "color": color,
        "non_compliance_reason": (color == 3) ? reasons[Math.floor(Math.random() * reasons.length)] : 'Нет'
      };
      requisitions.push(requisition);
    }
    return requisitions;
  }

  const reqList = generateRequisitions();

  const generateMapData = () => {
    let r1_1 = (Math.random() * 5).toFixed(1)
    let r1_2 = (Math.random() * 5).toFixed(1)
    let r1_3 = (Math.random() * 5).toFixed(1)
    let r2_1 = (Math.random() * 5).toFixed(1)
    let r2_2 = (Math.random() * 5).toFixed(1)
    let r2_3 = (Math.random() * 5).toFixed(1)
    let r3_1 = (Math.random() * 5).toFixed(1)
    let r3_2 = (Math.random() * 5).toFixed(1)
    let r3_3 = (Math.random() * 5).toFixed(1)
    let r4_1 = (Math.random() * 5).toFixed(1)
    let r4_2 = (Math.random() * 5).toFixed(1)
    let r4_3 = (Math.random() * 5).toFixed(1)
    let r5_1 = (Math.random() * 5).toFixed(1)
    let r5_2 = (Math.random() * 5).toFixed(1)
    let r5_3 = (Math.random() * 5).toFixed(1)
    let r6_1 = (Math.random() * 5).toFixed(1)
    let r6_2 = (Math.random() * 5).toFixed(1)
    let r6_3 = (Math.random() * 5).toFixed(1)
    let r7_1 = (Math.random() * 5).toFixed(1)
    let r7_2 = (Math.random() * 5).toFixed(1)
    let r7_3 = (Math.random() * 5).toFixed(1)
    let r8_1 = (Math.random() * 5).toFixed(1)
    let r8_2 = (Math.random() * 5).toFixed(1)
    let r8_3 = (Math.random() * 5).toFixed(1)
    let r9_1 = (Math.random() * 5).toFixed(1)
    let r9_2 = (Math.random() * 5).toFixed(1)
    let r9_3 = (Math.random() * 5).toFixed(1)
    let r10_1 = (Math.random() * 5).toFixed(1)
    let r10_2 = (Math.random() * 5).toFixed(1)
    let r10_3 = (Math.random() * 5).toFixed(1)
    let r11_1 = (Math.random() * 5).toFixed(1)
    let r11_2 = (Math.random() * 5).toFixed(1)
    let r11_3 = (Math.random() * 5).toFixed(1)
    let r12_1 = (Math.random() * 5).toFixed(1)
    let r12_2 = (Math.random() * 5).toFixed(1)
    let r12_3 = (Math.random() * 5).toFixed(1)
    return [
        {
            "name": "Московская область",
            "okato": "46000000000",
            "timeliness": r1_1,
            "equipment": r1_2,
            "quality": r1_3,
            "value": [38, 56, ((Number(r1_1) + Number(r1_2) + Number(r1_3))/3).toFixed(1)]
        },
        {
            "name": "Тамбовская область",
            "okato": "68000000000",
            "timeliness": r2_1,
            "equipment": r2_2,
            "quality": r2_3,
            "value": [41.5, 52.5, ((Number(r2_1) + Number(r2_2) + Number(r2_3))/3).toFixed(1)]
        },
        {
            "name": "Волгоградская область",
            "okato": "18000000000",
            "timeliness": r3_1,
            "equipment": r3_2,
            "quality": r3_3,
            "value": [44.5, 49.5, ((Number(r3_1) + Number(r3_2) + Number(r3_3))/3).toFixed(1)]
        },
        {
            "name": "Томская область",
            "okato": "69000000000",
            "timeliness": r4_1,
            "equipment": r4_2,
            "quality": r4_3,
            "value": [81, 58.5, ((Number(r4_1) + Number(r4_2) + Number(r4_3))/3).toFixed(1)]
        },
        {
            "name": "Амурская область",
            "okato": "10000000000",
            "timeliness": r5_1,
            "equipment": r5_2,
            "quality": r5_3,
            "value": [128, 54, ((Number(r5_1) + Number(r5_2) + Number(r5_3))/3).toFixed(1)]
        },
        {
            "name": "Красноярский край",
            "okato": "04000000000",
            "timeliness": r6_1,
            "equipment": r6_2,
            "quality": r6_3,
            "value": [96, 65, ((Number(r6_1) + Number(r6_2) + Number(r6_3))/3).toFixed(1)]
        },
        {
            "name": "Республика Саха (Якутия)",
            "okato": "98000000000",
            "timeliness": r7_1,
            "equipment": r7_2,
            "quality": r7_3,
            "value": [123, 65, ((Number(r7_1) + Number(r7_2) + Number(r7_3))/3).toFixed(1)]
        },
        {
            "name": "Республика Татарстан (Татарстан)",
            "okato": "92000000000",
            "timeliness": r8_1,
            "equipment": r8_2,
            "quality": r8_3,
            "value": [52, 55, ((Number(r8_1) + Number(r8_2) + Number(r8_3))/3).toFixed(1)]
        },
        {
            "name": "Архангельская область",
            "okato": "11000000000",
            "timeliness": r9_1,
            "equipment": r9_2,
            "quality": r9_3,
            "value": [42, 64, ((Number(r9_1) + Number(r9_2) + Number(r9_3))/3).toFixed(1)]
        },
        {
            "name": "Ненецкий автономный округ",
            "okato": "11100000000",
            "timeliness": r10_1,
            "equipment": r10_2,
            "quality": r10_3,
            "value": [55, 68, ((Number(r10_1) + Number(r10_2) + Number(r10_3))/3).toFixed(1)]
        },
        {
            "name": "Чукотский автономный округ",
            "okato": "77000000000",
            "timeliness": r11_1,
            "equipment": r11_2,
            "quality": r11_3,
            "value": [169, 67, ((Number(r11_1) + Number(r11_2) + Number(r11_3))/3).toFixed(1)]
        }
    ]
  }

  const del_n_qual = {
    "produced": currProduced,
    "shipped": currShipped,
    "defective": currDefective,
    "produced_consolidated": {
        "plan": producedConsolidatedPlan,
        "fact": producedConsolidatedFact
    },
    "shipped_consolidated": {
        "plan": shippedConsolidatedPlan,
        "fact": shippedConsolidatedFact
    },
    "requisitions": reqList,
    "map": generateMapData(),
    "produced_diff": "0",
    "produced_diff_color": "0",
    "shipped_diff": "0",
    "shipped_diff_color": "0",
    "defective_diff": "0",
    "defective_diff_color": "0"
}

  const monthResult = {
    'security_and_morale': sec_n_morale,
    'finance': finances,
    'delivery_and_quality': del_n_qual,
  }
  return monthResult
}

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

const generateAllFilterData = (yearData) => {
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

for (let type in result) {
  if (type !== "all") {
    for (let year = 2021; year <= 2023; year++) {
      result[type][year] = {}
      for (let month = 1; month <= 12; month++) {
        result[type][year][month] = generateMonthData(null, year, month, type);
      }
      result[type][year]['all'] = generateAllFilterData(result[type][year]);
    }
  }
}

const calcDiffs = (prevMonthData, currMonthData, isFirst = false) => {
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
            let diff = diffValue / prev * 100;
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

// generate all industry types data
for (let type in result) {
    if (type !== "all") {
      for (let year = 2021; year <= 2023; year++) {
        result[type][year] = {}
        for (let month = 1; month <= 12; month++) {
          result[type][year][month] = generateMonthData(null, year, month);
          if (month == 1) {
            let prevYear = year-1
            if (prevYear >= 2021) {
                calcDiffs(result[type][year-1][12], result[type][year][month])
            } else {
                calcDiffs(null, null, true)
            }
          } else {
            calcDiffs(result[type][year][month-1], result[type][year][month])
          }
          
        }
        result[type][year]['all'] = generateAllFilterData(result[type][year]);
        let prevYear = year-1
        if (prevYear >= 2021) {
            calcDiffs(result[type][year-1]['all'], result[type][year]['all'])
        }
      }
    }
  }

const generateAllTypesData = () => {
    // first mock
    let resultAllData = JSON.parse(JSON.stringify(result['pipes']));
    console.log(1)
    for (let year in resultAllData) {
        for (let month in resultAllData[year]) {
            for (let tab in resultAllData[year][month]) {
                if (tab == 'delivery_and_quality') {
                    // +
                    let defectiveSum = 0
                    for (let type of types) {
                        defectiveSum += result[type][year][month]['delivery_and_quality']['defective']
                    }
                    resultAllData[year][month]['delivery_and_quality']['defective'] = defectiveSum/4;
                    // todo change percent logic
                    let defectiveDiffSum = 0
                    for (let type of types) {
                        // defectiveDiffSum += result[type][year][month]['delivery_and_quality']['defective_diff']
                    }
                    resultAllData[year][month]['delivery_and_quality']['defective_diff'] = defectiveDiffSum;
                    // todo make defective diff color logic
                    let defectiveDiffColor = 2
                    resultAllData[year][month]['delivery_and_quality']['defective_diff_color'] = defectiveDiffColor;

                    let map = resultAllData[year][month]['delivery_and_quality']['map']
                    map.map(item => {
                        let itemTime = 0
                        for (let type of types) {
                            itemTime += Number(result[type][year][month]['delivery_and_quality']['map'].find(el => el.name == item.name).timeliness);
                        }
                        itemTime = Number(itemTime/types.length).toFixed(1)
                        item.timeliness = itemTime

                        let itemEq = 0
                        for (let type of types) {
                            itemEq += Number(result[type][year][month]['delivery_and_quality']['map'].find(el => el.name == item.name).equipment);
                        }
                        itemEq = Number(itemTime/types.length).toFixed(1)
                        item.equipment = itemEq

                        let itemQu = 0
                        for (let type of types) {
                            itemQu += Number(result[type][year][month]['delivery_and_quality']['map'].find(el => el.name == item.name).quality);
                        }
                        itemQu = Number(itemQu/types.length).toFixed(1)
                        item.quality = itemQu
                        item.value[2] = ((Number(itemQu) + Number(itemEq) + Number(itemTime))/3).toFixed(1)
                    })    
                    resultAllData[year][month]['delivery_and_quality']['map'] = map;

                    let producedSum = 0
                    for (let type of types) {
                        producedSum += result[type][year][month]['delivery_and_quality']['produced']
                    }
                    resultAllData[year][month]['delivery_and_quality']['produced'] = producedSum;

                    let producedConsolidatedPlanSum = resultAllData[year][month]['delivery_and_quality']['produced_consolidated']['plan']
                    for (let month in producedConsolidatedPlanSum) {
                        for (let day in producedConsolidatedPlanSum[month]) {
                            let sum = 0
                            for (let type of types) {
                                sum += result[type][year][month]['delivery_and_quality']['produced_consolidated']['plan'][month][day]
                            }
                            producedConsolidatedPlanSum[month][day] = sum
                        }
                    }
                    resultAllData[year][month]['delivery_and_quality']['produced_consolidated']['plan'] = producedConsolidatedPlanSum;

                    let producedConsolidatedFactSum = resultAllData[year][month]['delivery_and_quality']['produced_consolidated']['fact']
                    for (let month in producedConsolidatedFactSum) {
                        for (let day in producedConsolidatedFactSum[month]) {
                            let sum = 0
                            for (let type of types) {
                                sum += result[type][year][month]['delivery_and_quality']['produced_consolidated']['fact'][month][day]
                            }
                            producedConsolidatedFactSum[month][day] = sum
                        }
                    }
                    resultAllData[year][month]['delivery_and_quality']['produced_consolidated']['fact'] = producedConsolidatedFactSum;

                    // todo change percent diff
                    let producedDiff = 0
                    for (let type of types) {
                        // producedDiff += result[type][year][month]['delivery_and_quality']['produced_diff']
                    }
                    resultAllData[year][month]['delivery_and_quality']['produced_diff'] = producedDiff;

                    // todo create color logic
                    let producedDiffColor = 2
                    resultAllData[year][month]['delivery_and_quality']['produced_diff_color'] = producedDiffColor;

                    let requisitions = []
                    for (let type of types) {
                        requisitions = [...requisitions, ...result[type][year][month]['delivery_and_quality']['requisitions']]
                    }
                    resultAllData[year][month]['delivery_and_quality']['requisitions'] = requisitions;

                    let shippedSum = 0
                    for (let type of types) {
                        shippedSum += result[type][year][month]['delivery_and_quality']['shipped']
                    }
                    resultAllData[year][month]['delivery_and_quality']['shipped'] = shippedSum;

                    let shippedConsolidatedFactSum = resultAllData[year][month]['delivery_and_quality']['shipped_consolidated']['fact']
                    for (let month in shippedConsolidatedFactSum) {
                        for (let day in shippedConsolidatedFactSum[month]) {
                            let sum = 0
                            for (let type of types) {
                                sum += result[type][year][month]['delivery_and_quality']['shipped_consolidated']['fact'][month][day]
                            }
                            shippedConsolidatedFactSum[month][day] = sum
                        }
                    }
                    resultAllData[year][month]['delivery_and_quality']['shipped_consolidated']['fact'] = shippedConsolidatedFactSum;

                    let shippedConsolidatedPlanSum = resultAllData[year][month]['delivery_and_quality']['shipped_consolidated']['plan']
                    for (let month in shippedConsolidatedPlanSum) {
                        for (let day in shippedConsolidatedPlanSum[month]) {
                            let sum = 0
                            for (let type of types) {
                                sum += result[type][year][month]['delivery_and_quality']['shipped_consolidated']['plan'][month][day]
                            }
                            shippedConsolidatedPlanSum[month][day] = sum
                        }
                    }
                    resultAllData[year][month]['delivery_and_quality']['shipped_consolidated']['plan'] = shippedConsolidatedPlanSum;


                    // todo change percent diff
                    let shippedDiff = 0
                    for (let type of types) {
                        // shippedDiff += result[type][year][month]['delivery_and_quality']['shipped_diff']
                    }
                    resultAllData[year][month]['delivery_and_quality']['shipped_diff'] = shippedDiff;
                    // todo create color logic
                    let shippedDiffColor = 2
                    resultAllData[year][month]['delivery_and_quality']['shipped_diff_color'] = shippedDiffColor;
                }
                if (tab == 'finance') {
                    let EBITDASum = 0
                    for (let type of types) {
                        EBITDASum += result[type][year][month][tab]['EBITDA']
                    }
                    resultAllData[year][month][tab]['EBITDA'] = EBITDASum;

                    // todo change percent diff
                    let EBITDADiff = 0
                    for (let type of types) {
                        // EBITDADiff += result[type][year][month][tab]['EBITDA_diff']
                    }
                    resultAllData[year][month][tab]['EBITDA_diff'] = EBITDADiff;
                    // todo create color logic
                    let EBITDADiffColor = 2
                    resultAllData[year][month][tab]['EBITDA_diff_color'] = EBITDADiffColor;


                    let expensesSum = 0
                    for (let type of types) {
                        expensesSum += result[type][year][month][tab]['expenses']
                    }
                    resultAllData[year][month][tab]['expenses'] = expensesSum/4;


                    let expensesConsolidatedPlanSum = resultAllData[year][month][tab]['expenses_consolidated']['plan']
                    for (let month in expensesConsolidatedPlanSum) {
                        for (let day in expensesConsolidatedPlanSum[month]) {
                            let sum = 0
                            for (let type of types) {
                                sum += result[type][year][month][tab]['expenses_consolidated']['plan'][month][day]
                            }
                            expensesConsolidatedPlanSum[month][day] = sum
                        }
                    }
                    resultAllData[year][month][tab]['expenses_consolidated']['plan'] = expensesConsolidatedPlanSum;

                    let expensesConsolidatedFactSum = resultAllData[year][month][tab]['expenses_consolidated']['fact']
                    for (let month in expensesConsolidatedFactSum) {
                        for (let day in expensesConsolidatedFactSum[month]) {
                            let sum = 0
                            for (let type of types) {
                                sum += result[type][year][month][tab]['expenses_consolidated']['fact'][month][day]
                            }
                            expensesConsolidatedFactSum[month][day] = sum
                        }
                    }
                    resultAllData[year][month][tab]['expenses_consolidated']['fact'] = expensesConsolidatedFactSum;

                    // todo change percent diff
                    let expensesDiff = 0
                    for (let type of types) {
                        // expensesDiff += result[type][year][month][tab]['expenses_diff']
                    }
                    resultAllData[year][month][tab]['expenses_diff'] = expensesDiff;
                    // todo create color logic
                    let expensesDiffColor = 2
                    resultAllData[year][month][tab]['expenses_diff_color'] = expensesDiffColor;


                    let profitSum = 0
                    for (let type of types) {
                        profitSum += result[type][year][month][tab]['profit']
                    }
                    resultAllData[year][month][tab]['profit'] = profitSum;


                    let EBITDAConsolidatedSum = resultAllData[year][month][tab]['profit_consolidated']['EBITDA']
                    for (let month in EBITDAConsolidatedSum) {
                        for (let day in EBITDAConsolidatedSum[month]) {
                            let sum = 0
                            for (let type of types) {
                                sum += result[type][year][month][tab]['profit_consolidated']['EBITDA'][month][day]
                            }
                            EBITDAConsolidatedSum[month][day] = sum
                        }
                    }
                    resultAllData[year][month][tab]['profit_consolidated']['EBITDA'] = EBITDAConsolidatedSum;


                    let profitConsolidatedSum = resultAllData[year][month][tab]['profit_consolidated']['profit']
                    for (let month in profitConsolidatedSum) {
                        for (let day in profitConsolidatedSum[month]) {
                            let sum = 0
                            for (let type of types) {
                                sum += result[type][year][month][tab]['profit_consolidated']['profit'][month][day]
                            }
                            profitConsolidatedSum[month][day] = sum
                        }
                    }
                    resultAllData[year][month][tab]['profit_consolidated']['profit'] = profitConsolidatedSum;

                    // todo change logic
                    let profitabilitySum = resultAllData[year][month][tab]['profit_consolidated']['profitability']
                    for (let month in profitabilitySum) {
                        let sum = 0
                        for (let type of types) {
                            sum += Number((result[type][year][month][tab]['profit_consolidated']['profitability'][month]).toFixed(2))
                        }
                        profitabilitySum[month] = Number((sum/4).toFixed(2))
                    }
                    resultAllData[year][month][tab]['profit_consolidated']['profitability'] = profitabilitySum;
                    console.log(profitabilitySum)


                    let profitabilityMonthConsolidatedSum = resultAllData[year][month][tab]['profit_consolidated']['profitability_month_detalized']
                    for (let month in profitabilityMonthConsolidatedSum) {
                        for (let day in profitabilityMonthConsolidatedSum[month]) {
                            let sum = 0
                            for (let type of types) {
                                sum += result[type][year][month][tab]['profit_consolidated']['profitability_month_detalized'][month][day]
                            }
                            profitabilityMonthConsolidatedSum[month][day] = sum
                        }
                    }
                    resultAllData[year][month][tab]['profit_consolidated']['profitability_month_detalized'] = profitabilityMonthConsolidatedSum;

                    // todo change percent diff
                    let profitDiff = 0
                    for (let type of types) {
                        // profitDiff += result[type][year][month][tab]['profit_diff']
                    }
                    resultAllData[year][month][tab]['profit_diff'] = profitDiff;
                    // todo create color logic
                    let profitDiffColor = 2
                    resultAllData[year][month][tab]['profit_diff_color'] = profitDiffColor;

                    let revenueSum = 0
                    for (let type of types) {
                        revenueSum += result[type][year][month][tab]['revenue']
                    }
                    resultAllData[year][month][tab]['revenue'] = revenueSum;





                    let revenueConsolidatedPlanSum = resultAllData[year][month][tab]['revenue_consolidated']['plan']
                    for (let month in revenueConsolidatedPlanSum) {
                        for (let day in revenueConsolidatedPlanSum[month]) {
                            let sum = 0
                            for (let type of types) {
                                sum += result[type][year][month][tab]['revenue_consolidated']['plan'][month][day]
                            }
                            revenueConsolidatedPlanSum[month][day] = sum
                        }
                    }
                    resultAllData[year][month][tab]['revenue_consolidated']['plan'] = revenueConsolidatedPlanSum;

                    let revenueConsolidatedFactSum = resultAllData[year][month][tab]['revenue_consolidated']['fact']
                    for (let month in revenueConsolidatedFactSum) {
                        for (let day in revenueConsolidatedFactSum[month]) {
                            let sum = 0
                            for (let type of types) {
                                sum += result[type][year][month][tab]['revenue_consolidated']['fact'][month][day]
                            }
                            revenueConsolidatedFactSum[month][day] = sum
                        }
                    }
                    resultAllData[year][month][tab]['revenue_consolidated']['fact'] = revenueConsolidatedFactSum;

                    // todo logic
                    let revenueCostRatioSum = resultAllData[year][month][tab]['revenue_cost_ratio']
                    revenueCostRatioSum['left_values'] = [0, 0, 0, 0]
                    revenueCostRatioSum['right_values'] = [0, 0, 0, 0]
                    for (let type of types) {
                        revenueCostRatioSum['left_values'][0] += result[type][year][month][tab]['revenue_cost_ratio']['left_values'][0]
                        revenueCostRatioSum['left_values'][1] += result[type][year][month][tab]['revenue_cost_ratio']['left_values'][1]
                        revenueCostRatioSum['left_values'][2] += result[type][year][month][tab]['revenue_cost_ratio']['left_values'][2]
                        revenueCostRatioSum['left_values'][3] += result[type][year][month][tab]['revenue_cost_ratio']['left_values'][3]

                        revenueCostRatioSum['right_values'][0] += result[type][year][month][tab]['revenue_cost_ratio']['right_values'][0]
                        revenueCostRatioSum['right_values'][1] += result[type][year][month][tab]['revenue_cost_ratio']['right_values'][1]
                        revenueCostRatioSum['right_values'][2] += result[type][year][month][tab]['revenue_cost_ratio']['right_values'][2]
                        revenueCostRatioSum['right_values'][3] += result[type][year][month][tab]['revenue_cost_ratio']['right_values'][3]
                    }
                    resultAllData[year][month][tab]['revenue_cost_ratio'] = revenueCostRatioSum;


                    // todo change percent diff
                    let revenueDiff = 0
                    for (let type of types) {
                        // revenueDiff += result[type][year][month][tab]['revenue_diff']
                    }
                    resultAllData[year][month][tab]['revenue_diff'] = revenueDiff;
                    // todo create color logic
                    let revenueDiffColor = 2
                    resultAllData[year][month][tab]['revenue_diff_color'] = revenueDiffColor;
                }
                if (tab == 'security_and_morale') {
                    let additional_shifts_hoursSum = 0
                    for (let type of types) {
                        additional_shifts_hoursSum += result[type][year][month][tab]['additional_shifts_hours']
                    }
                    resultAllData[year][month][tab]['additional_shifts_hours'] = additional_shifts_hoursSum;

                    // todo change percent diff
                    let additional_shifts_hoursDiff = 0
                    for (let type of types) {
                        additional_shifts_hoursDiff += result[type][year][month][tab]['additional_shifts_hours_diff_percent']
                    }
                    resultAllData[year][month][tab]['additional_shifts_hours_diff_percent'] = additional_shifts_hoursDiff;
                    // todo create color logic
                    let additional_shifts_hoursDiffColor = 2
                    resultAllData[year][month][tab]['additional_shifts_hours_diff_percent_color'] = additional_shifts_hoursDiffColor;



                    // todo change logic
                    let satisSum = resultAllData[year][month][tab]['employee_satisfaction']
                    for (let status in satisSum) {
                        let sum = 0
                        for (let type of types) {
                            sum += result[type][year][month][tab]['employee_satisfaction'][status]
                        }
                        satisSum[status] = sum/types.length
                    }
                    resultAllData[year][month][tab]['employee_satisfaction'] = satisSum;

                    for (let key in resultAllData[year][month][tab]['equipment_lifetime']) {
                        let eqSum = resultAllData[year][month][tab]['equipment_lifetime'][key]
                        for (let status in eqSum) {
                            let sum = 0
                            for (let type of types) {
                                sum += result[type][year][month][tab]['equipment_lifetime'][key][status]
                            }
                            eqSum[status] = sum/types.length
                        }
                        resultAllData[year][month][tab]['equipment_lifetime'][key] = eqSum;
                    }


                    for (let key in resultAllData[year][month][tab]['events']) {
                        let eqSum = resultAllData[year][month][tab]['events'][key]
                        for (let status in eqSum) {
                            let sum = 0
                            for (let type of types) {
                                sum += result[type][year][month][tab]['events'][key][status]
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
                                for (let type of types) {
                                    sum += result[type][year][month][tab]['events_detalization'][eventType][key][status]
                                }
                                eqSum[status] = sum
                            }
                            resultAllData[year][month][tab]['events_detalization'][eventType][key] = eqSum;
                        }
                    }


                    let fluiditySum = 0
                    for (let type of types) {
                        fluiditySum += result[type][year][month][tab]['fluidity']
                    }
                    resultAllData[year][month][tab]['fluidity'] = fluiditySum/4;


                    // todo change percent diff
                    let fluidityDiff = 0
                    for (let type of types) {
                        // fluidityDiff += result[type][year][month][tab]['fluidity_diff_percent']
                    }
                    resultAllData[year][month][tab]['fluidity_diff_percent'] = fluidityDiff;
                    // todo create color logic
                    let fluidityDiffColor = 2
                    resultAllData[year][month][tab]['fluidity_diff_percent_color'] = fluidityDiffColor;




                    for (let key in resultAllData[year][month][tab]['incident_categories']) {
                        let eqSum = resultAllData[year][month][tab]['incident_categories'][key]
                        for (let status in eqSum) {
                            let sum = 0
                            for (let type of types) {
                                sum += result[type][year][month][tab]['incident_categories'][key][status]
                            }
                            eqSum[status] = sum
                        }
                        resultAllData[year][month][tab]['incident_categories'][key] = eqSum;
                    }


                    let incidentsSum = 0
                    for (let type of types) {
                        incidentsSum += result[type][year][month][tab]['incidents']
                    }
                    resultAllData[year][month][tab]['incidents'] = incidentsSum;

                    let incidentsMaxSum = 0
                    for (let type of types) {
                        incidentsMaxSum += result[type][year][month][tab]['incidents_max']
                    }
                    resultAllData[year][month][tab]['incidents_max'] = incidentsMaxSum;

                    let incidents_affectedSum = 0
                    for (let type of types) {
                        incidents_affectedSum += result[type][year][month][tab]['incidents_affected']
                    }
                    resultAllData[year][month][tab]['incidents_affected'] = incidents_affectedSum;

                    let incidents_outage_hoursSum = 0
                    for (let type of types) {
                        incidents_outage_hoursSum += result[type][year][month][tab]['incidents_outage_hours']
                    }
                    resultAllData[year][month][tab]['incidents_outage_hours'] = incidents_outage_hoursSum;


                    let numberSum = 0
                    for (let type of types) {
                        numberSum += result[type][year][month][tab]['number']
                    }
                    resultAllData[year][month][tab]['number'] = numberSum;

                    // todo change percent diff
                    let numberDiff = 0
                    for (let type of types) {
                        // numberDiff += result[type][year][month][tab]['number_diff_percent']
                    }
                    resultAllData[year][month][tab]['number_diff_percent'] = numberDiff;
                    // todo create color logic
                    let numberDiffColor = 2
                    resultAllData[year][month][tab]['number_diff_percent_color'] = numberDiffColor;
                }
            }
        }
    }
    return resultAllData
}

result['all'] = generateAllTypesData()

for (let type in result) {
    if (type == "all") {
      for (let year = 2021; year <= 2023; year++) {
        for (let month = 1; month <= 12; month++) {
          if (month == 1) {
            let prevYear = year-1
            if (prevYear >= 2021) {
                calcDiffs(result[type][year-1][12], result[type][year][month])
            } else {
                calcDiffs(null, null, true)
            }
          } else {
            calcDiffs(result[type][year][month-1], result[type][year][month])
          }
          
        }
        let prevYear = year-1
        if (prevYear >= 2021) {
            calcDiffs(result[type][year-1]['all'], result[type][year]['all'])
        }
      }
    }
  }

for (let type in result) {
    for (let year in result[type]) {
        for (let month in result[type][year]) {
            let profitability = result[type][year][month]['finance']['profit_consolidated']['profitability']
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
            result[type][year][month]['delivery_and_quality']['map'].forEach(item => {
                timeliness += item.timeliness
                counter++
            })

            timeliness = timeliness/counter
            let dColor = (timeliness <= 3) ? 3 : (timeliness <= 4) ? 2 : 1;



            counter = 0
            let defective = result[type][year][month]['delivery_and_quality']['defective']
            let qColor = (defective <= 5) ? 1 : (defective <= 10) ? 2 : 3;


            counter = 0
            let incidents = result[type][year][month]['security_and_morale']['incident_categories']['trauma'] / (result[type][year][month]['security_and_morale']['incident_categories']['trauma'] + result[type][year][month]['security_and_morale']['incident_categories']['outage']) * 100
            let sColor = (incidents <= 5) ? 1 : (incidents <= 10) ? 2 : 3;

            
            counter = 0
            let fluidity = result[type][year][month]['security_and_morale']['fluidity']
            let mColor = (fluidity <= 25) ? 1 : (fluidity <= 50) ? 2 : 3;



            result[type][year][month]['letters_color'] = {
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

// clear
const clearFutureData = () => {
    for (let type in result) {
        for (let year in result[type]) {
            for (let month in result[type][year]) {
                    
                }
            }
        }
}
clearFutureData()


const data = JSON.stringify(result);
// writing the JSON string content to a file
fs.writeFile("industrial_data_v3.json", data, (error) => {
  // throwing the error
  // in case of a writing problem
  if (error) {
    // logging the error
    console.error(error);

    throw error;
  }

  console.log("data.json written correctly");
});
// // WRITE TO VUE
fs.writeFile("../industrial_vue/app3/src/assets/industrial_data.json", data, (error) => {
    // throwing the error
    // in case of a writing problem
    if (error) {
      // logging the error
      console.error(error);
  
      throw error;
    }
  
    console.log("data.json written correctly to Vue");
});

