const CheckMark = ({ size = 18, color = "white" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="checkmark"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export default CheckMark;
