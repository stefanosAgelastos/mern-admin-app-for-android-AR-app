import Location from '../models/location';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all locations
 * @param req
 * @param res
 * @returns void
 */
export function getLocations(req, res) {
  Location.find().sort('-dateAdded').exec((err, locations) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ locations });
  });
}

/**
 * Save a location
 * @param req
 * @param res
 * @returns void
 */
export function addLocation(req, res) {

  // eslint-disable-next-line no-console
  console.log('equest received on addLocation:', req);

  if (!req.body.location.author || !req.body.location.title) {
    res.status(403).end();
  }

  const newLocation = new Location(req.body.location);

  // Let's sanitize inputs
  newLocation.title = sanitizeHtml(newLocation.title);
  newLocation.name = sanitizeHtml(newLocation.name);
  newLocation.content = sanitizeHtml(newLocation.content);
  /* maybe some change here ^^^^^^^^ we are receiving an object.. maybe no change needed though */

  newLocation.slug = slug(newLocation.title.toLowerCase(), { lowercase: true });
  newLocation.cuid = cuid();
  newLocation.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ location: saved });
    }
  });
}

/**
 * Get a single location
 * @param req
 * @param res
 * @returns void
 */
export function getLocation(req, res) {
  Location.findOne({ cuid: req.params.cuid }).exec((err, location) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ location });
  });
}

/**
 * Delete a location
 * @param req
 * @param res
 * @returns void
 */
export function deleteLocation(req, res) {
  Location.findOne({ cuid: req.params.cuid }).exec((err, location) => {
    if (err) {
      res.status(500).send(err);
    }

    location.remove(() => {
      res.status(200).end();
    });
  });
}
