import "dart:html";
import "dart:math";
import "color.dart";
import "point_generator.dart";
import "random_point_generator.dart";
import "halton_point_generator.dart";

class Simulation {
  final CanvasElement _canvas;
  final CanvasRenderingContext2D _context;

  final double _canvasSize;

  final double _spotSize;

  final NumberInputElement _xBaseBox = querySelector("#x_base");
  final NumberInputElement _yBaseBox = querySelector("#y_base");
  final NumberInputElement _xIndexIncrementBox = querySelector("#x_index_increment");
  final NumberInputElement _yIndexIncrementBox = querySelector("#y_index_increment");
  final NumberInputElement _xIndexBox = querySelector("#x_index");
  final NumberInputElement _yIndexBox = querySelector("#y_index");

  final NumberInputElement _pointsCountBox = querySelector("#points_count_box");
  final ButtonInputElement _plotRandomPointsButton = querySelector("#plot_random_button");
  final ButtonInputElement _plotHaltonPointsButton = querySelector("#plot_halton_button");

  final ButtonInputElement _resetHaltonButton = querySelector("#reset_halton_button");
  final ButtonInputElement _clearCanvasButton = querySelector("#clear_canvas_button");


//  ButtonInputElement _pauseButton = querySelector("#pause_button");
//  ButtonInputElement _stepButton = querySelector("#step_button");
//  ButtonInputElement _clearButton = querySelector("#clear_button");
//  ButtonInputElement _randomizeButton = querySelector("#randomize_button");

  RandomPointGenerator _randomPointGenerator = new RandomPointGenerator();

  HaltonPointGenerator _haltonPointGenerator = new HaltonPointGenerator();

  int _pointsCount = 1;

  Simulation(this._canvas, this._context) :
        _canvasSize = _calculateCanvasSize(_canvas),
        _spotSize = _calculateSpotSize(_canvas)
  {

    _xBaseBox.onInput.listen(_onXBaseBoxInput);
    _xBaseBox.disabled = false;
    _yBaseBox.onInput.listen(_onYBaseBoxInput);
    _yBaseBox.disabled = false;

    _xIndexIncrementBox.onInput.listen(_onXIncrementBoxInput);
    _xIndexIncrementBox.disabled = false;
    _yIndexIncrementBox.onInput.listen(_onYIncrementBoxInput);
    _yIndexIncrementBox.disabled = false;

    _pointsCountBox.onInput.listen(_onPointsCountBoxInput);
    _pointsCountBox.disabled = false;

    _plotRandomPointsButton.onClick.listen(_onPlotRandomPointsButtonPressed);
    _plotRandomPointsButton.disabled = false;

    _plotHaltonPointsButton.onClick.listen(_onPlotHaltonPointsButtonPressed);
    _plotHaltonPointsButton.disabled = false;

    _resetHaltonButton.onClick.listen(_onResetHaltonButtonPressed);
    _resetHaltonButton.disabled = false;

    _clearCanvasButton.onClick.listen(_onClearCanvasButtonPressed);
    _clearCanvasButton.disabled = false;


//    plotPoint(new Point(0.5, 0.5), Color.haltonDotColor);

  }

  static int _readBoxValue(NumberInputElement box, {int defaultValue = 1, int minValue = 1, int maxValue = 1000}) {
    var value = int.tryParse(box.value) ?? defaultValue;
    value = value.clamp(minValue, maxValue);
    box.valueAsNumber = value;
    return value;
  }

  void _onPointsCountBoxInput(_) =>
    _pointsCount = _readBoxValue(_pointsCountBox);

  void _onXBaseBoxInput(_) =>
    _haltonPointGenerator.xGenerator.sequenceBase =
        _readBoxValue(_xBaseBox, defaultValue: 2, minValue: 2, maxValue: 1000000);

  void _onYBaseBoxInput(_) =>
    _haltonPointGenerator.xGenerator.sequenceBase =
        _readBoxValue(_yBaseBox, defaultValue: 3, minValue: 2, maxValue: 1000000);

  void _onXIncrementBoxInput(_) =>
      _haltonPointGenerator.xGenerator.indexIncrement =
          _readBoxValue(_xIndexIncrementBox, defaultValue: 1, minValue: 1, maxValue: 1000000);

  void _onYIncrementBoxInput(_) =>
      _haltonPointGenerator.yGenerator.indexIncrement =
          _readBoxValue(_yIndexIncrementBox, defaultValue: 1, minValue: 1, maxValue: 1000000);

  void _onPlotRandomPointsButtonPressed(_) =>
      _plotPoints(_randomPointGenerator, Color.randomDotColor);

  void _onPlotHaltonPointsButtonPressed(_) =>
      _plotPoints(_haltonPointGenerator, Color.haltonDotColor);

  void _plotPoints(PointGenerator pointGenerator, Color color) {
    print("They pressed it. $_pointsCount");

    for (var pointIndex = 0; pointIndex < _pointsCount; pointIndex++) {
      var point = pointGenerator.nextPoint;
      plotPoint(point, color);
    }
  }

  void _onResetHaltonButtonPressed(_) {
    _haltonPointGenerator.reset();
  }

  void _onClearCanvasButtonPressed(_) =>
    _context.clearRect(0.0, 0.0, _canvasSize, _canvasSize);

  void plotPoint(Point<double> point, Color color) {
    var x = point.x * _canvasSize;
    var y = point.y * _canvasSize;

    _context.setFillColorRgb(color.red, color.green, color.blue);
    _context.fillRect(
        x - _spotSize * 0.5,
        y - _spotSize * 0.5,
        _spotSize,
        _spotSize);
  }

  static double _calculateCanvasSize(CanvasElement canvas) =>
      canvas.width.toDouble();

  static double _calculateSpotSize(CanvasElement canvas) =>
      canvas.width.toDouble() * 0.008;

//  static Iterable<Point<double>> generateRandomPoints({pointsCount = 10}) sync* {
//
//    var randomGenerator = new Random();
//
//    for (var i = 0; i < pointsCount; i++) {
//      yield new Point(randomGenerator.nextDouble(), randomGenerator.nextDouble());
//    }
//
//  }

//  void _startAnimating() {
//    window.requestAnimationFrame(_update);
//  }

//  void _update(num time) {
//    _context.clearRect(0.0, 0.0, _canvasSize, _canvasSize);
//    _snake.draw(_context, time);
//    window.requestAnimationFrame(_update);
//  }
}
