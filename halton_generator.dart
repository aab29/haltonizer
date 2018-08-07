class HaltonGenerator {
  int sequenceBase;

  int index = 1;
  int indexIncrement = 1;

  HaltonGenerator(this.sequenceBase);

  double nextOutput() {
    var result = output(sequenceBase, index);

    index += indexIncrement;

    return result;
  }

  static double output(int sequenceBase, num index) {
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
