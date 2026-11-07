/** Encode rounded-box surface normals into an SVG displacement texture. */
export function createLensMap(width: number, height: number, radius: number): string {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  const context = canvas.getContext('2d');
  if (!context) return '';
  const image = context.createImageData(canvas.width, canvas.height);
  const halfWidth = canvas.width / 2;
  const halfHeight = canvas.height / 2;
  const corner = Math.min(radius, halfWidth, halfHeight);

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const px = x + 0.5 - halfWidth;
      const py = y + 0.5 - halfHeight;
      const qx = Math.abs(px) - (halfWidth - corner);
      const qy = Math.abs(py) - (halfHeight - corner);
      const ox = Math.max(qx, 0);
      const oy = Math.max(qy, 0);
      const length = Math.hypot(ox, oy);
      const distance = length + Math.min(Math.max(qx, qy), 0) - corner;
      let nx = 0;
      let ny = 0;
      if (length > 0) {
        nx = Math.sign(px) * ox / length;
        ny = Math.sign(py) * oy / length;
      } else if (qx > qy) {
        nx = Math.sign(px);
      } else {
        ny = Math.sign(py);
      }
      // A smooth glass lip: curved at the perimeter, undistorted in the center.
      const depth = Math.max(0, -distance);
      const curvature = distance <= 0 ? Math.pow(Math.max(0, 1 - depth / 14), 2) : 0;
      const index = (y * canvas.width + x) * 4;
      image.data[index] = Math.round(128 - nx * curvature * 110);
      image.data[index + 1] = Math.round(128 - ny * curvature * 110);
      image.data[index + 2] = 128;
      image.data[index + 3] = 255;
    }
  }
  context.putImageData(image, 0, 0);
  return canvas.toDataURL();
}
