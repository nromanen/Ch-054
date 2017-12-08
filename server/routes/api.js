const express = require('express');
const router = express.Router();

var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://postgres:postgres@localhost:5433/postgres");

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

router.get('/speakers/get/:eventId', (req, res) => {
    var eventId = req.params.eventId;
    db.many(`SELECT DISTINCT s.id,s.full_name,s.description,s.placework,s.position,s.photo FROM actions AS ac
    JOIN reports AS r ON r.id=ac.id AND ac.event_id=$1
    JOIN speakers AS s ON s.id=r.speaker_id`, [eventId])
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (error) {
            res.status(500).send(error);
        });
});
router.get('/speaker/get/:speakerId', (req, res) => {
    var speakerId = req.params.speakerId;
    db.one(`SELECT full_name, description, placework, position, photo  FROM speakers WHERE id=$1`, [speakerId])
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (error) {
            res.status(500).send(error);
        });
});

router.post('/speakers/post', (req, resp, next) => {
    const dataForInsertion = req.body;
    db.query('INSERT INTO speakers(full_name, description, placework, position, photo) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [dataForInsertion.fullName, dataForInsertion.description, dataForInsertion.placeWork,
        dataForInsertion.position, dataForInsertion.photoPath])
        .then(function (data) {
            resp.status(200).json(data);
        });
});

router.get('/agenda/get/:eventId', (req, res) => {
    var eventId = req.params.eventId;
    db.many(`SELECT acts.id, acts.start_time,acts.end_time,acts.tittle,acts.date,acts.speaker_id,s.full_name FROM
    (SELECT a_r.id, a_r.start_time, a_r.end_time, a_r.tittle, a_r.event_id,a_r.date, a_r.speaker_id
     FROM (
         SELECT res.id,res.start_time,res.end_time,res.tittle,res.date,res.speaker_id, res.event_id FROM
         
           (SELECT a.id,a.start_time,a.end_time,a.tittle,a.date,r.speaker_id, a.event_id 
            FROM public.actions AS a LEFT OUTER 
            JOIN public.reports AS r ON a.id=r.id ) AS res
         
             WHERE res.event_id=$1
    ) AS a_r
    ) AS acts 
    JOIN public.speakers AS s ON acts.speaker_id=s.id
    ORDER BY acts.date,acts.start_time;`, [eventId])
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (error) {
            res.status(500).send(error);
        });
});

router.post('/agenda/actions/post', (req, resp, next) => {
    const dataForInsertion = req.body;
    db.query('INSERT INTO actions(tittle, start_time, end_time, date, event_id) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [dataForInsertion.name, dataForInsertion.startTime, dataForInsertion.endTime, dataForInsertion.date,
        dataForInsertion.eventId])
        .then(function (data) {
            resp.status(200).json(data);
        });
});

router.post('/agenda/reports/post', (req, resp, next) => {
    const dataForInsertion = req.body;
    db.query('INSERT INTO reports(id, speaker_id) VALUES ($1, $2)',
        [dataForInsertion.id, dataForInsertion.speaker.id])
        .then(function (data) {
            resp.status(200).json(data);
        });
});

router.post('/agenda/actions/delete/:eventId', (req, resp, next) => {
    var eventId = req.params.eventId;
    db.query('DELETE FROM actions WHERE event_id=$1', [eventId])
        .then(function (data) {
            resp.status(200).json(data);
        });
});

router.get('/events/get', (req, res) => {
    db.many('SELECT e.id, e.name, e.date_from, l.country,l.city,l.address, e.photo, e.date_to FROM public.events AS e JOIN public.locations AS l ON e.location_id=l.id')
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (error) {
            res.status(500).send(error);
        });
});

router.get('/events/get/:eventId', (req, res) => {
    var eventId = req.params.eventId;
    db.one(`SELECT e.name, e.description, e.date_from, e.photo, e.date_to, l.country, l.city, l.address, l.id FROM public.events AS e JOIN public.locations AS l ON e.location_id=l.id AND e.id=$1`, [eventId])
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (error) {
            res.status(500).send(error);
        });
});

router.get('/conference/get/:speakerId', (req, res) => {
    var speakerId = req.params.speakerId;
    db.many(`SELECT events.id, events.name, events.date_from, events.photo, l.country, l.city, l.address FROM events JOIN public.locations AS l ON events.location_id=l.id JOIN  actions ON actions.event_id=events.id JOIN reports ON reports.id=actions.id WHERE reports.speaker_id=$1`, [speakerId])
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (error) {
            res.status(500).send(error);
        });
});

router.post('/events/post', (req, resp, next) => {
    const dataForInsertion = req.body;
    db.query(`INSERT INTO events(name, description, date_from, date_to, location_id, photo) 
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
        [dataForInsertion.name, dataForInsertion.description, dataForInsertion.dateFrom, dataForInsertion.dateTo,
        dataForInsertion.locationId, dataForInsertion.eventPhoto])
        .then(function (data) {
            resp.status(200).json(data);
        });
});

router.post('/events/update', (req, resp, next) => {
    const dataForInsertion = req.body;
    db.query(`UPDATE events SET name=$1, description=$2, date_from=$3, date_to=$4, location_id=$5, photo=$6
     WHERE id=$7`, [dataForInsertion.name,
        dataForInsertion.description, dataForInsertion.dateFrom, dataForInsertion.dateTo,
        dataForInsertion.location.id, dataForInsertion.eventPhoto, dataForInsertion.id])
        .then(function (data) {
            resp.status(200).json(data);
        });
});

module.exports = router;
