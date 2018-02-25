let gracz;
let platforms=[];

function setup() {
	var canvas = createCanvas(1000,700);
	 gracz = new Gracz();
	frameRate(60);
	
	canvas.parent('#gra');
	
	platforms.push(new Platform(random(0,500),random(500,1000),400));
	platforms.push(new Platform(100,500,300));
	platforms.push(new Platform(700,1200,250));
	platforms.push(new Platform(1400,1600,450));
	platforms.push(new Platform(1650,2200,300));
	//platforms.push(new Platform(,,400));platforms.push(new Platform(,,500));platforms.push(new Platform(,,350));
	platforms.push(new Platform(0,5000,500));

	
}

function draw() {
	background(65);
	
	translate(gracz.tr, 0);
	
	for(let i = 0;i<platforms.length;i++)
	{
	platforms[i].show();
	}
	
	gracz.show();
	gracz.update();
	gracz.myszka();
	gracz.bgtr();
	gracz.ciosa();
	
	gracz.stanieb=false;
	
	text(gracz.ciospkt,500,500);
	
}

class Gracz{
	constructor(){
		this.pos = createVector(500,500);
		this.left=false;
		this.right=false;
		this.skok=false;
		this.kuc=false;
		this.stanieb=false;
		this.staniep=false;
	
		this.skokpkt=0;
		
		this.vel = createVector(0,0);
		this.acc = createVector(1,0);
		this.slow = createVector(0,0);
		
		this.ciospkt=0;
		
		this.tr=0;
	}
	
	
	show(){
		

		ellipse(this.pos.x,this.pos.y, 20);
		

	}
	
	literki(k, b){
		if((k===65)||(k=='A')){gracz.left=b;}
		if((k===68)||(k=='D')){gracz.right=b;}
		if((k==	32)||(k=== 87)){gracz.skok=b;}
		if((k=='s')||(k=='S')){gracz.kuc=b;}
		

	}
	
	update(){
		
		this.stanie();
		this.jump();
		
		
		this.acc.mult(0);
		if(gracz.left){gracz.acc.x-=0.8;}
		if(gracz.right){gracz.acc.x+=0.8;}
		
		if(this.skokpkt>0){
			
			this.vel.y-=this.skokpkt*0.5;
	
			if(this.skok){
			this.skokpkt-=0.3;
			}
			else this.skokpkt-=0.5;
		}
		
		this.vel.add(this.acc);
		this.vel.y=max(this.vel.y,-10);
		this.vel.y=min(this.vel.y,10);
		this.vel.x=max(this.vel.x,-10);
		this.vel.x=min(this.vel.x,10);
		this.vel.limit(20);

		this.pos.add(this.vel);
		
		this.vel.mult(0.9);	


	}
	
	stanie(){
	
		for(let i = 0;i<platforms.length;i++)
	{

	if(platforms[i].x1<this.pos.x&&platforms[i].x2>this.pos.x){
		
		
		if(this.pos.y>=platforms[i].h-10&&this.pos.y<=platforms[i].h){
			this.pos.y=platforms[i].h-10;
			this.stanieb=true;
			this.vel.y=0;
		}
		
		if(this.pos.y>=platforms[i].h&&this.pos.y<=platforms[i].h+10)
		{
			this.vel.y=0;
			this.skokpkt=0;
		}
		}
		
		
		
	}
	if(this.stanieb==false)
		{
		this.vel.y+=2.5;
		}
	}
	
	jump(){
		if(this.skok&&this.stanieb){this.skokpkt=10;textSize(32);}
	}
	
	myszka(){
		ellipse(mouseX-1-this.tr,mouseY-1,5);
	}
	
	bgtr(){
		if(this.pos.x>550-this.tr){this.tr=-this.pos.x+550;}
		else if(this.pos.x<450-this.tr){this.tr=-this.pos.x+450;}
	}
	cios(){
		this.ciospkt=10;
		this.ciospos = createVector(mouseX-this.tr,mouseY);
		this.ciospos.sub(this.pos);
		this.ciospos.normalize();
		this.ciospos.mult(20);
		this.ciospos.add(this.pos);
	}
	ciosa(){
		if(this.ciospkt>0){
		fill(255,0,0);
		noStroke();
		ellipse(this.ciospos.x,this.ciospos.y,10-this.ciospkt);
		fill(255);
		stroke(0);
		this.ciospkt--;
		}
	}

	
}

class Platform{
	
	constructor(p1x, p2x, ht){
		this.x1 = p1x;
		this.x2 = p2x;
		this.h=ht;
	}
	
	show(){
		line(this.x1,this.h,this.x2,this.h);
	}
	
	
}

function keyPressed() {
	gracz.literki(keyCode, true);
}
function keyReleased() {
	gracz.literki(keyCode, false);
}
function mouseClicked() {
	
	gracz.cios();
	
}


