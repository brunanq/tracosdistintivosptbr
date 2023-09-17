using DtiChallenge;

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

var addReminderService = new AddReminderService(new ReminderRepository());

app.MapPost("/reminders", (Reminder input) =>
{
    Reminder result;

    try{
        result = addReminderService.execute(input);
    }
    catch(Exception e) {
        return Results.BadRequest(e.Message);
    }

    return Results.Created("/reminders", result);
})
.WithName("PostReminders")
.WithOpenApi();

app.Run();