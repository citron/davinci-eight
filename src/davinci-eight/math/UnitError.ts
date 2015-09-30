class UnitError extends Error {
  public name = 'UnitError'
  constructor(message: string) {
    super(message);
  }
}

export = UnitError