/**
 * @middleware
 * @description Global error handler
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function errorHandler (err, req, res, next) {
  return res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    success: false
  })
}
