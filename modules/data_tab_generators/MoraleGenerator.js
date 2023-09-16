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
        return this.structure;
    }
}

export default MoraleGenerator;