import IContextConsumer = require('../core/IContextConsumer')
import IContextMonitor = require('../core/IContextMonitor')
import Shareable = require('../utils/Shareable')
import mustHaveOwnProperty = require('../checks/mustHaveOwnProperty')
import mustSatisfy = require('../checks/mustSatisfy')
import isInteger = require('../checks/isInteger')

function beInstanceOfContextMonitors() {
  return "be an instance of MonitorList";
}

function beContextMonitorArray() {
  return "be IContextMonitor[]";
}

function identity(monitor: IContextMonitor): IContextMonitor {
  return monitor;
}

let METHOD_ADD    = 'addContextListener';
let METHOD_REMOVE = 'removeContextListener';

/**
 * Implementation Only.
 */
class MonitorList extends Shareable {
  private monitors: IContextMonitor[];
  constructor(monitors: IContextMonitor[] = []) {
    super('MonitorList')
    this.monitors = monitors.map(identity)
    this.monitors.forEach(function(monitor){
      monitor.addRef()
    })
  }
  protected destructor(): void {
    this.monitors.forEach(function(monitor){
      monitor.release()
    })
  }
  addContextListener(user: IContextConsumer) {
    this.monitors.forEach(function(monitor){
      monitor.addContextListener(user)
    });
  }
  push(monitor: IContextMonitor): void {
    this.monitors.push(monitor)
  }
  removeContextListener(user: IContextConsumer) {
    this.monitors.forEach(function(monitor){
      monitor.removeContextListener(user)
    });
  }
  synchronize(user: IContextConsumer) {
    this.monitors.forEach(function(monitor){
      monitor.synchronize(user)
    });
  }
  toArray(): IContextMonitor[] {
    return this.monitors.map(identity)
  }
  public static copy(monitors: IContextMonitor[]): MonitorList {
    return new MonitorList(monitors)
  }
  public static isInstanceOf(candidate: any): boolean {
    return candidate instanceof MonitorList
  }
  public static assertInstance(name: string, candidate: MonitorList, contextBuilder: () => string): MonitorList {
    if (MonitorList.isInstanceOf(candidate)) {
      return candidate
    }
    else {
      mustSatisfy(name, false, beInstanceOfContextMonitors, contextBuilder)
      throw new Error()
    }
  }
  public static verify(name: string, monitors: IContextMonitor[], contextBuilder?: () => string): IContextMonitor[] {
    mustSatisfy(name, isInteger(monitors['length']), beContextMonitorArray, contextBuilder);
    let monitorsLength: number = monitors.length
    for (var i = 0; i < monitorsLength; i++) {
//      let monitor = monitors[i];
//      mustHaveOwnProperty(name, monitor, METHOD_ADD, contextBuilder);
//      mustHaveOwnProperty(name, monitor, METHOD_REMOVE, contextBuilder);
    }
    return monitors
  }
  public static addContextListener(user: IContextConsumer, monitors: IContextMonitor[]) {
    MonitorList.verify('monitors', monitors, () => { return 'MonitorList.addContextListener'; });
    monitors.forEach(function(monitor) {
      monitor.addContextListener(user)
    });
  }
  public static removeContextListener(user: IContextConsumer, monitors: IContextMonitor[]) {
    MonitorList.verify('monitors', monitors, () => { return 'MonitorList.removeContextListener'; });
    monitors.forEach(function(monitor) {
      monitor.removeContextListener(user)
    });
  }
  public static synchronize(user: IContextConsumer, monitors: IContextMonitor[]) {
    MonitorList.verify('monitors', monitors, () => { return 'MonitorList.removeContextListener'; });
    monitors.forEach(function(monitor) {
      monitor.synchronize(user)
    });
  }
}

export = MonitorList
