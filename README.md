## Arena

### Rectangular
### Size: 1340x1000
### Origin (0,0): lower-left corner
### 0 degrees: left, 90 degrees: up
### Tank is subject to inertia
### Only turns if speed <= 50 km/h

## Controls

```javascript
await tank.drive(angle, speed)
``` 
### angle: direction 0-359
### speed: 0-100
####get position: 
```javascript
await tank.getX(); 
await tank.getX()
```
### to turn, first decrease speed to 50 km/h
#### get current speed: 
```javascript
await tank.getSpeed()
```
### missiles can be fired in any direction
### max 2 missiles in airspace at any given time
### distance max 700 meters
### can be programmed to explode mid-aid
#### shoot missile:
```javascript
await tank.shoot(angle, range)
```
### tank's shield is 100, if shield < 0 it will be destroyed
### damage: missile explosion, hits arena's wall, hits other tank
#### check shield status, returns amount of damage inflicted:
```javascript
await tank.getDamage();
```
### damage left: 100 - getDamage()
### radar is directional, max width +-10 degrees
#### read radar:
```javascfript
await tank.scan(angle, resolution)
```
### angle: direction 0-359
### resolution: 1-10 (degrees)
### returns the distance to the nearest enemy tank
### no tanks in sight, returns 0




