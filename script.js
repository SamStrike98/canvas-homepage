const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d')

// c.fillStyle = 'rgba(255, 0, 0, 0.5)';
// c.fillRect(100, 100, 100, 100)

// Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = 'red'
// c.stroke();

// Arc / Circle



// for(let i = 0; i< 150; i++) {
//     const x = Math.random() * window.innerWidth;
//     const y = Math.random() * window.innerHeight;

//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
//     c.stroke();
// }

const mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log(mouse.x,mouse.y)
})

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // init()

})

class Circle {
    constructor(x, y, dx, dy, radius=1) {
        this.x = x;
        this.y = y
        this.dx = dx
        this.dy = dy
        this.radius = radius
        // this.color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`
        this.color = 'white'
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.fillStyle = this.color;
        // c.shadowBlur = this.radius / 2;
        // c.shadowColor = this.color;
        c.fill();
        c.stroke();
    }
    update() {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }

        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy

        //interactivity
        // if(mouse.x - this.x < 100 && mouse.x - this.x > -100 && mouse.y - this.y < 100 && mouse.y - this.y > -100 && this.radius < 50){
        //     this.radius += 1
        // } else if(this.radius > 10){
        //     this.radius -= 1
        // }

        this.draw()
    }
    
}


let circleArr = [];

function init() {
    
circleArr = [];
for(let i = 0; i<200; i++){
    radius = 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 10;
    let dy = (Math.random() - 0.5) * 10;

    circleArr.push(new Circle(x, y, dx, dy))
}
}

let frames = 0
function animate() {
    requestAnimationFrame(animate);

    if (frames % 5 == 0){
        c.clearRect(0, 0, innerWidth, innerHeight);
    }
    // c.clearRect(0, 0, innerWidth, innerHeight);
    
    circleArr.forEach(circle => {
        circle.update()
    })
    // console.log(frames)

    frames++
}
init()
animate()