public class Bruce extends Cachorro{

    public Bruce(Tutor tutor) {
        super(tutor);
    }

    @Override
    public void brincar(String brincadeira) {
        if(brincadeira.equals("pega-pega")){
            this.rosnar();
            System.out.println("Bruce não gosta de pega-pega >.< \n");
        } else{
            System.out.println("**Bruce está brincando**\n");
        }
    }

    @Override
    public void comer() {
        System.out.println("BRUCE ESTÁ COMENDO PETISCO... \n **nham nham nham** \n ");
        
    }

    @Override
    public void receberCarinho() {
        System.out.println("BRUCE ESTÁ RECEBENDO CARINHO... \n **Bruce caiu no sono** \n");
        
    }

    @Override
    public void rosnar() {
        System.out.println("**grrrrrr**");  
    }


}
