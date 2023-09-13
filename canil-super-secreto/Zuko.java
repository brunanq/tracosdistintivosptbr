public class Zuko extends Cachorro {

    public Zuko(Tutor tutor) {
        super(tutor);
    }

    @Override
    public void brincar(String brincadeira) {
        System.out.println("**Zuko está brincando** \n");
        
    }

    public void comer(String petisco) {
        if(petisco.equals("cenoura")){
            this.rosnar();
            System.out.println("Zuko não gosta de cenoura! \n");
        } else {
            System.out.println("ZUKO ESTÁ COMENDO PETISCO... \n **nham nham nham** \n");
        }
    }

    public void comer(int quantidade){
        if(quantidade > 1){
            this.rosnar();
            System.out.println("Calma! Eu como só 1 petisco por vez \n");
        } else{
            System.out.println("ZUKO ESTÁ COMENDO PETISCO... \n **nham nham nham** \n");
        }
    }

    public void receberCarinho(Tutor tutor) {
        if(this.tutor == tutor){
            System.out.println("**Zuko está balançando a perninha** \n");
        }else{
            rosnar();
            System.out.println("Sai fora, seu esquisito");
        }
    }

    public void receberCarinho(int vezes){
        if(vezes < 3){
            System.out.println("Só " + vezes + " carinhos? \n Zuko exige mais! \n");
        } else{
            System.out.println("Oba, recebi " + vezes + " carinhos! \n Zuko está feliz :D \n");
        }
    }

    @Override
    public void rosnar() {
        System.out.println("**grrrrrr**");
    }

    @Override
    public void receberCarinho() {
    }

    @Override
    public void comer() {
        // TODO Auto-generated method stub
        
    }
    
}
