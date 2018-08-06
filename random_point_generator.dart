
import "dart:math";
import "point_generator.dart";

class RandomPointGenerator implements PointGenerator {

  final Random _randomGenerator = new Random();

  Point<double> get nextPoint =>
      new Point(
          _randomGenerator.nextDouble(),
          _randomGenerator.nextDouble()
      );
}