using System.Data.Common;
using Microsoft.AspNetCore.Http.HttpResults;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapPost("/reminders", (Reminder input) =>
{
    try {
        var data = DateOnly.ParseExact(input.date, "dd/MM/yyyy");
        var hoje = DateOnly.FromDateTime(DateTime.Now);
        if (data < hoje) {
            return Results.BadRequest("Data inválida - tem q ser dps de hoje");
        }
    } catch {
        return Results.BadRequest("Data inválida");
    }

    if(string.IsNullOrWhiteSpace(input.title)) {
        return Results.BadRequest("Coloque um título");
    }
    
    return Results.Ok();
})
.WithName("PostReminders")
.WithOpenApi();

app.Run();

 record Reminder(string title, string date) {}