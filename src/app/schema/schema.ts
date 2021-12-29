const enum dataTypes {
    NUMBER = "number",
    STRING = "string",
    DATED = "date"
};

export const Schema = {
    "entities": [
        {
            "entity": "Service Years",
            "fields":[
                { "field": "serviceId", "type": dataTypes.NUMBER },
                { "field": "year", "type": dataTypes.NUMBER }
            ]
        },
        {
            "entity": "States",
            "fields": [
                { "field": "code", "type": dataTypes.STRING },
                { "field": "state", "type": dataTypes.STRING }
            ]
        },
        {
            "entity": "Services",
            "fields": [
                { "field": "serviceId", "type": dataTypes.NUMBER },
                { "field": "serviceName", "type": dataTypes.STRING }
            ]
        },
        {
            "entity": "Projects",
            "fields": [
                { "field": "projectId", "type": dataTypes.NUMBER },
                { "field": "projectName", "type": dataTypes.STRING }
            ]
        },
        {
            "entity": "Medical Groups",
            "fields": [
                { "field": "medicalGroupId", "type": dataTypes.NUMBER },
                { "field": "medicalGroup", "type": dataTypes.STRING }
            ]
        },
        {
            "entity": "Sites",
            "fields": [
                { "field": "siteId", "type": dataTypes.NUMBER },
                { "field": "stateCode", "type": dataTypes.STRING },
                { "field": "siteName", "type": dataTypes.STRING }
            ]
        },
        {
            "entity": "Providers",
            "fields": [
                { "field": "providerId", "type": dataTypes.NUMBER },
                { "field": "providerName", "type": dataTypes.STRING }
            ]
        },
        {
            "entity": "Provider Specialities",
            "fields": [
                { "field": "specialityId", "type": dataTypes.NUMBER },
                { "field": "speciality", "type": dataTypes.STRING }
            ]
        },
        {
            "entity": "Data Import Dates",
            "fields": [
                { "field": "dated", "type": dataTypes.DATED },
            ]
        },
        {
            "entity": "Site Pursuits Summary",
            "fields": [
                { "field": "state", "type": dataTypes.STRING },
                { "field": "stateId", "type": dataTypes.NUMBER },
                { "field": "siteName", "type": dataTypes.STRING },
                { "field": "serviceId", "type": dataTypes.NUMBER },
                { "field": "projectId", "type": dataTypes.NUMBER },
                { "field": "medicalGroupId", "type": dataTypes.NUMBER },
                { "field": "providerId", "type": dataTypes.NUMBER },
                { "field": "specialityId", "type": dataTypes.NUMBER },
                { "field": "pursuitCount", "type": dataTypes.NUMBER },
                { "field": "pursuable", "type": dataTypes.NUMBER },
                { "field": "closed", "type": dataTypes.NUMBER },
                { "field": "issued", "type": dataTypes.NUMBER },
                { "field": "completed", "type": dataTypes.NUMBER },
                { "field": "completedPercent", "type": dataTypes.NUMBER },
                { "field": "available", "type": dataTypes.NUMBER },
                { "field": "availablePercent", "type": dataTypes.NUMBER },
                { "field": "importDate", "type": dataTypes.DATED },
            ]
        },
        {
            "entity": "Site Charts Summary",
            "fields": [
                { "field": "state", "type": dataTypes.STRING },
                { "field": "stateId", "type": dataTypes.NUMBER },
                { "field": "siteName", "type": dataTypes.STRING },
                { "field": "serviceId", "type": dataTypes.NUMBER },
                { "field": "projectId", "type": dataTypes.NUMBER },
                { "field": "medicalGroupId", "type": dataTypes.NUMBER },
                { "field": "providerId", "type": dataTypes.NUMBER },
                { "field": "specialityId", "type": dataTypes.NUMBER },
                { "field": "chartsCount", "type": dataTypes.NUMBER },
                { "field": "pursuable", "type": dataTypes.NUMBER },
                { "field": "closed", "type": dataTypes.NUMBER },
                { "field": "issued", "type": dataTypes.NUMBER },
                { "field": "completed", "type": dataTypes.NUMBER },
                { "field": "completedPercent", "type": dataTypes.NUMBER },
                { "field": "available", "type": dataTypes.NUMBER },
                { "field": "availablePercent", "type": dataTypes.NUMBER },
                { "field": "importDate", "type": dataTypes.DATED },
            ]
        }
    ]
}