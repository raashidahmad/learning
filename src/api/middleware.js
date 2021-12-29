var helperLib = require('./helper.js');

module.exports = (req, res, next) => {
    res.header('X-Custom', 'Report');

    let parts = req.url.split('/');
    let url = req.url;
    let isInDescending = false;
    let sortColumn = '';
    let start = 0, end = 0;
    let idsToSearch = [];
    let queryStringParts = [];
    let queryStringPart = '';
    let requests = {
        "PURSUITS": false,
        "CHARTS": false
    };
    let helper = new helperLib();

    if (url.includes('?')) {
        queryStringParts = req.url.split('?');
        parts = queryStringParts.length > 0 ? queryStringParts[0].split('/') : '';
        queryStringPart = queryStringParts.length > 0 ? queryStringParts[1] : '';
    }
    requests.PURSUITS = parts.includes('sitePursuits') ? true : false;
    requests.CHARTS = parts.includes('siteCharts') ? true : false;
    

    if (requests.PURSUITS || requests.CHARTS && queryStringPart != '') {
        let attributeValues = queryStringPart.split('&');
        attributeValues.forEach((q) => {
            let attrValue = q.split('=');
            if (attrValue[0] == 'id') {
                if (attrValue.length > 1) {
                    if (attrValue[1].includes(',')) {
                        idsToSearch = attrValue[1].split(',').map(id => parseInt(id));
                    } else {
                        idsToSearch[0] = parseInt(attrValue[1]);
                    }
                }
            } else if (attrValue[0] == '_sort') {
                if (attrValue.length > 1) {
                    sortColumn = attrValue[1];
                }
            } else if (attrValue[0] == '_order') {
                if (attrValue.length > 1 && attrValue[1] == 'desc') {
                    isInDescending = true;
                }
            } else if (attrValue[0] == '_start') {
                if (attrValue.length > 1) {
                    start = parseInt(attrValue[1]);
                }
            } else if (attrValue[0] == '_end') {
                if (attrValue.length > 1) {
                    end = parseInt(attrValue[1]);
                }
            }
        });

        if (idsToSearch.length > 0) {
            let json = require('./database.json');
            let sitePursuits = json.sitePursuits;
            let siteCharts = json.siteCharts;
            let index = 1;
            let paginatedRecords = [];

            if (requests.PURSUITS) {
                if (idsToSearch.length > 0) {
                    sitePursuits = sitePursuits.filter(s => idsToSearch.includes(s.siteId));
                }

                if (sitePursuits.length > 0) {
                    if (sortColumn) {
                        if (isInDescending) {
                            sitePursuits.sort(helper.getSortOrderDesc(sortColumn));
                        } else {
                            sitePursuits.sort(helper.getSortOrderAsc(sortColumn));
                        }
                    } else {
                        sitePursuits.sort(helper.getSortOrderDesc("chartsCount"));
                    }
                }

                if (start > 0 || end > 0) {
                    sitePursuits.forEach((s) => {
                        if (index >= start && index <= end) {
                            paginatedRecords.push(s);
                        }
                        index++;
                    });
                    sitePursuits = paginatedRecords;
                }
                res.send(sitePursuits);

            } else if (requests.CHARTS) {
                if (idsToSearch.length > 0) {
                    siteCharts = siteCharts.filter(s => idsToSearch.includes(s.siteId));
                }

                if (siteCharts.length > 0) {
                    if (sortColumn) {
                        if (isInDescending) {
                            siteCharts.sort(helper.getSortOrderDesc(sortColumn));
                        } else {
                            siteCharts.sort(helper.getSortOrderAsc(sortColumn));
                        }
                    } else {
                        siteCharts.sort(helper.getSortOrderDesc("chartsCount"));
                    }
                }

                if (start > 0 || end > 0) {
                    siteCharts.forEach((s) => {
                        if (index >= start && index <= end) {
                            paginatedRecords.push(s);
                        }
                        index++;
                    });
                    siteCharts = paginatedRecords;
                }
                res.send(siteCharts);
            }
        } else {
            next();
        }
    }
    else {
        next();
    }
}

