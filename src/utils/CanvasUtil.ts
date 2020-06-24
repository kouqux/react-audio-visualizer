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
}
