interface ColoredDotProps {
  color: string | null;
}

const ColorBadge: React.FC<ColoredDotProps> = ({ color }) => {
  const dotStyle = {
    backgroundColor: color || 'blue',
    width: '10px',
    height: '10px',
    borderRadius: '100%',
    display: 'inline-block',
  };

  return <span style={dotStyle}></span>;
};

export default ColorBadge;
