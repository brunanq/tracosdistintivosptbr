
namespace DtiChallenge;

public class ReminderRepository
{
    private List<Reminder> arrayList;
    private int id;

    public ReminderRepository() {
        this.arrayList = new List<Reminder>();
        this.id = 0;
    }

    public Reminder save(Reminder input) {
        var itemToBeSaved = new Reminder(id, input.title, input.date);

        arrayList.Add(itemToBeSaved);
        id++;

        return itemToBeSaved;
    }

    public List<Reminder> getReminder(){
        return this.arrayList;
    }

    public void delete(int index) {
        this.arrayList.RemoveAt(index);
    }
}
