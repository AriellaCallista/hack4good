const mainColors = {
    pink1: "#E6666F",
    pink2: "#ED7079",
    pink3: "#FFD7D9",
    red1: "#D33333",
    white: "#FFFFFF",
    grey1: "#AF9999",
    grey2: "#F8EFEF",
    grey3: "#E1D2D2",
    grey4: "#E6E1E1",
    red2: "#9b2c2c",
}

export const colors = {
    darkPink: mainColors.pink1,
    lightPink: mainColors.pink3,
    lightGrey: mainColors.grey2,
    darkRed: mainColors.red1,
    darkGrey: mainColors.grey2,
    mediumPink: mainColors.pink2,
    fillGrey: mainColors.grey4,
    magentaRed: mainColors.red2,
    activeGrey: mainColors.grey3,

    button: {
        darkRed: {
            background: mainColors.red1,
            text: "white"
        },
        darkPink: {
            background: mainColors.pink1,
            text: "white"
        },
        lightPink: {
            background: mainColors.pink3,
            text: mainColors.red2
        },
        lightGrey: {
            background: mainColors.grey2,
            text: mainColors.red2
        },
        darkGrey: {
            background: mainColors.grey3,
            text: mainColors.red2
        },
        mediumPink: {
            background: mainColors.pink2,
            text: mainColors.white
        }
    }
}