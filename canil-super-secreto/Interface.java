public class Interface {
    public static void main(String[] args) {
        Tutor bruna = new Tutor();
        Tutor ernesto = new Tutor();

        Bruce bruce = new Bruce(ernesto);
        Zuko zuko = new Zuko(bruna);
        Nacho nacho = new Nacho(bruna);

        bruce.comer(); // **nham nham nham**
        
        zuko.comer("cenoura"); // **grrrrrr**
        zuko.comer(2); // **grrrrrr**
        zuko.receberCarinho(4); // Zuko está feliz :D
        zuko.receberCarinho(2); // Zuko exige mais carinho!
        nacho.comer("banana"); // **grrrrrr**
        nacho.comer("bifinho"); // **nham nham nham**
        zuko.receberCarinho(ernesto);
    }
    
    
    
    
   
    
}
