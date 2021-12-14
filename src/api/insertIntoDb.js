var faker = require('faker');
var fs = require('fs');
var helperLib = require('./helper.js');

var database = {
    "serviceYears": [],
    "states": [],
    "services": [],
    "projects": [],
    "medicalGroups": [],
    "sites": [],
    "providers": [],
    "providerSpecialities": [],
    "dataImportDates": [],
    "projectReports": [],
    "pursuitReports": [],
    "chartReports": [],
    "sitePursuits": [],
    "siteCharts": [],
    "statusReport": []
};

let dated = new Date();
let currentYear = dated.getFullYear();
let index = 1, projectId = 1, serviceId = 1, medicalGroupId = 1, siteId = 1,
    providerId = 1, specialityId = 1;
let sites = [], importDates = [];
let statuses = [
    { "id": 1, "status": "Pursuable", "subStatuses": [] },
    { "id": 2, "status": "Completed", "subStatuses": [] },
    { "id": 3, "status": "Issued", "subStatuses": [] },
    { "id": 4, "status": "Closed", "subStatuses": [] }
];

for (var year = currentYear; year >= (currentYear - 50); year--) {
    database.serviceYears.push({
        id: index++,
        year: year
    });

    /**
     * Since this is mock data, we are creating mock codes for the states
     * keeping its length 3, to keep them unique as much possible
     */
    let state = faker.address.state();
    let stateCode = state.substring(0, 3).toUpperCase();
    let newState = {
        code: stateCode,
        state: state
    };
    database.states.push(newState);

    /*
        Create multiple sites for a state
        Initially creating 5 sites for each state
    */
    for (var i = 0; i < 5; i++) {
        let newSite = {
            siteId: siteId++,
            stateCode: newState.code,
            siteName: faker.address.streetName()
        }
        database.sites.push(newSite);
        sites.push(newSite);
    }

    database.services.push({
        serviceId: serviceId++,
        serviceName: faker.commerce.productName()
    });

    database.projects.push({
        projectId: projectId++,
        projectName: faker.company.companyName()
    });

    database.medicalGroups.push({
        medicalGroupId: medicalGroupId++,
        medicalGroup: faker.random.words(2)
    });

    database.providers.push({
        providerId: providerId++,
        providerName: faker.name.firstName() + " " + faker.name.lastName()
    });

    database.providerSpecialities.push({
        specialityId: specialityId++,
        speciality: faker.hacker.adjective()
    });

    var fullDate = faker.date.past(2);
    var formattedDate = (fullDate.getMonth() + 1) + "/" + (fullDate.getDate()) + "/" + fullDate.getFullYear();
    database.dataImportDates.push({
        importDate: formattedDate
    });
    importDates.push(formattedDate);
}

/**
 * Generating data for table on overview tab
 * Definitions for the formulas deduced from the wireframe data
 * totalCount = Pursuable + Closed + Issued
 * totalCount = Available + Completed + Closed + Issued
 */
var helper = new helperLib();
sites.forEach((s) => {
    var completionPercent = helper.getRandomInRange(55, 95);
    var availablePercent = (100 - completionPercent);
    var pursuitCount = helper.getRandomInRange(4500, 5000);
    var pursuable = helper.getRandomInRange(3000, 4000);
    var closed = (pursuitCount - pursuable);
    var issued = helper.getRandomInRange(1, (closed / 2));
    closed = closed - issued;
    var completed = parseInt((pursuable / 100) * completionPercent);
    var available = pursuable - completed;

    /**
     * Get random Ids for related data
     */
    let serviceId = helper.getRandomInRange(1, 50);
    let projectId = helper.getRandomInRange(1, 50);
    let medicalGroupId = helper.getRandomInRange(1, 50);
    let providerId = helper.getRandomInRange(1, 50);
    let specialityId = helper.getRandomInRange(1, 50);
    let importDate = importDates[helper.getRandomInRange(1, 50)];

    var sitePursuitSummary = {
        state: s.stateCode,
        siteId: s.siteId,
        siteName: s.siteName.concat(' ', '(', s.siteId, ')'),
        serviceId: serviceId,
        projectId: projectId,
        medicalGroupId: medicalGroupId,
        providerId: providerId,
        specialityId: specialityId,
        pursuitCount: pursuitCount,
        pursuable: pursuable,
        closed: closed,
        issued: issued,
        completed: completed,
        completedPercent: completionPercent,
        available: available,
        availablePercent: availablePercent,
        importDate: importDate
    };

    //data for charts
    var chartsCompletionPercent = helper.getRandomInRange(55, 95);
    var chartsAvailablePercent = (100 - chartsCompletionPercent);
    var chartsCount = helper.getRandomInRange(2500, 3000);
    var chartsPursuable = helper.getRandomInRange(1500, 2000);
    var chartsClosed = (chartsCount - chartsPursuable);
    var chartsIssued = helper.getRandomInRange(1, (chartsClosed / 2));
    chartsClosed = chartsClosed - chartsIssued;
    var chartsCompleted = parseInt((chartsPursuable / 100) * chartsCompletionPercent);
    var chartsAvailable = chartsPursuable - chartsCompleted;

    var siteChartSummary = {
        state: s.stateCode,
        siteId: s.siteId,
        siteName: s.siteName.concat(' ', '(', s.siteId, ')'),
        serviceId: serviceId,
        projectId: projectId,
        medicalGroupId: medicalGroupId,
        providerId: providerId,
        specialityId: specialityId,
        chartsCount: chartsCount,
        pursuable: chartsPursuable,
        closed: chartsClosed,
        issued: chartsIssued,
        completed: chartsCompleted,
        completedPercent: chartsCompletionPercent,
        available: chartsAvailable,
        availablePercent: chartsAvailablePercent,
        importDate: importDate
    };
    /** Adding site summaries */
    database.sitePursuits.push(sitePursuitSummary);
    database.siteCharts.push(siteChartSummary);
});

