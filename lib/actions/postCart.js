/**
 * Auto-generated action file for "Jirafe Events" API.
 *
 * Generated at: 2019-05-07T14:42:35.978Z
 * Mass generator version: 1.1.0
 *
 * flowground :- Telekom iPaaS / jirafe-com-connector
 * Copyright © 2019, Deutsche Telekom AG
 * contact: flowground@telekom.de
 *
 * All files of this connector are licensed under the Apache 2.0 License. For details
 * see the file LICENSE on the toplevel directory.
 *
 *
 * Operation: 'postCart'
 * Endpoint Path: '/{siteId}/cart'
 * Method: 'post'
 *
 */

const Swagger = require('swagger-client');
const processWrapper = require('../services/process-wrapper');
const spec = require('../spec.json');

// this wrapers offers a simplified emitData(data) function
module.exports.process = processWrapper(processAction);

// parameter names for this call
const PARAMETERS = [
    "siteId"
];

// mappings from connector field names to API field names
const FIELD_MAP = {
    "siteId": "siteId",
    "cart_id": "cart_id",
    "change_date": "change_date",
    "cookies": "cookies",
    "create_date": "create_date",
    "currency": "currency",
    "active_flag": "active_flag",
    "company": "company",
    "department": "department",
    "email": "email",
    "first_name": "first_name",
    "id": "id",
    "last_name": "last_name",
    "marketing_opt_in": "marketing_opt_in",
    "name": "name",
    "phone": "phone",
    "position": "position",
    "customer": "customer",
    "items": "items",
    "previous_items": "previous_items",
    "subtotal": "subtotal",
    "total": "total",
    "total_discounts": "total_discounts",
    "total_payment_cost": "total_payment_cost",
    "total_shipping": "total_shipping",
    "total_tax": "total_tax",
    "last_pageview_id": "last_pageview_id",
    "pageview_id": "pageview_id",
    "visit_id": "visit_id",
    "visitor_id": "visitor_id",
    "visit": "visit",
    "requestBody": "requestBody"
};

function processAction(msg, cfg) {
    var isVerbose = process.env.debug || cfg.verbose;

    if (isVerbose) {
        console.log(`---MSG: ${JSON.stringify(msg)}`);
        console.log(`---CFG: ${JSON.stringify(cfg)}`);
        console.log(`---ENV: ${JSON.stringify(process.env)}`);
    }

    const contentType = 'application/json';

    const body = msg.body;
    mapFieldNames(body);

    let parameters = {};
    for(let param of PARAMETERS) {
        parameters[param] = body[param];
    }

    // credentials for this operation
    let securities = {};
    securities['oauth2_accessCode'] = {token: cfg['oauth2_accessCode']};
    securities['oauth2_implicit'] = {token: cfg['oauth2_implicit']};

    let callParams = {
        spec: spec,
        operationId: 'postCart',
        pathName: '/{siteId}/cart',
        method: 'post',
        parameters: parameters,
        requestContentType: contentType,
        requestBody: body.requestBody,
        securities: {authorized: securities},
        server: spec.servers[cfg.server] || cfg.otherServer,
    };

    if (isVerbose) {
        let out = Object.assign({}, callParams);
        out.spec = '[omitted]';
        console.log(`--SWAGGER CALL: ${JSON.stringify(out)}`);
    }

    // Call operation via Swagger client
    return Swagger.execute(callParams).then(data => {
        // emit a single message with data
        this.emitData(data);

        // if the response contains an array of entities, you can emit them one by one:

        // data.obj.someItems.forEach((item) => {
        //     this.emitData(item);
        // }
    });
}

function mapFieldNames(obj) {
    if(Array.isArray(obj)) {
        obj.forEach(mapFieldNames);
    }
    else if(typeof obj === 'object' && obj) {
        Object.keys(obj).forEach(key => {
            mapFieldNames(obj[key]);

            let goodKey = FIELD_MAP[key];
            if(goodKey && goodKey !== key) {
                obj[goodKey] = obj[key];
                delete obj[key];
            }
        });
    }
}