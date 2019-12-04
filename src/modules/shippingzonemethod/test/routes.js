'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Shippingzonemethod = mongoose.model('Shippingzonemethod');

var credentials,
    token,
    mockup;

describe('Shippingzonemethod CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            instance_id: 26,
            title: "Flat rate",
            order: 1,
            enabled: true,
            method_id: "flat_rate",
            method_title: "Flat rate",
            method_description: "<p>Lets you charge a fixed rate for shipping.</p>\n",
            settings: {
                title: {
                    label: "Method title",
                    description: "This controls the title which the user sees during checkout.",
                    type: "text",
                    value: "Flat rate",
                    default: "Flat rate",
                    tip: "This controls the title which the user sees during checkout.",
                    placeholder: ""
                }
            }
        };
        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('should be Shippingzonemethod get use token', (done) => {
        request(app)
            .get('/api/shippingzonemethods')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                done();
            });
    });

    it('should be Shippingzonemethod get by id', function (done) {

        request(app)
            .post('/api/shippingzonemethods')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/shippingzonemethods/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        console.log(resp)
                        assert.equal(resp.data.instance_id, mockup.instance_id);
                        assert.equal(resp.data.title, mockup.title);
                        assert.equal(resp.data.order, mockup.order);
                        assert.equal(resp.data.enabled, mockup.enabled);
                        assert.equal(resp.data.method_id, mockup.method_id);
                        assert.equal(resp.data.method_title, mockup.method_title);
                        assert.equal(resp.data.method_description, mockup.method_description);


                        assert.equal(resp.data.settings.title.label, mockup.settings.title.label);
                        assert.equal(resp.data.settings.title.description, mockup.settings.title.description);
                        assert.equal(resp.data.settings.title.type, mockup.settings.title.type);
                        assert.equal(resp.data.settings.title.value, mockup.settings.title.value);
                        assert.equal(resp.data.settings.title.default, mockup.settings.title.default);
                        assert.equal(resp.data.settings.title.tip, mockup.settings.title.tip);
                        assert.equal(resp.data.settings.title.placeholder, mockup.settings.title.placeholder);


                      
                        done();
                    });
            });

    });

    it('should be Shippingzonemethod post use token', (done) => {
        request(app)
            .post('/api/shippingzonemethods')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.data.instance_id, mockup.instance_id);
                assert.equal(resp.data.title, mockup.title);
                assert.equal(resp.data.order, mockup.order);
                assert.equal(resp.data.enabled, mockup.enabled);
                assert.equal(resp.data.method_id, mockup.method_id);
                assert.equal(resp.data.method_title, mockup.method_title);
                assert.equal(resp.data.method_description, mockup.method_description);


                assert.equal(resp.data.settings.title.label, mockup.settings.title.label);
                assert.equal(resp.data.settings.title.description, mockup.settings.title.description);
                assert.equal(resp.data.settings.title.type, mockup.settings.title.type);
                assert.equal(resp.data.settings.title.value, mockup.settings.title.value);
                assert.equal(resp.data.settings.title.default, mockup.settings.title.default);
                assert.equal(resp.data.settings.title.tip, mockup.settings.title.tip);
                assert.equal(resp.data.settings.title.placeholder, mockup.settings.title.placeholder);
                done();
            });
    });

    it('should be shippingzonemethod put use token', function (done) {

        request(app)
            .post('/api/shippingzonemethods')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    instance_id: 26,
                    title: "Flat rate",
                    order: 1,
                    enabled: true,
                    method_id: "flat_rate",
                    method_title: "Flat rate",
                    method_description: "<p>Lets you charge a fixed rate for shipping.</p>\n",
                    settings: {
                        title: {
                            label: "Method title",
                            description: "This controls the title which the user sees during checkout.",
                            type: "text",
                            value: "Flat rate",
                            default: "Flat rate",
                            tip: "This controls the title which the user sees during checkout.",
                            placeholder: ""
                        }
                    }
                }
                request(app)
                    .put('/api/shippingzonemethods/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.data.instance_id, update.instance_id);
                        assert.equal(resp.data.title, update.title);
                        assert.equal(resp.data.order, update.order);
                        assert.equal(resp.data.enabled, update.enabled);
                        assert.equal(resp.data.method_id, update.method_id);
                        assert.equal(resp.data.method_title, update.method_title);
                        assert.equal(resp.data.method_description, update.method_description);


                        assert.equal(resp.data.settings.title.label, update.settings.title.label);
                        assert.equal(resp.data.settings.title.description, update.settings.title.description);
                        assert.equal(resp.data.settings.title.type, update.settings.title.type);
                        assert.equal(resp.data.settings.title.value, update.settings.title.value);
                        assert.equal(resp.data.settings.title.default, update.settings.title.default);
                        assert.equal(resp.data.settings.title.tip, update.settings.title.tip);
                        assert.equal(resp.data.settings.title.placeholder, update.settings.title.placeholder);
                        done();
                    });
            });

    });

    it('should be shippingzonemethod delete use token', function (done) {

        request(app)
            .post('/api/shippingzonemethods')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/shippingzonemethods/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be shippingzonemethod get not use token', (done) => {
        request(app)
            .get('/api/shippingzonemethods')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be shippingzonemethod post not use token', function (done) {

        request(app)
            .post('/api/shippingzonemethods')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be shippingzonemethod put not use token', function (done) {

        request(app)
            .post('/api/shippingzonemethods')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/shippingzonemethods/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be shippingzonemethod delete not use token', function (done) {

        request(app)
            .post('/api/shippingzonemethods')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/shippingzonemethods/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Shippingzonemethod.remove().exec(done);
    });

});