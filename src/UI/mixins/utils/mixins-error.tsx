export default class MixinError extends Error {
  constructor(args: any) {
    super(args)
    Error.captureStackTrace(this, MixinError)
  }
}
