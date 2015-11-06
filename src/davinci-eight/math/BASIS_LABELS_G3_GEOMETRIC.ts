let SCALAR_POS_SYMBOL = "1"
let E1_NEG_SYMBOL = "←"
let E1_POS_SYMBOL = "→"
let E2_POS_SYMBOL = "↑"
let E2_NEG_SYMBOL = "↓"
let E3_POS_SYMBOL = "⊙"
let E3_NEG_SYMBOL = "⊗"
let E12_NEG_SYMBOL = "↻"
let E12_POS_SYMBOL = "↺"
let E31_POS_SYMBOL = "⊶"
let E31_NEG_SYMBOL = "⊷"
let E23_NEG_SYMBOL = "⬘"
let E23_POS_SYMBOL = "⬙"
let PSEUDO_POS_SYMBOL = "☐"

let BASIS_LABELS_G3_GEOMETRIC: string[][] = [
    [SCALAR_POS_SYMBOL, SCALAR_POS_SYMBOL],
    [E1_NEG_SYMBOL, E1_POS_SYMBOL],
    [E2_NEG_SYMBOL, E2_POS_SYMBOL],
    [E3_NEG_SYMBOL, E3_POS_SYMBOL],
    [E12_NEG_SYMBOL, E12_POS_SYMBOL],
    [E23_NEG_SYMBOL, E23_POS_SYMBOL],
    [E31_NEG_SYMBOL, E31_POS_SYMBOL],
    [PSEUDO_POS_SYMBOL, PSEUDO_POS_SYMBOL]
]

export = BASIS_LABELS_G3_GEOMETRIC