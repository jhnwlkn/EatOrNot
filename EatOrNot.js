let player
let screen = 0;
let lvl;
let map;

function setup(){
    player = new Hero(200, 650, 20, 20);
    lvl = new Level();
    lvl.setLevel(1);
    map = new Map(400,700);
    map.init();
}

function draw(){
    if(screen === 0){
        textSize(30);
        text('Eat or Not', map.width/2-65, 350);
        textSize(12);
        text('Press enter to play', map.width/2-50, 370);
    }else if(screen === 1){
        background(0);
        

        stroke(255);
        text("food: " + map.enemy.length, 350, 30);
        text("level: " + lvl.getCurrentLevel(), 350, 70);
        text("life: " + player.life, 350, 50); 

        player.show();

        for(let plr of player.peluru){
            plr.show(10);
        }

        for(let en of map.enemy){
            en.show();

            if(dist(en.x, en.y, player.x, player.y) < 20){
                map.enemy.splice(map.enemy.indexOf(en), 1);
                
                if(en.effect === 1){
                    player.Monster -= 1;
                }
                else{
                    player.calculateLife();
                }
            }
        }
            
        if(player.life <= 0){

            if(lvl.maxLevel < lvl.getCurentLevel()){
                lvl.maxLevel = lvl.getCurentLevel();
            }
            stage = 2;
        }

        for(let villian of map.enemy){
            for(let plr of player.peluru){
                if (dist(villian.x, villian.y, plr.x, plr.y) < 20){

                    map.enemy.splice(map.enemy.indexOf(villian), 1);
                    player.peluru.splice(player.peluru.indexOf(plr), 1);

                }
            }

            if(villian.y > 700){
                map.enemy.splice(map.enemy.indexOf(villian), 1);
                let yE = random(-500, 0);
                let xE = random(0, 400);
                villian = new Monster(xE, yE, 10, 10, 1);
                map.enemy.push(villian)
            }
        }

        if(map.enemy.length < 1){
            lvl.latestLevel = lvl.getCurentLevel();
            lvl.setLevel(lvl.getCurentLevel() + 1);
            map.init();
        }

        if (keyIsDown(UP_ARROW)) {
            player.moveUp();
        }
        if (keyIsDown(DOWN_ARROW)) {
            player.moveDown();
        }
        if (keyIsDown(LEFT_ARROW)) {
            player.moveLeft();
        }
        if (keyIsDown(RIGHT_ARROW)) {
            player.moveRight();
        }
    }else{
        background(220);
        textSize(24);
        stroke(255, 0, 0);
        text('Game Over', 200, 200);
      }

}