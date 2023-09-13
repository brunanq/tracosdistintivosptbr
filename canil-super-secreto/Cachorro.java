public abstract class Cachorro{
    protected String nome;
    protected int idade;
    protected Tutor tutor;

    public Cachorro(Tutor tutor){
        this.tutor = tutor;
    }

    public abstract void rosnar();
    public abstract void receberCarinho();
    public abstract void brincar(String brincadeira);
    public abstract void comer();

}