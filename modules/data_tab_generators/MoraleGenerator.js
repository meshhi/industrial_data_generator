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
        // KPI
        this.structure.number = Math.floor(Math.random() * (8000 - 600) + 600);
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
        const [satisfactionParts1, satisfactionParts2, satisfactionParts3] = generateRandomParts();

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
        const [part1111, part2222, part3333] = generateRandomParts();

        this.structure.equipment_lifetime.PK.more_than_5 = part1111;
        this.structure.equipment_lifetime.PK.from_1_to_5 = part2222;
        this.structure.equipment_lifetime.PK.less_than_1 = part3333;

        return this.structure;
    }
}

export default MoraleGenerator;