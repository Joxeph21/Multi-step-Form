const validOTP = [
  {
    pin: 1234,
  },
  {
    pin: 5678,
  },
];

export function verifyCode(str) {
  const validPin = validOTP.map((pin) => pin.pin);
  return validPin.includes(Number(str));
}
