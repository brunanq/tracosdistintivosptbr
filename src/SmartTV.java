public class SmartTV {
    boolean ligada = false;
    int canal = 1;
    int volume = 15;

    public void mudarCanal(int canal) {
        this.canal = canal;
    }

    public int abaixarCanal(){
        if (!ligada){
            System.out.println("TV está desligada.");
        } else if (this.canal == 1){
            System.out.println("~ nada acontece ~");
        } else {
            this.canal--;
        }
        return this.canal;
    }

    public int aumentarCanal(){
        if (!ligada){
            System.out.println("TV está desligada.");
        } else if (this.canal == 1){
            System.out.println("~ nada acontece ~");
        } else {
            this.canal++;
        }
        return this.canal;
    }

    public void ligarTV(){
        this.ligada = true;
    }

    public void desligarTV(){
        if (!ligada){
            System.out.println("~ nada acontece ~");
        } else {
            this.ligada = false;
        }
    }

    public int aumentarVolume() throws Exception {
        if (!ligada) {
            System.out.println("TV está desligada.");
        } else {
            this.volume++;
        }
        return this.volume;
    }

    public int abaixarVolume(){
        if (ligada) {
            this.volume--;
        } else {
            System.out.println("TV está desligada.");
        }
        return this.volume;
    }

    public void status(){
        System.out.println("LIGADA: " + this.ligada);
        System.out.println("CANAL: " + this.canal);
        System.out.println("VOLUME: " +this.volume);
    }
}