/*
    Summary values for the projects
*/
database.projectReports.push(
    { "report": "daysInProject", "value": 121 }
);
database.projectReports.push(
    { "report": "daysLeft", "value": 35 }
);
database.projectReports.push(
    { "report": "projectCompletion", "value": 75.2 }
);

/**
 * Summary values for pursuits
 */
database.pursuitReports.push(
    { "report": "totalPursuits", "value": 51678 }
);
database.pursuitReports.push(
    { "report": "pursuablePursuits", "value": 40119 }
);
database.pursuitReports.push(
    { "report": "completedPursuits", "value": 33208 }
);
database.pursuitReports.push(
    { "report": "availablePursuits", "value": 6911 }
);
database.pursuitReports.push(
    { "report": "initialTarget", "value": 31563 }
);

/**
 * Summary values for charts
 */
database.chartReports.push(
    { "report": "totalCharts", "value": 20671 },
    { "report": "pursuableCharts", "value": 16056 },
    { "report": "completedCharts", "value": 13283 },
    { "report": "availableCharts", "value": 2764 },
    { "report": "initialTarget", "value": 12625 }
);

/*
Creating data for statuses
*/
statuses.forEach((s) => {
    let levelOneStatusValue = 1;
    let iteration = 5;
    let levelOneStatus = {
        status: s.status,
        value: levelOneStatusValue,
        subStatuses: []
    };

    if (s.id == 1) {
        levelOneStatusValue = helper.getRandomInRange(15000, 16000);
    } else if (s.id == 2) {
        levelOneStatusValue = helper.getRandomInRange(2500, 3000);
    } else if (s.id == 3) {
        levelOneStatusValue = helper.getRandomInRange(2000, 2500);
    } else if (s.id == 4) {
        levelOneStatusValue = helper.getRandomInRange(1500, 2000);
    }

    iteration = helper.getRandomInRange(3, 10);
    let levelTwoAllocated = (levelOneStatusValue / 2);
    let levelTwoRemaining = levelTwoAllocated;
    levelOneStatus.value = levelOneStatusValue;

    let levelTwoStatuses = [];
    for (var i = 0; i < iteration; i++) {
        let levelTwoStatusName = faker.random.words(3);
        let levelTwoStatus = {
            subStatus: levelTwoStatusName,
            value: 0
        }

        if (i == 0) {
            levelTwoStatus.value = levelTwoAllocated;
        } else if (i > 0 && i < iteration - 1) {
            let randomValue = helper.getRandomInRange(1, levelTwoRemaining / 2);
            levelTwoStatus.value = randomValue;
            levelTwoRemaining = levelTwoRemaining - randomValue;
        } else {
            levelTwoStatus.value = levelTwoRemaining;
        }

        let levelThreeAllocated = (levelTwoStatus.value / 2);
        let levelThreeRemaining = levelThreeAllocated;

        let levelThreeStatuses = [];
        let internalIteration = helper.getRandomInRange(1, 3);
        for (var j = 0; j < internalIteration; j++) {
            let levelThreeStatusName = faker.random.words(2);
            let levelThreeStatus = {
                subSubStatus: levelThreeStatusName,
                value: 0
            }

            if (i == 0) {
                levelTwoStatus.value = levelThreeAllocated;
            } else if (i > 0 && i < iteration - 1) {
                let randomValue = helper.getRandomInRange(1, levelThreeRemaining / 2);
                levelTwoStatus.value = randomValue;
                levelTwoRemaining = levelTwoRemaining - randomValue;
            } else {
                levelTwoStatus.value = levelTwoRemaining;
            }
            levelThreeStatuses.push(levelThreeStatus);
        }
        levelTwoStatus.subStatuses = levelThreeStatuses;
        levelTwoStatuses.push(levelTwoStatus);
    }
    s.subStatuses = levelTwoStatuses;
});
database.statusReport.push(statuses);

var json = JSON.stringify(database);
fs.writeFile('src/api/database.json', json, 'utf8', (err) => {
    if (err) { console.error(err); return; };
    console.log("database.json created");

});