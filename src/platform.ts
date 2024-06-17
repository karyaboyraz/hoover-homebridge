import { API, DynamicPlatformPlugin, Logging, PlatformAccessory, PlatformConfig, Service, Characteristic } from 'homebridge';

import { HooverPlatform, PLUGIN_NAME } from './settings.js';
import { WashingMachineAccessory } from './platformAccessory.js';

export class ExampleHomebridgePlatform implements DynamicPlatformPlugin {
  public readonly Service: typeof Service;
  public readonly Characteristic: typeof Characteristic;

  public readonly accessories: PlatformAccessory[] = [];

  constructor(
    public readonly log: Logging,
    public readonly config: PlatformConfig,
    public readonly api: API,
  ) {
    this.Service = api.hap.Service;
    this.Characteristic = api.hap.Characteristic;

    this.log.debug('Finished initializing platform:', this.config.name);

    if (!log.success) {
      log.success = log.info;
    }

    this.api.on('didFinishLaunching', () => {
      log.debug('Executed didFinishLaunching callback');
      this.discoverDevices();
    });
  }

  configureAccessory(accessory: PlatformAccessory) {
    this.log.info('Loading accessory from cache:', accessory.displayName);
    this.accessories.push(accessory);
  }

  discoverDevices() {
    const exampleDevices = [
      {
        exampleUniqueId: 'WASH123',
        exampleDisplayName: 'Washing Machine',
      },
    ];

    for (const device of exampleDevices) {
      const uuid = this.api.hap.uuid.generate(device.exampleUniqueId);

      const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);

      if (existingAccessory) {
        this.log.info('Restoring existing accessory from cache:', existingAccessory.displayName);
        new WashingMachineAccessory(this, existingAccessory);
      } else {
        this.log.info('Adding new accessory:', device.exampleDisplayName);

        const accessory = new this.api.platformAccessory(device.exampleDisplayName, uuid);
        accessory.context.device = device;

        new WashingMachineAccessory(this, accessory);

        this.api.registerPlatformAccessories(PLUGIN_NAME, HooverPlatform, [accessory]);
      }
    }
  }
}
