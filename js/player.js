class Player{
    constructor(){
        this.name;
        this.index = 0;
        this.score = 0;
        this.distance = 0;
    }
    update(){
     if(this.index>0&&this.name!=undefined){
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).update({
          name:this.name,
          distance: this.distance,
          score: this.score
        });
}
    }
    getCount(){
       var ref = database.ref('playerCount');
       ref.on('value',(data)=>{
          this.index = data.val();
       });
    }
    updateCount(count){
      database.ref('/').update({
         'playerCount':count
      });
    }
}