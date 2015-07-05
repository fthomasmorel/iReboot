var rpio = require('rpio');

function Rpio() {   

rpio.setMode('physical');


rpio.setFunction(12, rpio.PWM);
rpio.pwmSetRange(12, 1024);
rpio.pwmSetData(12, 0);

rpio.setFunction(33, rpio.PWM);
rpio.pwmSetRange(33, 1024);
rpio.pwmSetData(33, 0);

console.log("running");

}


Rpio.prototype.setMotors = function(left, right, speed, direction) { 
//12 = left

//var pwm_left = parseInt(Math.floor(left*1024));

var pwm_left = parseInt(Math.floor(left*524 + 500));
if(pwm_left < 950){
	rpio.pwmSetData(12,0);
}else{
	rpio.pwmSetData(12,pwm_left);
}

//33 = right
//var pwm_right = parseInt(Math.floor(right*1024));

var pwm_right = parseInt(Math.floor(right*524 + 500));
if(pwm_right < 950){
	rpio.pwmSetData(33,0);
}else{
	rpio.pwmSetData(33,pwm_right);
}

//console.log(pwm_left + " ; " + pwm_right);

}

module.exports = Rpio;    
