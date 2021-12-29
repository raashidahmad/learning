module.exports = class Helper {
    getRandomInRange(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }  
    
    getSortOrderAsc(prop) {    
        return function(a, b) {    
            if (a[prop] > b[prop]) {    
                return 1;    
            } else if (a[prop] < b[prop]) {    
                return -1;    
            }    
            return 0;    
        }    
    }    
    
    getSortOrderDesc(prop) {    
        return function(a, b) {    
            if (b[prop] > a[prop]) {    
                return 1;    
            } else if (b[prop] < a[prop]) {    
                return -1;    
            }    
            return 0;    
        }    
    }    
}

