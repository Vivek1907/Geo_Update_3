class State1{
    constructor(){
        this.instructions = createButton('Instructions and Layers of Earth');
        this.enginePower = createSlider(5,500);
        this.boostPower = createSlider(1,500);
        this.start = createButton('Start');
    }

    hide(){
        this.instructions.hide();
        this.enginePower.hide();
        this.boostPower.hide();
        this.start.hide();
    }

    show(){
        this.instructions.show();
        this.enginePower.show();
        this.start.show();
        this.boostPower.show();
    }

    display(){
        image(book,displayWidth/2-20,100,80,80);
        textSize(35);
        fill(0,255,0);
        strokeWeight(20);
        textStyle(BOLD);
        text("GAME ZONE",displayWidth/2-30,70);
        noFill();
        strokeWeight(3);
        stroke(0,255,0);
        rect(10,10,displayWidth-30,displayHeight/4);
        this.instructions.position(displayWidth/2-70,200);
        this.instructions.mousePressed(showBook());
        this.enginePower.position(displayWidth/3-80,displayHeight/3-100);
        this.boostPower.position(displayWidth/3-80,displayHeight/3-200);
        this.start.position(displayWidth/3-40,displayHeight/3-200);
        fill(255);
        text(this.enginePower.value()+" $",displayWidth/3-50,displayHeight/3-100);
        this.start.mousePressed(()=>{
         state.update(2);
        });
    }
}