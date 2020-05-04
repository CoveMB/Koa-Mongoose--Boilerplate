const { errorEvent } = require('errors/errorEvent');

exports.error = async(ctx, next) => {

  try {

    await next();

  } catch (error) {

    // Emit the error at the app level
    ctx.app.emit(errorEvent, error, ctx);

    ctx.status = error.status || 500;
    ctx.body = {
      status : 'failed',
      message: error.expose ? error.message : 'Internal server error',
    };

  }

};
