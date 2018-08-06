
class HaltonGenerator {

  int sequenceBase;

  int index = 1;
  int indexIncrement = 1;

  HaltonGenerator(this.sequenceBase);

  double nextOutput() {
    var result = 0.0;
    var fraction = 1.0;
    var i = index.toDouble();
    while (i > 0) {
      fraction /= sequenceBase;
      result += fraction * (i % sequenceBase);
      i /= sequenceBase;
    }

    this.index += this.indexIncrement;

    return result;
  }

  static double output(int sequenceBase, double index) {
    var result = 0.0;
    var fraction = 1.0;
    while (index > 0.0) {
      fraction /= sequenceBase;
      result += fraction * (index % sequenceBase);
      index /= sequenceBase;
    }

    return result;
  }

}