using System.Reflection.Metadata.Ecma335;
using DtiChallenge;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var reminderRepository = new ReminderRepository();

var addReminderService = new AddReminderService(reminderRepository);
var showReminderService = new ShowReminderService(reminderRepository);
var deleteReminderSerive = new DeleteReminderService(reminderRepository);

app.MapPost("/reminders", (Reminder input) =>
{
    try{
        addReminderService.execute(input);
    }
    catch(Exception e) {
        var error = new Error(e.Message);

        return Results.BadRequest(error);
    }

    return Results.Created("/reminders", null);
})
.WithName("PostReminders")
.WithOpenApi();

app.MapGet("/reminders", () => {
    return showReminderService.execute();
}
)
.WithName("GetReminders")
.WithOpenApi();

app.MapDelete("/reminders/{id}", (int id) => {
    deleteReminderSerive.execute(id);
}
)
.WithName("DeleteReminders")
.WithOpenApi();

 app.UseCors(options => options
                .AllowAnyMethod()
                .AllowAnyHeader()
                .SetIsOriginAllowed(origin => true));

app.Run();