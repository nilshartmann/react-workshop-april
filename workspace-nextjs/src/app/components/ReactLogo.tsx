export default function ReactLogo() {
  // SOURCE: https://upload.wikimedia.org/wikipedia/commons/3/30/React_Logo_SVG.svg
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="-11 -10.13 22 20.27"
    >
      <circle r="2" fill="#087ea4" />
      <g stroke="white">
        <ellipse rx="10" ry="4.5" />
        <ellipse rx="10" ry="4.5" transform="rotate(60)" />
        <ellipse rx="10" ry="4.5" transform="rotate(120)" />
      </g>
    </svg>
  );
}
