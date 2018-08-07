import "dart:math";
import "point_generator.dart";
import "halton_generator.dart";

class HaltonPointGenerator implements PointGenerator {
  final HaltonGenerator xGenerator = new HaltonGenerator(2);
  final HaltonGenerator yGenerator = new HaltonGenerator(3);

  void reset() {
    xGenerator.index = 1;
    yGenerator.index = 1;
  }

  Point<double> get nextPoint =>
      new Point(xGenerator.nextOutput(), yGenerator.nextOutput());
}
