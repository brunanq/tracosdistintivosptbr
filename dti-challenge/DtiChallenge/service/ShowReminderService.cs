namespace DtiChallenge;

public class ShowReminderService{
     private ReminderRepository repository;

     public ShowReminderService(ReminderRepository repository){
        this.repository = repository;
     }

    public List<Reminder> execute(){
      return repository.getReminder();
    }


}