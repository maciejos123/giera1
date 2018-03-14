let gracz;
let platforms=[];
let wrogowie=[];
let chests=[];
let loot=[];
let bushes=[];
let texts=[];
let drabinas=[];

let knife;
let bush;

function setup() {
	var canvas = createCanvas(1000,700);
	 gracz = new Gracz();
	frameRate(120);
	
	canvas.parent('#gra');
	
	knife = loadImage("knife.png");
	bush = loadImage("bush.png");
	
	chests.push(new Chest);
	platforms.push(new Platform(random(0,500),random(500,1000),400));
	platforms.push(new Platform(100,500,300));
	platforms.push(new Platform(600,1200,250));
	platforms.push(new Platform(1400,1600,450));
	platforms.push(new Platform(1650,2200,300));
	//platforms.push(new Platform(,,400));platforms.push(new Platform(,,500));platforms.push(new Platform(,,350));
	platforms.push(new Platform(0,5000,500));
	
	wrogowie.push(new Wrog(0));
	for(let i = 0;i<platforms.length;i++)
	{
	bushes.push(new Bush(random(platforms[i].x1,platforms[i].x2),platforms[i].h));
	}
	
	texts.push(new Texts("Super piękna gra.",200,200));

	drabinas.push(new Drabina(100,platforms[0].x1+10,400,1));
	drabinas.push(new Drabina(100,platforms[0].x1+110,300,1));
	drabinas.push(new Drabina(100,platforms[2].x1,250,2));
	
}

