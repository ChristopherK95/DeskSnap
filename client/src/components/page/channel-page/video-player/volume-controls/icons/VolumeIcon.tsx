import styled from 'styled-components';
import useColor from '../../../../../../reusable/hooks/use-color';

const Container = styled.div<{
  volume: number;
  muted: boolean;
  pressed: boolean;
}>`
  width: 25px;
  height: 25px;
  display: flex;
  font-smoothing: antialiased;
  cursor: pointer;
  display: ${(p) => (p.pressed ? 'block' : 'none')};

  :hover {
    #volume {
      fill: ${useColor('white')};
    }
    #volume-low,
    #volume-high,
    #mute {
      stroke: ${useColor('white')};
    }
  }

  #volume {
    fill: ${useColor('fadedWhite')};
    transition: fill 0.3s ease;
  }
  #volume-high,
  #volume-low,
  #mute {
    stroke: ${useColor('fadedWhite')};
    transition: stroke-opacity 0.5s ease, stroke 0.3s ease;
  }

  ${(p) => {
    if (p.muted) {
      return `
        #volume-high, #volume-low {
          stroke-opacity: 0; 
        }
        #mute {
          stroke-opacity: 1; 
        }
      `;
    }
    if (p.volume === 0) {
      return `
        #volume-high, #volume-low {
          stroke-opacity: 0; 
        }
        #mute {
          stroke-opacity: 0; 
        }
      `;
    }
    if (p.volume <= 0.5) {
      return `
        #volume-low {
          stroke-opacity: 1; 
        }
        #volume-high {
          stroke-opacity: 0;
        }
        #mute {
          stroke-opacity: 0; 
        }
      `;
    }
    if (p.volume > 0.5) {
      return `
        #volume-low, #volume-high {
          stroke-opacity: 1; 
        }
        #mute {
          stroke-opacity: 0; 
        }
      `;
    }
  }}
`;

const VolumeIcon = (props: {
  volume: number;
  muted: boolean;
  pressed: boolean;
  onClick: () => void;
}) => {
  return (
    <Container
      id="volume-icon"
      volume={props.volume}
      muted={props.muted}
      pressed={props.pressed}
      onClick={props.onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 160.153 160.564"
      >
        <g transform="translate(-28.33 -64.737)">
          <path
            id="volume"
            fillOpacity="1"
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="4"
            strokeOpacity="1"
            strokeWidth="6.365"
            d="M122.205 70.528c0-13.089-33.553 27.012-50.33 40.519H31.514v68.02h40.363c16.776 13.507 50.329 53.372 50.329 40.519v-74.529z"
          ></path>
          <path
            id="volume-low"
            fill="none"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeLinejoin="miter"
            strokeMiterlimit="4"
            strokeOpacity="1"
            strokeWidth="14"
            d="M144.123 115.976s22.056 28.782 0 58.142"
          ></path>
          <path
            id="volume-high"
            fill="none"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeLinejoin="miter"
            strokeMiterlimit="4"
            strokeOpacity="1"
            strokeWidth="14"
            d="M159.346 99.805s44.158 44.792 0 90.484"
          ></path>
          <g transform="translate(-1.526 85.573)">
            <g
              id="mute"
              fill="none"
              strokeDasharray="none"
              strokeLinecap="round"
              strokeLinejoin="miter"
              strokeMiterlimit="4"
              strokeOpacity="1"
              strokeWidth="15"
              transform="translate(90.506 23.81)"
            >
              <path d="M56.776 18.315L91.422 52.96"></path>
              <path d="M56.776 52.96l34.646-34.645"></path>
            </g>
          </g>
        </g>
      </svg>
    </Container>
  );
};

export default VolumeIcon;
