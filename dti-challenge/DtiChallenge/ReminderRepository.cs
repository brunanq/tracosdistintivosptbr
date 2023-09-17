
namespace DtiChallenge;

public class ReminderRepository
{
    private List<Reminder> reminders;

    public ReminderRepository() {
        reminders = new List<Reminder>();
    }

    public Reminder save(Reminder reminder) {
        var id = reminders.Count() + 1;

        var reminderToBeSaved = new Reminder(id, reminder.title, reminder.date);

        reminders.Add(reminderToBeSaved);

        return reminderToBeSaved;
    }
}
