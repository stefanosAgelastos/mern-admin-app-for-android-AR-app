import { Router } from 'express';
import * as LocationController from '../controllers/location.controller';
const router = new Router();

// Get all Locations
router.route('/locations').get(LocationController.getLocations);

// Get one location by cuid
router.route('/locations/:cuid').get(LocationController.getLocation);

// Add a new Location
router.route('/locations').post(LocationController.addLocation);

// Delete a location by cuid
router.route('/locations/:cuid').delete(LocationController.deleteLocation);

export default router;
