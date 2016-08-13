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
    baseUrl += '://';
    baseUrl += account;
    baseUrl += test ? ".test":"";
    baseUrl += '.makeplans.net/api/v1/';
    
    return baseUrl;
}


// load mixins
var mixinNames = ['Bookings', 'Categories', 'Core', 'Events', 'People', 'Providers', 'Resources', 'Services', 'Slots', 'Users'];
var mixins = [];


var bookings = require('./Bookings');
var categories = require('./Categories');
var core = require('./Core');
var events = require('./Events');
var people = require('./People');
var providers = require('./providers');
var resources = require('./resources');
var services = require('./services');
var slots = require('./slots');
var users = require('./users');

[core, bookings, categories, events, people, providers, resources, services, slots, users].forEach(function(mixin){
    Object.keys(mixin).forEach(function(key){
       MakePlans.prototype[key] = mixin[key]; 
    });
});


module.exports = MakePlans;