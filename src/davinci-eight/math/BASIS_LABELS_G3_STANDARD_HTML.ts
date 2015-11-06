let SCALAR_SYMBOL = "1"
let E1_SYMBOL = "<b>e</b><sub>1</sub>"
let E2_SYMBOL = "<b>e</b><sub>2</sub>"
let E3_SYMBOL = "<b>e</b><sub>3</sub>"
let E12_SYMBOL = E1_SYMBOL + E2_SYMBOL
let E23_SYMBOL = E2_SYMBOL + E3_SYMBOL
let E31_SYMBOL = E3_SYMBOL + E1_SYMBOL
let PSEUDO_SYMBOL = E1_SYMBOL + E2_SYMBOL + E3_SYMBOL

let BASIS_LABELS_G3_STANDARD_HTML: string[][] = [
    [SCALAR_SYMBOL],
    [E1_SYMBOL],
    [E2_SYMBOL],
    [E3_SYMBOL],
    [E12_SYMBOL],
    [E23_SYMBOL],
    [E31_SYMBOL],
    [PSEUDO_SYMBOL]
]

export = BASIS_LABELS_G3_STANDARD_HTML