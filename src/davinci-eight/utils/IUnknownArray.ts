import IUnknown = require('../core/IUnknown')
import Shareable = require('../utils/Shareable')

function className(userName: string): string {
  return 'IUnknownArray:' + userName
}

/**
 * Essentially constructs the IUnknownArray without incrementing the
 * reference count of the elements, and without creating zombies.
 */
function transferOwnership<T extends IUnknown>(data: T[], userName: string): IUnknownArray<T> {
  if (data) {
    var result = new IUnknownArray<T>(data, userName)
    // The result has now taken ownership of the elements, so we can release.
    for (var i = 0, iLength = data.length; i < iLength; i++) {
      var element = data[i]
      if (element) {
        element.release()
      }
    }
    return result
  }
  else {
    return void 0
  }
}

/**
 * @class IUnknownArray
 */
class IUnknownArray<T extends IUnknown> extends Shareable {
  private _elements: T[];
  private userName: string;
  /**
   * Collection class for maintaining an array of types derived from IUnknown.
   * Provides a safer way to maintain reference counts than a native array.
   * @class IUnknownArray
   * @constructor
   */
  constructor(elements: T[] = [], userName: string) {
   super(className(userName))
   this._elements = elements
    for (var i = 0, l = this._elements.length; i < l; i++) {
      this._elements[i].addRef()
    }
    this.userName = userName;
  }
  /**
   * @method destructor
   * @return {void}
   * @protected
   */
  protected destructor(): void {
    for (var i = 0, l = this._elements.length; i < l; i++) {
      this._elements[i].release()
    }
    this._elements = void 0
    // Don't set the userName property to undefined so that we can report zombie calls.
    super.destructor()
  }
  /**
   * Gets the element at the specified index, incrementing the reference count.
   * @method get
   * @param index {number}
   * @return {T}
   */
  get(index: number): T {
    var element: T
    element = this._elements[index]
    if (element) {
      element.addRef()
    }
    return element
  }
  /**
   * @method indexOf
   * @param searchElement {T}
   * @param [fromIndex]
   * @return {number}
   */
  indexOf(searchElement: T, fromIndex?: number): number {
    return this._elements.indexOf(searchElement, fromIndex);
  }
  /**
   * @property length
   * @return {number}
   */
  get length(): number {
    if (this._elements) {
      return this._elements.length;
    }
    else {
      console.warn(className(this.userName) + " is now a zombie, length is undefined")
      return void 0
    }
  }
  /**
   * The slice() method returns a shallow copy of a portion of an array into a new array object.
   * It does not remove elements from the original array.
   * @method slice
   * @param begin [number]
   * @param end [number]
   */
  slice(begin?: number, end?: number): IUnknownArray<T> {
    return new IUnknownArray<T>(this._elements.slice(begin, end), 'IUnknownArray.slice()')
  }
  /**
   * The splice() method changes the content of an array by removing existing elements and/or adding new elements.
   * @method splice
   * @param index {number}
   * @param deleteCount {number}
   * @return {IUnkownArray<T>}
   */
  splice(index: number, deleteCount: number): IUnknownArray<T> {
    // The release burdon is on the caller now.
    return transferOwnership(this._elements.splice(index, deleteCount), 'IUnknownArray.slice()')
  }
  /**
   * @method shift
   * @return {T}
   */
  shift(): T {
    // No need to addRef because ownership is being transferred to caller.
    return this._elements.shift()
  }
  /**
   * Traverse without Reference Counting
   * @method forEach
   * @param callback {(value: T, index: number)=>void}
   * @return {void}
   */
  forEach(callback: (value: T, index: number) => void): void {
    return this._elements.forEach(callback);
  }
  /**
   * Pushes an element onto the tail of the list and increments the element reference count.
   * @method push
   * @param element {T}
   * @return {number}
   */
  push(element: T): number {
    var x: number = this._elements.push(element)
    if (element) {
      element.addRef()
    }
    return x
  }
  /**
   * @method pop
   * @return {T}
   */
  pop(): T {
    // No need to addRef because ownership is being transferred to caller.
    return this._elements.pop()
  }
}

export = IUnknownArray;