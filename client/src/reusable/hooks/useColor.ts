type Colors = {
  white: 'ffffff';
  orange: 'fa7646';
  lightOrange: 'ff8e38';
  black: '252222';
  gray: '424242';
  darkGray: '363636';
  red: 'af0202';
  redHover: '990404';
  acceptGreen: '34cf48';
  denyRed: 'e05d3d';
};

const colors: Colors = {
  white: 'ffffff',
  orange: 'fa7646',
  lightOrange: 'ff8e38',
  black: '252222',
  gray: '424242',
  darkGray: '363636',
  red: 'af0202',
  redHover: '990404',
  acceptGreen: '34cf48',
  denyRed: 'e05d3d',
};

export default (color: keyof Colors) => {
  return `#${colors[color]}`;
};
