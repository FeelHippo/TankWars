"use strict";

async function main(tank) {

  // auxiliary functions

  const startAction = async tank => {
    await tank.drive(Math.floor(Math.random() * 359), 45);
  }

  const initRadarRotate = async (counter) => {
    let scan = await tank.scan(counter, 8);
    if (scan) {return {
      distance: scan,
      degree: counter,
      target: true,
    }}
    counter += 15;
    return initRadarRotate(counter)
  }

  const radarChase = async (tank, degree) => {
    let right = await tank.scan(degree + 15, 10);
    let left = await tank.scan(degree - 15, 10);
    if (!right && !left) {return}
    // target the nearest enemy
    degree = right < left ? degree + 10 : degree - 10;
    // if you find one, chase him like a panther
    await tank.drive(degree, 45);
    // FIRE!
    await tank.shoot(degree, 500);
    // the wall!
    await dodgeWall(tank);
    return radarChase(tank, degree);
  }

  const dodgeWall = async (tank) => {
    let yCoordinate = await tank.getY();
    let xCoordinate = await tank.getX();
    if (yCoordinate >= 700) {
      await tank.drive(270, 50);
    } else if (yCoordinate <= 300) {
      await tank.drive(90, 50);
    }
    if (xCoordinate >= 700) {
      await tank.drive(180, 49);
    } else if (yCoordinate <= 300) {
      await tank.drive(0, 50);
    }
  }

  // main loop

  while (true) {
    // start slow, play dumb  
    if(!await tank.getSpeed()) {
      await startAction(tank);
    }
    // who put that wall over there?!
    await dodgeWall(tank);
    // use your radary senses to locate enemy
    let { distance, degree, target } = await initRadarRotate(0);
    if (target) {
      // if you find one, chase him like a panther
      await tank.drive(degree, 75);
      // FIRE!
      await tank.shoot(degree, distance);
      // where are you!
      await radarChase(tank, degree);
    } else {
      await dodgeWall(tank);
    }
  }
}

