public class Nacho extends Cachorro {

    public Nacho(Tutor tutor) {
        super(tutor);
    }

    @Override
    public void brincar(String brincadeira) {
        System.out.println("**Nacho está brincando** \n");
        
    }

    public void comer(String petisco) {
        if(petisco.equals("banana")){
            this.rosnar();
            System.out.println("Nacho não gosta de banana! \n");
        } else{
            System.out.println("NACHO ESTÁ COMENDO PETISCO... \n **nham nham nham** \n");
        }
        
    }

    public void receberCarinho() {
        System.out.println("**Nacho está te dando lambeijos** \n");
    }

    @Override
    public void rosnar() {
        System.out.println("**grrrrrr**");  
    }

    @Override
    public void comer() {
        
    }
 
}
