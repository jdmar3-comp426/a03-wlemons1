import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: avgMpg(),

    allYearStats: allYearStats(),

    ratioHybrids: ratioHybrids()
};

export function avgMpg() {
    var i = 0;
    var cityAvg = 0;
    var highwayAvg = 0;
    
    while(i < mpg_data.length) {
        cityAvg += mpg_data[i]["city_mpg"];
        highwayAvg += mpg_data[i]["highway_mpg"];
        i++;
    }
    cityAvg = cityAvg / i;
    highwayAvg = highwayAvg / i;
    return {city: cityAvg, highway: highwayAvg};
}

export function allYearStats() {
    let arr = [mpg_data[0]["year"]];
    for(var i = 1; i < mpg_data.length; i++) {
        arr.push(mpg_data[i]["year"]);
    }
    return getStatistics(arr);
}

export function ratioHybrids() {
    var hybridCount = 0;
    for(var i = 0; i < mpg_data.length; i++) {
        if(mpg_data[i]["hybrid"]) {
            hybridCount++;
        }
    }
    return hybridCount / mpg_data.length;
}


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: makerHybrids(),
    avgMpgByYearAndHybrid: getAvgMpgByYearAndHybrid()
};

export function makerHybrids() {
    let rv = [];
    for(let i = 0; i < mpg_data.length; i++) {
        if(mpg_data[i]["hybrid"]) {
            let added = false;
            let j = 0;
            while(j < rv.length && !added) {
                if(mpg_data[i]["make"] == rv[j]["make"]) {
                    rv[j]["hybrids"].push(mpg_data[i]["id"])
                    added = true;
                }
                j++;
            }
            if(!added) {
                let obj = new Object();
                obj["make"] = mpg_data[i]["make"];
                obj["hybrids"] = [mpg_data[i]["id"]];
                rv.push(obj);
            }
        }
    }
    rv.sort(function(a, b) {
        return b["hybrids"].length - a["hybrids"].length;
    });
    return rv;
}

export function getAvgMpgByYearAndHybrid() {
    let rv = new Object();
    let checked = [];
    for(let i = 0; i < mpg_data.length; i++) {
        let added = false;
        let workingYear = mpg_data[i]["year"];
        for(let j = 0; j < checked.length; j++) {
            added = (workingYear == checked[j]) || added;
        }
        if(!added) {
            checked.push(workingYear);
            let hybridCount = 0;
            let nonhybridCount = 0;
            let hybridCity = 0;
            let hybridHighway = 0;
            let nonhybridCity = 0;
            let nonhybridHighway = 0;
            for(let k = i; k < mpg_data.length; k++) {
                if(mpg_data[k]["year"] == workingYear) {
                    if(mpg_data[k]["hybrid"]) {
                        hybridCount++;
                        hybridHighway += mpg_data[k]["highway_mpg"];
                        hybridCity += mpg_data[k]["city_mpg"];
                    } else {
                        nonhybridCount++;
                        nonhybridHighway += mpg_data[k]["highway_mpg"];
                        nonhybridCity += mpg_data[k]["city_mpg"];
                    }
                }
            }
            rv[workingYear] = {hybrid: {city: hybridCity / hybridCount, highway: hybridHighway / hybridCount}, notHybrid: {city: nonhybridCity / nonhybridCount, highway: nonhybridHighway / nonhybridCount}};
        }
    }
    return rv;
}
