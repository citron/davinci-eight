import { Color } from '../core/Color';
import { Facet } from '../core/Facet';
import { FacetVisitor } from '../core/FacetVisitor';
/**
 *
 */
export declare class ColorFacet implements Facet {
    uColorName: string;
    /**
     *
     */
    static PROP_RGB: string;
    /**
     *
     */
    static PROP_RED: string;
    /**
     *
     */
    static PROP_GREEN: string;
    /**
     *
     */
    static PROP_BLUE: string;
    /**
     *
     */
    color: Color;
    /**
     *
     */
    constructor(uColorName?: string);
    /**
     * The red component of the color.
     */
    r: number;
    /**
     * The green component of the color.
     */
    g: number;
    /**
     * The blue component of the color.
     */
    b: number;
    scaleRGB(α: number): ColorFacet;
    setRGB(r: number, g: number, b: number): ColorFacet;
    /**
     *
     */
    setUniforms(visitor: FacetVisitor): void;
}
