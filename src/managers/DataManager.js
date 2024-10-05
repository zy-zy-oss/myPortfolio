class DataManager {
  setDeviceType(deviceType) {
    const possibleTypes = ["mobile-vertical", "mobile-horizontal", "desktop"];
    if (!possibleTypes.includes(deviceType)) {
      throw Error("Device type passed does not exist!");
    }

    this.deviceType = deviceType;
  }

  get(property) {
    if (!this[property]) {
      throw Error("Data property doesn't exist!");
    }

    return this[property];
  }
}

const dataManager = new DataManager();

export default dataManager;
