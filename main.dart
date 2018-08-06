import "dart:html";

import "canvas_tools.dart";
import "simulation.dart";

void main() {
  var canvas = CanvasTools.configureSquareCanvas(maxSizeProportion: 0.6);
  var context = canvas.getContext("2d") as CanvasRenderingContext2D;

  new Simulation(canvas, context);
}
