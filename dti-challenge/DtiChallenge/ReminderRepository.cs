
namespace DtiChallenge;

public class ReminderRepository
{
    private List<Reminder> arrayList; 

    public ReminderRepository() {
        this.arrayList = new List<Reminder>();
    }

    public Reminder save(Reminder input) {
        var id = arrayList.Count() + 1;
        var itemToBeSaved = new Reminder(id, input.title, input.date);

        arrayList.Add(itemToBeSaved);

        return itemToBeSaved;
    }
}
