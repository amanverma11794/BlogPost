using Blog_Management_API;

var builder = WebApplication.CreateBuilder(args);
// Define a CORS policy
var BlogOrigins = "_BlogPostUI";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: BlogOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4200") 
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
builder.Services.Configure<MyDBSetting>(builder.Configuration.GetSection("MyDBSetting"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseMiddleware<ExceptionHandlingMiddleware>();
app.UseCors(BlogOrigins);
app.UseAuthorization();

app.MapControllers();

app.Run();
