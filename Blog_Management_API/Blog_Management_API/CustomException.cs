using Newtonsoft.Json;
using System.Net;

namespace Blog_Management_API
{
    public class CustomException : Exception
    {
        public int StatusCode { get; }

        public CustomException(string message, int statusCode) : base(message)
        {
            StatusCode = statusCode;
        }
    }

    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unhandled exception occurred.");
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = exception is CustomException customException ? customException.StatusCode : (int)HttpStatusCode.InternalServerError;

            var response = new
            {
                message = exception.Message,
                statusCode = context.Response.StatusCode
            };

            return context.Response.WriteAsync(JsonConvert.SerializeObject(response));
        }
    }


}
