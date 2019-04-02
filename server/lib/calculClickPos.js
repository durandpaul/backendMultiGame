'use strict';
const DataRFleet = require('../models/randFleetM');


exports.touchOrnot = (posXY, user, id, callback) => {

    // console.log('posXY', posXY);
    DataRFleet.find({roomid: id}).then((data)=>{
        // console.log('data ', data);
        
        if(data[0].user != user) {
            console.log('data[0].user ', data[0].user);
            if(posXY.posx - 330 >= data[0].x && posXY.posx - 330 <= data[0].x + 75 && posXY.posy - 60 >= data[0].y && posXY.posy - 60 <= data[0].y + 75){
                console.log('touchOrnot: touché');
                let touch = true;
                callback(touch);
            } else {
                console.log('touchOrnot: raté');
                let touch = false;
                callback(touch);
            }
        } 
        if(data[1].user != user) {
            console.log('data[1].user ', data[1]);
            if(posXY.posx - 330 >= data[1].x && posXY.posx - 330 <= data[1].x + 75 && posXY.posy - 60 >= data[1].y && posXY.posy - 60 <= data[1].y + 75){
                console.log('touchOrnot: touché');
                let touch = true;
                callback(touch);
            } else {
                console.log('touchOrnot: raté');
                let touch = false;
                callback(touch);
            }
        }
    });

}