export class CanvasUtil {
  canvas: any;

  ctx: any;

  /**
   *
   * @param canvas HTMLCanvasElement
   */
  constructor(canvas: any) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  drawVisualize(bufferLength: Uint8Array) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    this.ctx.fillStyle = '#ff5722';
    for (let index = 0; index < bufferLength.length; index += 1) {
      this.ctx.fillRect(
        index * (this.canvas.width / bufferLength.length),
        this.canvas.height - bufferLength[index],
        this.canvas.width / bufferLength.length - 1,
        bufferLength[index]
      );
    }
    this.ctx.save();
  }

  /**
   * 棒状のビジュアライザーを描画
   * @param bufferLength
   */
  drawBarVisualizer(bufferLength: Uint8Array) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    this.ctx.fillStyle = '#ff5722';
    for (let index = 0; index < bufferLength.length; index += 1) {
      this.ctx.fillRect(
        index * (this.canvas.width / bufferLength.length),
        this.canvas.height - bufferLength[index],
        this.canvas.width / bufferLength.length - 1,
        bufferLength[index]
      );
    }
    this.ctx.save();
  }

  /**
   * 円状のビジュアライザーを描画
   * @param bufferLength
   */
  drawCircleVisualizer(bufferLength: Uint8Array) {
    const angleStep = (Math.PI * 2) / bufferLength.length;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();

    // 円の半径
    const radius = 200;

    for (let index = 0; index < bufferLength.length; index += 1) {
      const dist = bufferLength[index] + radius;
      const angle = angleStep * index + 0.01;
      const x1 = this.canvas.width / 2 + radius * Math.cos(angle);
      const y1 = this.canvas.height / 2 + radius * Math.sin(angle);
      const x = this.canvas.width / 2 + dist * Math.cos(angle);
      const y = this.canvas.height / 2 + dist * Math.sin(angle);
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x, y);
      this.ctx.lineWidth = 5;
      this.ctx.closePath();
    }
    // 現在のパスを輪郭表示する
    this.ctx.stroke();
  }
}
