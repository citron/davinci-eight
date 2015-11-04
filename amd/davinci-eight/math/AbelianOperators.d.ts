/**
 * Special methods for operators on elements of abelian groups (additive).
 * This is provided for interface consistency.
 * It may not adhere to strict mathematical definitions.
 */
interface AbelianOperators<T> {
    /**
     * Binary this + other
     */
    __add__(other: number | T): T;
    /**
     * Binary other + this
     */
    __radd__(other: number | T): T;
    /**
     * Binary this - other
     */
    __sub__(other: number | T): T;
    /**
     * Binary other - this
     */
    __rsub__(other: number | T): T;
    /**
     * Unary +
     */
    __pos__(): T;
    /**
     * Unary -
     */
    __neg__(): T;
    /**
     * The additive inverse is denoted by neg.
     */
    neg(): T;
    /**
     * Determines whether this element is the additive identity, <b>0</b>.
     */
    isZero(): boolean;
}
export = AbelianOperators;
