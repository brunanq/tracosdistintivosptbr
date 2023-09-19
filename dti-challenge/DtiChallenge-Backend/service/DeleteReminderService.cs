namespace DtiChallenge;

public class DeleteReminderService{
    private ReminderRepository repository;

    public DeleteReminderService(ReminderRepository repository){
        this.repository = repository;
    }

    public void execute(int id){
        repository.delete(id);
    }
}