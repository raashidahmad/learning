//const { partitionArray } = require('@angular/compiler/src/util');

module.exports = (req, res, next) => {
    res.header('X-Hello', 'World');

    let parts = req.url.split('/');
    let url = req.url;
    let isInDescending = false;
    let sortColumn = '';
    let start = 1, end = 10;
    let idsToSearch = [];
    let queryStringParts = [];
    let queryStringPart = '';

    if (url.includes('?')) {
        queryStringParts = req.url.split('?');
        parts = queryStringParts.length > 0 ? queryStringParts[0].split('/') : '';
        queryStringPart = queryStringParts.length > 0 ? queryStringParts[1] : '';

        if (queryStringPart != '') {
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
                } 
            });
        }
    }

    if ((parts.includes('siteCharts') && parts.length > 2) || idsToSearch.length > 0) {
        let json = require('./database.json');
        let siteCharts = json.siteCharts;

        if (idsToSearch.length > 0) {
            siteCharts = siteCharts.filter(s => idsToSearch.includes(s.siteId));
        }

        if (siteCharts.length > 0) {
            /*if (parts.length > 0) {
                let criteria = parts[parts.length - 1];
                siteCharts = siteCharts.filter(s => s.siteId == criteria || (s.siteName.toLowerCase().indexOf(criteria.toLowerCase()) != -1));
            }*/
            
            if (sortColumn) {
                if (isInDescending) {
                    siteCharts.sort(getSortOrderDesc(sortColumn));
                } else {
                    siteCharts.sort(getSortOrderAsc(sortColumn));
                }
            } else {
                siteCharts.sort(getSortOrderDesc("chartsCount"));
            }
            
        }

        res.send({
            "siteCharts": siteCharts
        });
    }
    else {
        next();
    }
}

function getSortOrderAsc(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}    

function getSortOrderDesc(prop) {    
    return function(a, b) {    
        if (b[prop] > a[prop]) {    
            return 1;    
        } else if (b[prop] < a[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}    

/*
git remote add origin https://github.com/raashidahmad/learning.git
git branch -M main
git push -u origin main
*/