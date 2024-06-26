import color from '../colors'
/**
 * @public
 * @description Basic css helper for different colored Alert components.
 * @param {string} background
 * @param {string} border
 * @param {string} bodyColor
 * @returns {string}
 */
export function alertVariant(background: any, border: any, bodyColor: any) {
  return `
    background-color: ${background};
    border-color: ${border};
    color: ${bodyColor};

    hr {
      border-top-color: ${color(border)
        .darken(0.5)
        .toString()};
    }
    .alert-link {
      color: ${color(bodyColor)
        .darken(0.1)
        .toString()};
    }
  `
}

export default {
  alertVariant,
}
