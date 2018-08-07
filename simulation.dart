import "dart:html";
import "dart:math";
import "color.dart";
import "point_generator.dart";
import "random_point_generator.dart";
import "halton_point_generator.dart";

class Simulation {
  final CanvasRenderingContext2D _context;

  final double _canvasSize;

  final double _spotSize;

  final NumberInputElement _xBaseBox = querySelector("#x_base");
  final NumberInputElement _yBaseBox = querySelector("#y_base");
  final NumberInputElement _xIndexIncrementBox =
      querySelector("#x_index_increment");
  final NumberInputElement _yIndexIncrementBox =
      querySelector("#y_index_increment");
  final NumberInputElement _xIndexBox = querySelector("#x_index");
  final NumberInputElement _yIndexBox = querySelector("#y_index");

  final NumberInputElement _pointsCountBox = querySelector("#points_count_box");
  final ButtonInputElement _plotRandomPointsButton =
      querySelector("#plot_random_button");
  final ButtonInputElement _plotHaltonPointsButton =
      querySelector("#plot_halton_button");

  final ButtonInputElement _resetHaltonButton =
      querySelector("#reset_halton_button");
  final ButtonInputElement _clearCanvasButton =
      querySelector("#clear_canvas_button");

  RandomPointGenerator _randomPointGenerator = new RandomPointGenerator();

  HaltonPointGenerator _haltonPointGenerator = new HaltonPointGenerator();

  Simulation(CanvasElement _canvas, this._context)
      : _canvasSize = _calculateCanvasSize(_canvas),
        _spotSize = _calculateSpotSize(_canvas) {
    _xBaseBox.onChange.listen(_onXBaseBoxInput);
    _xBaseBox.disabled = false;
    _yBaseBox.onChange.listen(_onYBaseBoxInput);
    _yBaseBox.disabled = false;

    _xIndexIncrementBox.onChange.listen(_onXIncrementBoxInput);
    _xIndexIncrementBox.disabled = false;
    _yIndexIncrementBox.onChange.listen(_onYIncrementBoxInput);
    _yIndexIncrementBox.disabled = false;

    _xIndexBox.onChange.listen(_onXIndexBoxInput);
    _xIndexBox.disabled = false;
    _yIndexBox.onChange.listen(_onYIndexBoxInput);
    _yIndexBox.disabled = false;

    _pointsCountBox.disabled = false;

    _plotRandomPointsButton.onClick.listen(_onPlotRandomPointsButtonPressed);
    _plotRandomPointsButton.disabled = false;

    _plotHaltonPointsButton.onClick.listen(_onPlotHaltonPointsButtonPressed);
    _plotHaltonPointsButton.disabled = false;

    _resetHaltonButton.onClick.listen(_onResetHaltonButtonPressed);
    _resetHaltonButton.disabled = false;

    _clearCanvasButton.onClick.listen(_onClearCanvasButtonPressed);
    _clearCanvasButton.disabled = false;

    _updateBoxValues();
  }

  static int _readBoxValue(NumberInputElement box,
      {int defaultValue = 1, int minValue = 1, int maxValue = 1000}) {
    var value = int.tryParse(box.value) ?? defaultValue;
    value = value.clamp(minValue, maxValue);
    box.valueAsNumber = value;
    return value;
  }

  void _onXBaseBoxInput(_) => _haltonPointGenerator.xGenerator.sequenceBase =
      _readBoxValue(_xBaseBox, defaultValue: 2, minValue: 2, maxValue: 1000000);

  void _onYBaseBoxInput(_) => _haltonPointGenerator.yGenerator.sequenceBase =
      _readBoxValue(_yBaseBox, defaultValue: 3, minValue: 2, maxValue: 1000000);

  void _onXIncrementBoxInput(_) =>
      _haltonPointGenerator.xGenerator.indexIncrement = _readBoxValue(
          _xIndexIncrementBox,
          defaultValue: 1,
          minValue: 0,
          maxValue: 1000000);

  void _onYIncrementBoxInput(_) =>
      _haltonPointGenerator.yGenerator.indexIncrement = _readBoxValue(
          _yIndexIncrementBox,
          defaultValue: 1,
          minValue: 0,
          maxValue: 1000000);

  void _onXIndexBoxInput(_) =>
      _haltonPointGenerator.xGenerator.index = _readBoxValue(_xIndexBox,
          defaultValue: 1, minValue: 0, maxValue: 10000000);

  void _onYIndexBoxInput(_) =>
      _haltonPointGenerator.yGenerator.index = _readBoxValue(_yIndexBox,
          defaultValue: 1, minValue: 0, maxValue: 10000000);

  void _onPlotRandomPointsButtonPressed(_) =>
      _plotPoints(_randomPointGenerator, Color.randomDotColor);

  void _onPlotHaltonPointsButtonPressed(_) {
    _plotPoints(_haltonPointGenerator, Color.haltonDotColor);
    _updateBoxValues();
  }

  void _plotPoints(PointGenerator pointGenerator, Color color) {
    var pointsCount = _readBoxValue(_pointsCountBox,
        defaultValue: 1, minValue: 1, maxValue: 10000);

    for (var pointIndex = 0; pointIndex < pointsCount; pointIndex++) {
      var point = pointGenerator.nextPoint;
      plotPoint(point, color);
    }
  }

  void _onResetHaltonButtonPressed(_) {
    _haltonPointGenerator.reset();
    _updateBoxValues();
  }

  void _onClearCanvasButtonPressed(_) =>
      _context.clearRect(0.0, 0.0, _canvasSize, _canvasSize);

  void plotPoint(Point<double> point, Color color) {
    var x = point.x * _canvasSize;
    var y = point.y * _canvasSize;

    _context.setFillColorRgb(color.red, color.green, color.blue);
    _context.fillRect(
        x - _spotSize * 0.5, y - _spotSize * 0.5, _spotSize, _spotSize);
  }

  void _updateBoxValues() {
    _xBaseBox.value = _haltonPointGenerator.xGenerator.sequenceBase.toString();
    _yBaseBox.value = _haltonPointGenerator.yGenerator.sequenceBase.toString();

    _xIndexIncrementBox.value =
        _haltonPointGenerator.xGenerator.indexIncrement.toString();
    _yIndexIncrementBox.value =
        _haltonPointGenerator.yGenerator.indexIncrement.toString();

    _xIndexBox.value = _haltonPointGenerator.xGenerator.index.toString();
    _yIndexBox.value = _haltonPointGenerator.yGenerator.index.toString();
  }

  static double _calculateCanvasSize(CanvasElement canvas) =>
      canvas.width.toDouble();

  static double _calculateSpotSize(CanvasElement canvas) =>
      canvas.width.toDouble() * 0.008;
}
