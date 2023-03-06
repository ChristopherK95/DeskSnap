type Colors = {
  white: 'ffffff';
  fadedWhite: 'bbbbbb';
  orange: 'fa7646';
  lightOrange: 'ff8e38';
  black: '151515';
  gray: '2f2f2f';
  darkGray: '222';
  lightGray: '5b5b5b';
  red: 'af0202';
  peach: 'ff564e';
  redHover: '990404';
  acceptGreen: '34cf48';
  denyRed: 'e05d3d';
  error: 'ea512e';
};

const colors: Colors = {
  white: 'ffffff',
  fadedWhite: 'bbbbbb',
  orange: 'fa7646',
  lightOrange: 'ff8e38',
  black: '151515',
  gray: '2f2f2f',
  darkGray: '222',
  lightGray: '5b5b5b',
  red: 'af0202',
  peach: 'ff564e',
  redHover: '990404',
  acceptGreen: '34cf48',
  denyRed: 'e05d3d',
  error: 'ea512e',
};

export default (color: keyof Colors) => {
  return `#${colors[color]}`;
};
