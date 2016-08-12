'use strict';

function MakePlans(apiKey, account, test, log){
    this.apiKey = apiKey;
    this.account = account;
    this.test = !!test;
    this.baseUrl = constructBaseUrl(apiKey, account, this.test);
    this.log = log;
}

function constructBaseUrl(apiKey, account, test){
    var baseUrl = 'http';
    baseUrl += test ? "":"s";
    baseUrl += '://' + apiKey + '@';
    baseUrl += account;
    baseUrl += test ? ".test":"";
    baseUrl += '.makeplans.net/api/v1/';
    
    return baseUrl;
}


// load mixins
var mixinNames = ['Bookings', 'Categories', 'Core', 'Events', 'People', 'Providers', 'Resources', 'Services', 'Slots', 'Users'];
var mixins = [];
for(var i = 0; i < mixinNames.length; i++){
    var mixinName = mixinNames[i];
    var fileName = "/mixins/" + mixinName + ".js";
    var mixin = require(fileName);
    mixins.push(mixin);
}

mixins.forEach(function(mixin){
    Object.keys(mixin).forEach(function(key){
       MakePlans.prototype[key] = mixin[key]; 
    });
});

module.exports = MakePlans;