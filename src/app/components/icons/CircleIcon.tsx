interface CircleIconProps {
  width?: string;
  height?: string;
  color?: string;
  style?: React.CSSProperties;
}


export default function CircleIcon({ width = '20px', height = '20px', color = '#fff', style }: CircleIconProps) {
  return <>
    <svg width={width} height={height} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M9 3.51221C5.50442 4.74772 3 8.08143 3 12.0001C3 16.9707 7.02944 21.0001 12 
          21.0001C16.9706 21.0001 21 16.9707 21 12.0001C21 8.08143 18.4956 4.74772 15 3.51221"
          stroke={color} 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
      />
    </svg>
  </>
};