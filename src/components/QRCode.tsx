import { QRCodeSVG } from "qrcode.react";

interface QRCodeProps {
  value: string;
  size?: number;
  fgColor?: string;
  bgColor?: string;
}

export function QRCode({
  value,
  size = 200,
  fgColor = "#ffffff",
  bgColor = "transparent",
}: QRCodeProps) {
  return (
    <QRCodeSVG
      value={value}
      size={size}
      fgColor={fgColor}
      bgColor={bgColor}
      level="L"
    />
  );
}
