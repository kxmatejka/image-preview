export default class ValidationError extends Error {
  constructor (...args) {
    super(...args)

    this.message = args[0] || undefined
    this.value = args[1] || undefined
  }
}
