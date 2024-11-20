import { makeTheme } from 'dripsy'

const getFontFamily = (language: string) => {
  return language === 'GHEAGrpalatReg'
}

export const theme = () =>
  makeTheme({
    text: {
      default: {
        fontFamily: 'Grapalat Regular',
        fontSize: 18,
        color: 'black',
      },
      heading: {
        fontFamily: 'Grapalat Bold',
        fontSize: 24,
        fontWeight: 'bold',
      },
      h1: {
        fontFamily: 'Grapalat Bold',
      },
    },
    fonts: {
      root: 'Grapalat Regular',
    },
  })
