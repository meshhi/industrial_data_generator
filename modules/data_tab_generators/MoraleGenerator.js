class MoraleGenerator {
    constructor() {
        this.structure = {
            "number": 0,
            "fluidity": 0,
            "additional_shifts_hours": 0,
            "events": {
                "training_events": 0,
                "workplace_improvements": 0,
                "wellness_events": 0
            },
            "events_detalization": {
                "training_events": {
                    'Курсы повышения квалификации': 0,
                    'Конференции': 0,
                    'Обмен опытом с другими предприятиями': 0,
                },
                "workplace_improvements": {
                    'Замена мебели': 0,
                    'Клининг': 0,
                    'Контроль работы системы вентиляции': 0,
                },
                "wellness_events": {
                    'Турнир по футболу': 0,
                    'Марафон': 0,
                    'Семейные праздники': 0,
                    'Турнир по шахматам': 0,
                },
            },
            "employee_satisfaction": {
                'low': 0,
                'middle': 0,
                'high': 0
            },
            "incidents": 0,
            "incidents_max": 0,
            "incident_categories": {
                'outage': 0,
                'trauma': 0
            },
            "incidents_affected": 0,
            "incidents_outage_hours": 0,
            "equipment_lifetime": {
                "T": {
                    'more_than_5': 0, 
                    'from_1_to_5': 0, 
                    'less_than_1': 0,
                },
                "PE": {
                    'more_than_5': 0, 
                    'from_1_to_5': 0, 
                    'less_than_1': 0,
                },
                "PK": {
                    'more_than_5': 0, 
                    'from_1_to_5': 0, 
                    'less_than_1': 0,
                },
                "OX": {
                    'more_than_5': 0, 
                    'from_1_to_5': 0, 
                    'less_than_1': 0,
                }
            },
            "number_diff_percent": 0,
            "number_diff_percent_color": 0,
            "fluidity_diff_percent": 0,
            "fluidity_diff_percent_color": 0,
            "additional_shifts_hours_diff_percent": 0,
            "additional_shifts_hours_diff_percent_color": 0,
          }
    }

    generateData(custom, type, year, month) {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();
        if ((year > currentYear) || ((year == currentYear) && (month > currentMonth))) {
            console.log(`morale generation ignored on ${year}-${month} date!`)
        } else {
            // KPI
            this.structure.number = Math.floor(Math.random() * (1500 - 800) + 800);
            this.structure.fluidity = Number((Math.random() * (15 - 2) + 2).toFixed(2));
            this.structure.additional_shifts_hours = Math.floor(Math.random() * (200 - 100) + 100);
    
            const generateRandomParts = () => {
                let max = 100;
                let diff1 = Math.round(Math.random() * (30 - 10) + 10);
                max = max - diff1;
                let diff2 = Math.round(Math.random() * (max - 0) + 0);
                max = max - diff2;
        
                return [diff1, diff2, max];
            }
    
            // EMPLOYMENT SATISFACTION
            let [satisfactionParts1, satisfactionParts2, satisfactionParts3] = generateRandomParts();
            // CUSTOM VALUE
            if (year == 2023) {
                if (month == 1) {
                    if (type == 'polycarbonate') {
                        [satisfactionParts1, satisfactionParts2, satisfactionParts3] = [30, 57, 13]
                        this.structure.additional_shifts_hours = Math.floor(Math.random() * (300 - 200) + 200);
                        this.structure.number = Math.floor(Math.random() * (1200 - 1000) + 1000);
                    }
                }
                if (month == 2) {
                    if (type == 'polycarbonate') {
                        this.structure.additional_shifts_hours = Math.floor(Math.random() * (300 - 100) + 100);
                        [satisfactionParts1, satisfactionParts2, satisfactionParts3] = [45, 50, 5]
                        this.structure.number = Math.floor(Math.random() * (1000 - 900) + 900);
                    }
                }
            }
            this.structure.employee_satisfaction.low = satisfactionParts1;
            this.structure.employee_satisfaction.middle = satisfactionParts2;
            this.structure.employee_satisfaction.high = satisfactionParts3;
    
            // EQ_T
            const [part1, part2, part3] = generateRandomParts();
    
            this.structure.equipment_lifetime.T.more_than_5 = part1;
            this.structure.equipment_lifetime.T.from_1_to_5 = part2;
            this.structure.equipment_lifetime.T.less_than_1 = part3;
    
            // EQ_OX
            const [part11, part22, part33] = generateRandomParts();
    
            this.structure.equipment_lifetime.OX.more_than_5 = part11;
            this.structure.equipment_lifetime.OX.from_1_to_5 = part22;
            this.structure.equipment_lifetime.OX.less_than_1 = part33;
    
            // EQ_PE
            const [part111, part222, part333] = generateRandomParts();
    
            this.structure.equipment_lifetime.PE.more_than_5 = part111;
            this.structure.equipment_lifetime.PE.from_1_to_5 = part222;
            this.structure.equipment_lifetime.PE.less_than_1 = part333;
    
            // EQ_PK
            let [part1111, part2222, part3333] = generateRandomParts();

            // CUSTOM VALUE
            if (year == 2023) {
                if (month == 1) {
                    if (type == 'polycarbonate') {
                        [part1111, part2222, part3333] = [60, 20, 10]
                    }
                }
                if (month == 2) {
                    if (type == 'polycarbonate') {
                        [part1111, part2222, part3333] = [30, 20, 50]
                    }
                }
            }
    
            this.structure.equipment_lifetime.PK.more_than_5 = part1111;
            this.structure.equipment_lifetime.PK.from_1_to_5 = part2222;
            this.structure.equipment_lifetime.PK.less_than_1 = part3333;
    
            
            // INCIDENTS
            this.structure.incidents = Math.floor(Math.random() * (5 - 1) + 1)

            // CUSTOM VALUE
            if (year == 2023) {
                if (month == 1) {
                    if (type == 'polycarbonate') {
                        this.structure.incidents = Math.floor(Math.random() * (2 - 1) + 1)
                    }
                }
                if (month == 2) {
                    if (type == 'polycarbonate') {
                        this.structure.incidents = Math.floor(Math.random() * (5 - 4) + 4)
                    }
                }
            }


            this.structure.incident_categories.outage = Math.floor(Math.random() * this.structure.incidents);
            this.structure.incident_categories.trauma = this.structure.incidents - this.structure.incident_categories.outage;
    
            this.structure.incidents_affected = Math.floor(this.structure.incident_categories.outage * 0.5);
            this.structure.incidents_outage_hours = this.structure.incident_categories.trauma * 2;
    
            this.structure.incidents_max = 5;


    
            let sum = 0;
            this.structure.events_detalization.training_events = {}
            this.structure.events_detalization.training_events['fas']
            this.structure.events_detalization.training_events['Курсы повышения квалификации'] = Math.floor(Math.random() * 5);
            this.structure.events_detalization.training_events['Конференции'] = Math.floor(Math.random() * 5);
            this.structure.events_detalization.training_events['Обмен опытом с другими предприятиями'] = Math.floor(Math.random() * 5);
            for (let key in this.structure.events_detalization.training_events) {
                sum += this.structure.events_detalization.training_events[key];
            }
            this.structure.events.training_events = sum;
            sum = 0 
    
            this.structure.events_detalization.workplace_improvements['Замена мебели'] = Math.floor(Math.random() * 3);
            this.structure.events_detalization.workplace_improvements['Клининг'] = Math.floor(Math.random() * 4);
            this.structure.events_detalization.workplace_improvements['Контроль работы системы вентиляции'] = Math.floor(Math.random() * 3);
            for (let key in this.structure.events_detalization.workplace_improvements) {
                sum += this.structure.events_detalization.workplace_improvements[key];
            }
            this.structure.events.workplace_improvements = sum;
            sum = 0 
    
            this.structure.events_detalization.wellness_events['Турнир по футболу'] = Math.floor(Math.random() * 3);
            this.structure.events_detalization.wellness_events['Марафон'] = Math.floor(Math.random() * 3);
            this.structure.events_detalization.wellness_events['Семейные праздники'] = Math.floor(Math.random() * 4);
            this.structure.events_detalization.wellness_events['Турнир по шахматам'] = Math.floor(Math.random() * 3);
            for (let key in this.structure.events_detalization.wellness_events) {
                sum += this.structure.events_detalization.wellness_events[key];
            }
            this.structure.events.wellness_events = sum;
            sum = 0
        }

        return this.structure;
    }
}

export default MoraleGenerator;