import { API } from 'homebridge';

import { HooverPlatform } from './settings.js';
import { ExampleHomebridgePlatform } from './platform.js';

/**
 * This method registers the platform with Homebridge
 */
export default (api: API) => {
  api.registerPlatform(HooverPlatform, ExampleHomebridgePlatform);
};
