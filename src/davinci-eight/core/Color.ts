import clamp from '../math/clamp'
import ColumnVector from '../math/ColumnVector'
import {Coords} from '../math/Coords'
import config from '../config'
import ErrorMode from '../core/ErrorMode'
import AbstractColor from './AbstractColor'
import isDefined from '../checks/isDefined'
import Matrix3 from '../math/Matrix3'
import MutableLinearElement from '../math/MutableLinearElement'
import mustBeArray from '../checks/mustBeArray'
import mustBeGE from '../checks/mustBeGE'
import mustBeLE from '../checks/mustBeLE'
import mustBeNumber from '../checks/mustBeNumber'
import principalAngle from './principalAngle'
import SpinorE3 from '../math/SpinorE3'

const COORD_R = 0
const COORD_G = 1
const COORD_B = 2

/**
 * <p>
 * A mutable type representing a color through its RGB components.
 * </p>
 * <p>
 * WARNING: In many object-oriented designs, types representing values are completely immutable.
 * In a graphics library where data changes rapidly and garbage collection might become an issue,
 * it is common to use reference types, such as in this design. This mutability can lead to
 * difficult bugs because it is hard to reason about where a color may have changed. 
 * </p>
 */
export class Color extends Coords implements AbstractColor, ColumnVector<Matrix3, Color>, MutableLinearElement<AbstractColor, Color, SpinorE3, AbstractColor, number, number> {

    /**
     *
     */
    public static black = new Color(0, 0, 0)

    /**
     *
     */
    public static blue = new Color(0, 0, 1)

    /**
     *
     */
    public static green = new Color(0, 1, 0)

    /**
     *
     */
    public static cyan = new Color(0, 1, 1)

    /**
     *
     */
    public static red = new Color(1, 0, 0)

    /**
     *
     */
    public static magenta = new Color(1, 0, 1)

    /**
     *
     */
    public static yellow = new Color(1, 1, 0)

    /**
     *
     */
    public static white = new Color(1, 1, 1)

    /**
     *
     */
    public static gray = new Color(0.5, 0.5, 0.5)

    constructor(r: number, g: number, b: number) {
        super([r, g, b], false, 3)

        mustBeGE('r', r, 0)
        mustBeLE('r', r, 1)

        mustBeGE('g', g, 0)
        mustBeLE('g', g, 1)

        mustBeGE('b', b, 0)
        mustBeLE('b', b, 1)
    }

    /**
     *
     */
    get r(): number {
        return this.coords[COORD_R]
    }
    set r(r: number) {
        this.coords[COORD_R] = clamp(r, 0, 1)
    }

    /**
     *
     */
    get g(): number {
        return this.coords[COORD_G]
    }
    set g(g: number) {
        this.coords[COORD_G] = clamp(g, 0, 1)
    }

    /**
     *
     */
    get b(): number {
        return this.coords[COORD_B]
    }
    set b(b: number) {
        this.coords[COORD_B] = clamp(b, 0, 1)
    }

    public add(rhs: AbstractColor): Color {
        return this
    }

    public add2(a: AbstractColor, b: AbstractColor): Color {
        return this
    }

    public applyMatrix(σ: Matrix3): Color {
        return this
    }

    /**
     * @param n
     * @returns
     */
    public approx(n: number): Color {
        super.approx(n)
        return this
    }

    /**
     * @returns
     */
    public clone(): Color {
        return new Color(this.r, this.g, this.b)
    }

    /**
     * @param color
     * @returns
     */
    public copy(color: AbstractColor): Color {
        if (isDefined(color)) {
            this.r = color.r
            this.g = color.g
            this.b = color.b
            return this
        }
        else {
            // We can choose what to do based upon a global setting?
            this.r = Math.random()
            this.g = Math.random()
            this.b = Math.random()
        }
    }

    public divByScalar(α: number): Color {
        return this
    }

    /**
     * @param target
     * @param α
     * @returns
     */
    public lerp(target: AbstractColor, α: number): Color {
        this.r += (target.r - this.r) * α
        this.g += (target.g - this.g) * α
        this.b += (target.b - this.b) * α
        return this
    }

    /**
     *
     * @readOnly
     */
    get luminance(): number {
        return Color.luminance(this.r, this.g, this.b);
    }

    public neg(): Color {
        return this
    }

    public reflect(n: AbstractColor): Color {
        return this
    }

    public rotate(R: SpinorE3): Color {
        return this
    }

    public scale(α: number): Color {
        return this
    }

    public slerp(target: AbstractColor, α: number): Color {
        return this
    }

