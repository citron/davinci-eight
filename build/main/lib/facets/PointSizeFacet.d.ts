import { Facet } from '../core/Facet';
import { FacetVisitor } from '../core/FacetVisitor';
/**
 *
 */
export declare class PointSizeFacet implements Facet {
    /**
     *
     */
    pointSize: number;
    /**
     *
     */
    constructor(pointSize?: number);
    /**
     *
     */
    setUniforms(visitor: FacetVisitor): void;
}
