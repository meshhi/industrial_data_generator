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
            // "events_detalization": {
            //     "training_events": generateValuesInRange(['Обучение', 'Курсы повышения квалификации'], currEventsTrainingEvents),
            //     "workplace_improvements": generateValuesInRange(['Ремонт', 'Вынос мусора'], currEventsWorkplaceImprovements),
            //     "wellness_events": generateValuesInRange(['Турнир по футболу', 'Марафон'], currEventsWelnessEvents),
            // },
            // "employee_satisfaction": generateValuesInRange(['low', 'middle', 'high'], 100, true),
            // "incidents": currBaseIncidents,
            // "incidents_max": currBaseIncidents + Math.floor(Math.random() * 100),
            // "incident_categories": currDivercedIncidents,
            // "incidents_affected": currDivercedIncidents.trauma + Math.floor(Math.random()* currDivercedIncidents.trauma) * (Math.random() < 0.5 ? -1 : 1),
            // "incidents_outage_hours": currDivercedIncidents.outage * Math.floor(Math.random() * 3),
            // "equipment_lifetime": {
            //     "T": generateValuesInRange(['more_than_5', 'from_1_to_5', 'less_than_1'], 100),
            //     "PE": generateValuesInRange(['more_than_5', 'from_1_to_5', 'less_than_1'], 100),
            //     "PK": generateValuesInRange(['more_than_5', 'from_1_to_5', 'less_than_1'], 100),
            //     "OX": generateValuesInRange(['more_than_5', 'from_1_to_5', 'less_than_1'], 100)
            // },
            // "number_diff_percent": "0",
            // "number_diff_percent_color": "0",
            // "fluidity_diff_percent": "0",
            // "fluidity_diff_percent_color": "0",
            // "additional_shifts_hours_diff_percent": "0",
            // "additional_shifts_hours_diff_percent_color": "0",
          }
    }

    generateData() {
        // this.resultTemplate.all = 2;
        return this.structure;
    }
}

export default new MoraleGenerator();