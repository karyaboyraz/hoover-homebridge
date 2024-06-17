import { Service, PlatformAccessory, CharacteristicValue } from 'homebridge';

import { ExampleHomebridgePlatform } from './platform.js';

export class WashingMachineAccessory {
  private service: Service;

  constructor(
    private readonly platform: ExampleHomebridgePlatform,
    private readonly accessory: PlatformAccessory,
  ) {
    this.accessory.getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Hoover')
      .setCharacteristic(this.platform.Characteristic.Model, 'Smart Washing Machine')
      .setCharacteristic(this.platform.Characteristic.SerialNumber, '1234567890');

    this.service = this.accessory.getService(this.platform.Service.Switch) || this.accessory.addService(this.platform.Service.Switch);

    this.service.setCharacteristic(this.platform.Characteristic.Name, accessory.context.device.exampleDisplayName);

    this.service.getCharacteristic(this.platform.Characteristic.On)
      .onSet(this.handleOnSet.bind(this))
      .onGet(this.handleOnGet.bind(this));

    this.service.getCharacteristic(this.platform.Characteristic.ProgrammableSwitchEvent)
      .onGet(this.handleRemainingDurationGet.bind(this));
  }

  async handleOnSet(value: CharacteristicValue) {
    this.platform.log.debug('Set On:', value);
  }

  async handleOnGet(): Promise<CharacteristicValue> {
    const isOn = true; // Çamaşır makinesinin durumu
    this.platform.log.debug('Get On ->', isOn);
    return isOn;
  }

  async handleRemainingDurationGet(): Promise<CharacteristicValue> {
    const remainingTime = 3600; // Kalan süre (saniye cinsinden)
    this.platform.log.debug('Get Remaining Duration ->', remainingTime);
    return remainingTime;
  }
}