    public stress(σ: AbstractColor): Color {
        return this
    }

    public sub(rhs: AbstractColor): Color {
        return this
    }

    public sub2(a: AbstractColor, b: AbstractColor): Color {
        return this
    }

    public toExponential(fractionDigits?: number): string {
        return this.toString()
    }

    public toFixed(fractionDigits?: number): string {
        return this.toString()
    }

    public toPrecision(precision?: number): string {
        return this.toString()
    }

    /**
     * @returns
     */
    public toString(): string {
        // FIXME: Use vector stuff
        return "Color(" + this.r + ", " + this.g + ", " + this.b + ")"
    }

    public zero(): Color {
        return this
    }

    /**
     * @param color
     * @returns
     */
    public static copy(color: AbstractColor): Color {
        return new Color(color.r, color.g, color.b)
    }

    /**
     * @param r
     * @param g
     * @param b
     * @returns
     */
    public static luminance(r: number, g: number, b: number): number {
        mustBeNumber('r', r)
        mustBeNumber('g', g)
        mustBeNumber('b', b)
        const pow = Math.pow
        const γ = 2.2
        return 0.2126 * pow(r, γ) + 0.7152 * pow(b, γ) + 0.0722 * pow(b, γ)
    }

    /**
     * @param coords
     * @returns
     */
    public static fromCoords(coords: number[]): Color {
        mustBeArray('coords', coords)
        const r = mustBeNumber('r', coords[COORD_R])
        const g = mustBeNumber('g', coords[COORD_G])
        const b = mustBeNumber('b', coords[COORD_B])
        return new Color(r, g, b)
    }

    /**
     * Converts an angle, radius, height to a color on a color wheel.
     *
     * @param H
     * @param S
     * @param L
     * @returns
     */
    public static fromHSL(H: number, S: number, L: number): Color {
        mustBeNumber('H', H)
        mustBeNumber('S', S)
        mustBeNumber('L', L)
        const C = (1 - Math.abs(2 * L - 1)) * S
        /**
         * This function captures C and L
         */
        function matchLightness(R: number, G: number, B: number): Color {
            // var x = Color.luminance(R, G, B)
            const m = L - 0.5 * C
            return new Color(R + m, G + m, B + m)
        }
        const sextant = ((principalAngle(H) / Math.PI) * 3) % 6;
        const X = C * (1 - Math.abs(sextant % 2 - 1));
        if (sextant >= 0 && sextant < 1) {
            return matchLightness(C, X/*C*(sextant-0)*/, 0);
        }
        else if (sextant >= 1 && sextant < 2) {
            return matchLightness(X/*C*(2-sextant)*/, C, 0);
        }
        else if (sextant >= 2 && sextant < 3) {
            return matchLightness(0, C, C * (sextant - 2))
        }
        else if (sextant >= 3 && sextant < 4) {
            return matchLightness(0, C * (4 - sextant), C)
        }
        else if (sextant >= 4 && sextant < 5) {
            return matchLightness(X, 0, C)
        }
        else if (sextant >= 5 && sextant < 6) {
            return matchLightness(C, 0, X)
        }
        else {
            return matchLightness(0, 0, 0)
        }
    }

    /**
     *
     * @param r
     * @param g
     * @param b
     * @returns
     */
    public static fromRGB(r: number, g: number, b: number): Color {
        mustBeNumber('r', r)
        mustBeNumber('g', g)
        mustBeNumber('b', b)
        return new Color(clamp(r, 0, 1), clamp(g, 0, 1), clamp(b, 0, 1))
    }

    /**
     * @param x
     * @returns
     */
    public static isInstance(x: any): boolean {
        return x instanceof Color
    }

    /**
     * @param a
     * @param b
     * @param α
     * @returns
     */
    public static lerp(a: AbstractColor, b: AbstractColor, α: number): Color {
        return Color.copy(a).lerp(b, clamp(α, 0, 1))
    }

    /**
     *
     * @param name
     * @param color
     * @returns
     */
    public static mustBe(name: string, color: Color): Color {
        if (Color.isInstance(color)) {
            return color
        }
        else {
            switch (config.errorMode) {
                case ErrorMode.IGNORE: {
                    return Color.random()
                }
                case ErrorMode.WARNME: {
                    console.warn(`${name} must be a Color.`)
                    return Color.random()
                }
                default: {
                    throw new Error(`${name} must be a Color.`)
                }
            }
        }
    }

    /**
     *
     * @returns
     */
    public static random(): Color {
        return Color.fromRGB(Math.random(), Math.random(), Math.random())
    }
}
