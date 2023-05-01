export const getColorByName = (name: string) => {
    switch (name.toLowerCase()) {
        case 'red':
            return Colors.lightRed;
        case 'blue':
            return Colors.lightBlue;
        case 'gray':
            return Colors.darkGray;
        case 'green':
            return Colors.darkGreen;
        case 'purple':
            return Colors.darkPurple;
        case 'orange':
            return Colors.darkOrange;
        default:
            return Colors.secondary
    }
}

export const Colors = {
    primary: '#0F2125',
    secondary: '#2C4A50',
    white: '#FFF',
    light: '#FFFFF7',
    lightGray: '#D3D3D3',
    darkGray: '#344247',
    orange: '#FFBD59',
    green: '#85CF76',
    teal: '#008080',
    purple: '#5D3FD3',
    darkGreen: '#2E8B57',
    darkPurple: '#301934',
    darkOrange: '#E3963E',
    lightBlue: '#2DB1E1',
    darkBlue: '#0F52BA',
    lightRed: '#CF6357',
    getColorByName: getColorByName,
    grayAlpha: (alphaValue: number) => `rgba(153,153,153,${alphaValue})`,
    blackAlpha: (alphaValue: number) => `rgba(0,0,0,${alphaValue})`,
};
