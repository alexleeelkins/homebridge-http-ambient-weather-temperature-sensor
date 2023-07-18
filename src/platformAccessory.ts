import { PlatformAccessory } from 'homebridge';

import { ExampleHomebridgePlatform } from './platform';

/**
 * Platform Accessory
 * An instance of this class is created for each accessory your platform registers
 * Each accessory may expose multiple services of different service types.
 */
export class ExamplePlatformAccessory {
  constructor(
    private readonly platform: ExampleHomebridgePlatform,
    private readonly accessory: PlatformAccessory,
  ) {

    // set accessory information
    this.accessory.getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Default-Manufacturer')
      .setCharacteristic(this.platform.Characteristic.Model, 'Default-Model')
      .setCharacteristic(this.platform.Characteristic.SerialNumber, 'Default-Serial');

    const temperatureService = this.accessory.getService(this.platform.Service.TemperatureSensor)
      || this.accessory.addService(this.platform.Service.TemperatureSensor);
    temperatureService.getCharacteristic(this.platform.Characteristic.CurrentTemperature)
      .on('get', this.handleTemperatureGet.bind(this));

    const humidityService = this.accessory.getService(this.platform.Service.HumiditySensor)
      || this.accessory.addService(this.platform.Service.HumiditySensor);
    humidityService.getCharacteristic(this.platform.Characteristic.CurrentRelativeHumidity)
      .on('get', this.handleHumidityGet.bind(this));
  }

  async handleTemperatureGet(callback: any) {
    // Fetch data and return the temperature
    const data = await this.platform.fetchData();
    if (data) {
      callback(null, data.temperature);
    } else {
      callback(new Error('Could not fetch data'));
    }
  }

  async handleHumidityGet(callback: any) {
    // Fetch data and return the humidity
    const data = await this.platform.fetchData();
    if (data) {
      callback(null, data.humidity);
    } else {
      callback(new Error('Could not fetch data'));
    }
  }
}
