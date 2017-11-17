const express = require('express');
const router = express.Router();

var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://postgres:postgres@localhost:5432/event-manager");

// GET api lesting
router.get('/', (req, res) => {
    res.send('api works');
});

router.get('/locations/get', (req, res) => {
    db.many("SELECT * FROM locations")
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (error) {
            res.status(500).send(error);
        });
});

// router.get('/locations/get', (req, res) => {
//     db.many("SELECT * FROM locations")
//         .then(function (locations) {
//             for (var i = 0; i < locations.length; i++) {
//                 db.many("SELECT photo FROM location_photos WHERE location_id=$1", [locations[i].id])
//                     .then(function (photos) {
//                         locations[0].photos=photos
//                         console.log(locations[0].city);
//                         res.status(200).json(locations);
//                     });
//             }
//             res.status(200).json(locations);
//         })
//         .catch(function (error) {
//             res.status(500).send(error);
//         });
// });

router.get('/locations/get/:locationId', (req, res) => {
    var locationId = req.params.locationId;
    db.many(`SELECT l.id, l.country, l.city, l.address, l_p.photo 
    FROM locations AS l JOIN location_photos AS l_p 
    ON l.id = l_p.location_id AND l_p.location_id=$1`, [locationId])
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (error) {
            res.status(500).send(error);
        });
});

router.get('/locations/photos/get/:locationId', (req, res) => {
    var locationId = req.params.locationId;
    db.many(`SELECT photo from location_photos WHERE location_id=$1`, [locationId])
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (error) {
            res.status(500).send(error);
        });
});

router.post('/locations/post', (req, resp, next) => {
    const dataForInsertion = req.body;
    db.query('INSERT INTO locations(country, city, address) VALUES ($1, $2, $3) RETURNING id',
        [dataForInsertion.country, dataForInsertion.city, dataForInsertion.address])
        .then(function (data) {
            resp.status(200).json(data);
        });
});

router.post('/locations/post/photo', (req, resp, next) => {
    const dataForInsertion = req.body;
    db.query('INSERT INTO location_photos(photo, location_id) VALUES ($1, $2)',
        [dataForInsertion.locPhoto, dataForInsertion.locId])
        .then(function (data) {
            resp.status(200).json(data);
        });
});

router.get('/speakers/get', (req, res) => {
    db.many("SELECT * FROM speakers")
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (error) {
            res.status(500).send(error);
        });
});

router.post('/speakers/post', (req, resp, next) => {
    const dataForInsertion = req.body;
    db.query('INSERT INTO speakers(full_name, description, placework, position, photo) VALUES ($1, $2, $3, $4, $5)',
        [dataForInsertion.fullName, dataForInsertion.description, dataForInsertion.placeWork,
        dataForInsertion.position, dataForInsertion.photoPath])
        .then(function (data) {
            resp.status(200).json(data);
        });
});

router.post('/agenda/action/post', (req, resp, next) => {
    const dataForInsertion = req.body;
    db.query('INSERT INTO actions(tittle, start_time, end_time, date) VALUES ($1, $2, $3, $4) RETURNING id',
        [dataForInsertion.name, dataForInsertion.startTime, dataForInsertion.endTime, dataForInsertion.date])
        .then(function (data) {
            resp.status(200).json(data);
        });
});

router.post('/agenda/report/post', (req, resp, next) => {
    const dataForInsertion = req.body;
    db.query('INSERT INTO reports(id, speaker_id) VALUES ($1, $2)',
        [dataForInsertion.id, dataForInsertion.speaker.id])
        .then(function (data) {
            resp.status(200).json(data);
        });
});

module.exports = router;