function draw() {
	background(65);
	
		knife.resize(30,40);
		
			gracz.paski();

	
	translate(gracz.tr, 0);
	
			textSize(48);
			fill(255);
	for(let i = 0;i<texts.length;i++)
	{

	texts[i].show();
	}
	
	if(gracz.hidden==false){
	for(let i = 0;i<bushes.length;i++)
	{
	bushes[i].show();
	}}
	
		
	for(let i = 0;i<platforms.length;i++)
	{
	platforms[i].show();
	}
	
		gracz.drabina=false;
		gracz.lina=false;
	for(let i = 0;i<drabinas.length;i++)
	{
	drabinas[i].show();
	drabinas[i].check();
	}
	
	stroke(0);
	
	for(let i = 0;i<loot.length;i++)
	{
	loot[i].show();
	loot[i].check(i);
	}
	
	for(let i = 0;i<chests.length;i++)
	{
	chests[i].show();
	chests[i].check();
	}

	gracz.show();
	gracz.update();
	gracz.myszka();
	gracz.bgtr();
	gracz.ciosa();
	
	if(gracz.hidden){
	for(let i = 0;i<bushes.length;i++)
	{
		tint(255, 230);
	bushes[i].show();

	}}
	bushes[gracz.hiddenpkt].checkhidden();
	
	for(let i = 0;i<wrogowie.length;i++)
	{
	wrogowie[i].show();
	if(gracz.hidden==false){
	wrogowie[i].see();
	}
	wrogowie[i].move();
	}
	
	//if(gracz.knife==true){}
	
	gracz.stanieb=false;

	
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
		this.o=false;
		this.e=false;
		this.down=false;
		
		this.hidden=false;
		this.hiddenpkt=0;
		
		this.knife=false;
	
		this.vel = createVector(0,0);
		this.acc = createVector(1,0);
		this.slow = createVector(0,0);
		
		this.ciospkt=0;
		
		this.tr=0;
		
		this.mxhp=50;
		this.hp=50;
		
		this.drabina=false;
		this.lina=false;
	}
	
	
	show(){
		
		fill(255,255,255);

		ellipse(this.pos.x,this.pos.y, 20);
		

	}
	
	literki(k, b){
		if((k===65)||(k=='A')){gracz.left=b;}
		if((k===68)||(k=='D')){gracz.right=b;}
		if((k==	32)||(k=== 87)){gracz.skok=b;}
		if((k===79)||(k=='S')){gracz.o=b;}
		if((k===69)||(k=='S')){gracz.e=b;}
		if((k===83)||(k=='S')){gracz.down=b;}
		

	}
	
	update(){
		
		this.stanie();
		this.jump();
		
		
		this.acc.mult(0);
		if(gracz.left&&gracz.lina==false){gracz.acc.x-=0.8;}
		if(gracz.right&&gracz.lina==false){gracz.acc.x+=0.8;}
		
		this.vel.add(this.acc);
		this.vel.y=max(this.vel.y,-10);
		this.vel.y=min(this.vel.y,10);
		this.vel.x=max(this.vel.x,-10);
		this.vel.x=min(this.vel.x,10);
		this.vel.limit(20);

		this.pos.add(this.vel);
		
		this.vel.x-=this.vel.x*0.22;



	}
	
	stanie(){
	
	if(this.drabina||this.lina){this.vel.y+=0.5;if(this.vel.y>0)this.vel.y=0;}
	
		for(let i = 0;i<platforms.length;i++)
	{

	if(platforms[i].x1<this.pos.x+10&&platforms[i].x2>this.pos.x-10){
		
		
		if(this.pos.y>=platforms[i].h-10&&this.pos.y<=platforms[i].h&&this.drabina==false){
			this.pos.y=platforms[i].h-10;
			this.stanieb=true;
			this.vel.y=0;
		}
		
		//if(this.pos.y>=platforms[i].h&&this.pos.y<=platforms[i].h+10)
		//{
		//	this.vel.y=0;
		//}
		}
		
	}
	if(this.stanieb==false&&this.drabina==false&&this.lina==false)
		{
		this.vel.y+=0.5;
		}
	}
	
	jump(){
		if(this.skok&&(this.drabina||this.lina)){this.vel.y=-3;}
		if(this.down&&(this.drabina||this.lina)){this.vel.y=3;}
		if(this.skok&&this.stanieb){this.vel.y=-7;}
	}
	
	myszka(){
		ellipse(mouseX-1-this.tr,mouseY-1,5);
	}
	
	bgtr(){
		
		
		if(this.pos.x>550-this.tr){this.tr=-this.pos.x+550;}
		else if(this.pos.x<450-this.tr){this.tr=-this.pos.x+450;}
		//else this.tr=this.pos.x;
		//if(mouseX>700)this.tr-=mouseX-700;
		//if(mouseX<400)this.tr+=400-mouseX;

	}
	cios(){
		if(this.knife){
		if(mouseX-gracz.tr>gracz.pos.x){this.wsp=4;this.wsp1=2.5;}
		else {this.wsp=-4;this.wsp1=-2.5}
		this.ciospkt=10;
		this.ciospos = createVector(mouseX-this.tr,mouseY);
		this.ciospos.sub(this.pos);
		this.ciospos.normalize();
		this.ciospos.mult(20);
		
		for(let i = 0;i<wrogowie.length;i++)
		{
			if(dist(this.pos.x,this.pos.y,wrogowie[i].pos.x,wrogowie[i].pos.y)<50){
				wrogowie[i].hp-=50;
			}
		}
		}
		
	}
	ciosa(){
		if(this.ciospkt>0){
		fill(255,0,0);
		noStroke();
		translate(this.pos.x,this.pos.y);
		rotate(this.wsp1-this.ciospkt/this.wsp);
		image(knife,-knife.width/2,-knife.height/2-20);
		rotate(-this.wsp1+this.ciospkt/this.wsp);
		translate(-this.pos.x,-this.pos.y);
		fill(255);
		stroke(0);
		this.ciospkt-=0.7;
		}
	}
	
	paski(){
		
		stroke(20,0,0);
		strokeWeight(2);
		noFill();
		rect(60,680,100,10);
		textSize(20);
			fill(255,102,102);
		text("HP",25,690);
		rect(60,680,map(gracz.hp,0,gracz.mxhp,0,100),10);
		fill(200);
		text("Items:",200,690);
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
function mousePressed() {
	if(gracz.ciospkt<=0){
	gracz.cios();	}
}
function keyTyped()
{
	if (key === 'h') {
	for(let i = 0;i<bushes.length;i++)
	{
	bushes[i].check(i);
	}
  } 
}

class Wrog{
	
	constructor(pm1)
	{
		this.pm=pm1;
		this.pos = createVector(500,platforms[pm1].h-10);
		this.hp=250;
		this.speed=1;
		this.side = round(random(0,1));
		if(this.side==0)this.side=-1;
	}
	
	show(){
		fill(this.hp,0,0);
		ellipse(this.pos.x,this.pos.y,20);	
	}
	move(){
		if(this.pos.x<platforms[this.pm].x1+20){this.side=1;this.pos.x=platforms[this.pm].x1+20;}
	else if(this.pos.x>platforms[this.pm].x2-20){this.side=-1;this.pos.x=platforms[this.pm].x2-20;}
		this.pos.x+=this.speed*this.side;
	}
	see(){
		this.speed=1;
		if(abs(gracz.pos.x-this.pos.x)<150&&gracz.pos.y<this.pos.y+5&&gracz.pos.y>this.pos.y-40){this.speed=1.5;if(gracz.pos.x>this.pos.x)this.side=1; else this.side=-1;}
		
	}
}

class Chest{
	
	constructor(){
		this.pos = createVector(800,250);
		this.open = false;
	}
	
	show(){
		if(this.open==false)
		{
		fill(179, 89, 0);
		rect(this.pos.x,this.pos.y,20,-10);
		fill(255);
		}
		else {
			fill(179, 89, 0);
			rect(this.pos.x,this.pos.y,20,-10);
			fill(209, 119, 30);
			rect(this.pos.x,this.pos.y-10,20,-5);
			fill(255);
			
		}
	}
	
	check(){
		if(this.open==false){
		if(abs(gracz.pos.x-10-this.pos.x)<75&&this.pos.y<gracz.pos.y+20&&this.pos.y>gracz.pos.y-50){
			text("open (o)",this.pos.x-10,this.pos.y-15);
			if(gracz.o){this.open=true;loot.push(new Loot(this.pos.x,this.pos.y));}
		}
		}
	}
}

class Loot{
	
	constructor(pos1,pos2){
		this.pos = createVector(pos1-5,pos2-60);
	}
	
	show(){
		
		image(knife,this.pos.x,this.pos.y);
	}
	
	check(i){
		if(abs(gracz.pos.x-10-this.pos.x)<75&&this.pos.y+60<gracz.pos.y+20&&this.pos.y+60>gracz.pos.y-50){
		text("take (e)",this.pos.x-10,this.pos.y-15);
		if(gracz.e){gracz.knife=true;loot.splice(i,1);}
		}
			
	}
}

class Bush{
	
	constructor(x,y){
				
		this.pos = createVector(x-bush.width/2,y-bush.height-40);
	}
	
	show(){
		image(bush,this.pos.x-bush.width/2,this.pos.y);

	}
	check(i){
			if(abs(gracz.pos.x-this.pos.x)<30&&this.pos.y<gracz.pos.y+20&&this.pos.y>gracz.pos.y-50){if(gracz.hidden==false)gracz.hidden=true;gracz.hiddenpkt=i;}
	}
	
	checkhidden(){
		if(abs(gracz.pos.x-this.pos.x)>=30||this.pos.y>=gracz.pos.y+20||this.pos.y<=gracz.pos.y-50){gracz.hidden=false;}
	}
}

class Texts{
	
	constructor(cpt,px,py){
		this.caption=cpt;
		this.posx=px;
		this.posy=py;
	}
	
	show(){
		text(this.caption,this.posx,this.posy);
	}
	
}
class Drabina {
	
	constructor(h1,p1,p2,l1){
		this.h=h1;
		this.pos= createVector(p1,p2);
		this.l=l1;
	}
	
	show(){
		if(this.l==1){
		stroke(0);
		strokeWeight(4);
		line(this.pos.x,this.pos.y,this.pos.x,this.pos.y+this.h);
		line(this.pos.x+20,this.pos.y,this.pos.x+20,this.pos.y+this.h);
		
		for(let i =0;i<this.h;i+=10){
			line(this.pos.x,this.pos.y+i,this.pos.x+20,this.pos.y+i);
		}
		
		stroke(153, 102, 51);
		strokeWeight(2);
		line(this.pos.x,this.pos.y,this.pos.x,this.pos.y+this.h);
		line(this.pos.x+20,this.pos.y,this.pos.x+20,this.pos.y+this.h);
		
		for(let i =0;i<this.h;i+=10){
			line(this.pos.x,this.pos.y+i,this.pos.x+20,this.pos.y+i);
		}
		}
		else{
			stroke(0);
		strokeWeight(4);
		line(this.pos.x+10,this.pos.y,this.pos.x+10,this.pos.y+this.h);
		stroke(153, 102, 51);
		strokeWeight(2);
		line(this.pos.x+10,this.pos.y,this.pos.x+10,this.pos.y+this.h);
		}
	}
	
	check(){
		if(gracz.pos.y>this.pos.y-11&&gracz.pos.y<this.pos.y+this.h-11&&gracz.pos.x+5>this.pos.x&&gracz.pos.x-5<this.pos.x+20){if(this.l==1)gracz.drabina=true; else gracz.lina=true;if(gracz.pos.y<this.pos.y+10){gracz.stanieb=true;}}
	}
}

