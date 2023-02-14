type Colors = {
  white: 'ffffff';
  orange: 'fa7646';
  lightOrange: 'ff8e38';
  black: '151515';
  gray: '2f2f2f';
  darkGray: '222';
  red: 'af0202';
  redHover: '990404';
  acceptGreen: '34cf48';
  denyRed: 'e05d3d';
};

const colors: Colors = {
  white: 'ffffff',
  orange: 'fa7646',
  lightOrange: 'ff8e38',
  black: '151515',
  gray: '2f2f2f',
  darkGray: '222',
  red: 'af0202',
  redHover: '990404',
  acceptGreen: '34cf48',
  denyRed: 'e05d3d',
};

export default (color: keyof Colors) => {
  return `#${colors[color]}`;
};
