
namespace DtiChallenge;

public class AddReminderService
{
    private ReminderRepository repository;

    public AddReminderService(ReminderRepository repository) {
        this.repository = repository;
    }

    public Reminder execute(Reminder input){
       validateInput(input);

       var saved = repository.save(input);

       return saved;
    }

    void validateInput(Reminder input) {
        if(string.IsNullOrWhiteSpace(input.title)) {
            throw new Exception("Reminder's title cannot be empty");
        }

        var date = DateOnly.ParseExact(input.date, "dd/MM/yyyy");
        var today = DateOnly.FromDateTime(DateTime.Now);
        
        if (date <= today) {
            throw new Exception("Can't create reminder for the past");
        }
    }
}
