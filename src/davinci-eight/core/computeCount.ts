import Attribute from './Attribute'
import mustBeInteger from '../checks/mustBeInteger'

/**
 * Computes the number of elements represented by the attribute values.
 */
export default function(attribs: { [name: string]: Attribute }, aNames: string[]): number {
  const aNamesLen = aNames.length
  for (let a = 0; a < aNamesLen; a++) {
    const aName = aNames[a]
    const attrib: Attribute = attribs[aName]
    const vLength = attrib.values.length
    const size = mustBeInteger('size', attrib.size)
    return vLength / size
  }
  return 0
}