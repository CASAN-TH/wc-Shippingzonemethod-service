'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ShippingzonemethodSchema = new Schema({
    // name: {
    //     type: String,
    //     required: 'Please fill a Shippingzonemethod name',
    // },


    instance_id: {
        type: Number
    },
    title: {
        type: String
    },
    order: {
        type: Number
    },
    enabled: {
        type: Boolean
    },
    method_id: {
        type: String
    },
    method_title: {
        type: String
    },
    method_description: {
        type: String
    },
    settings: {
        type: {
            title:
            {
                type: {
                    label: {
                        type: String
                    },
                    description: {
                        type: String
                    },
                    type: {
                        type: String,
                        enum: ["text", "email", "number", "color", "password", "textarea", "select", "multiselect", "radio", "image_width", "checkbox"],
                        default: "text"
                    },
                    value: {
                        type: String
                    },
                    default: {
                        type: String
                    },
                    tip: {
                        type: String
                    },
                    placeholder: {
                        type: String
                    },
                }
            }

        }

    },

    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});

mongoose.model("Shippingzonemethod", ShippingzonemethodSchema);