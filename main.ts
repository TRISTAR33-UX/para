namespace SpriteKind {
    export const Projectile2 = SpriteKind.create()
    export const snake = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Projectile2, SpriteKind.Player, function (sprite, otherSprite) {
    falling = sprites.create(img`
        . . 2 2 2 2 . . 
        . 2 2 2 2 2 2 . 
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        . 2 2 2 2 2 2 . 
        . . 2 2 2 2 . . 
        `, SpriteKind.Projectile)
    falling.setBounceOnWall(true)
    falling.setPosition(sprite.x, sprite.y - 5)
    falling.setVelocity(sprite.vx, 0 - sprite.vy)
    falling.ay = sprite.ay
    sprite.destroy()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    info.setScore(info.score() + 1)
    sprite.destroy()
})
scene.onHitWall(SpriteKind.Projectile2, function (sprite, location) {
    if (tiles.tileAtLocationEquals(location, assets.tile`tile3`)) {
        info.changeLifeBy(-1)
        sprite.destroy()
    }
})
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    if (tiles.tileAtLocationEquals(location, assets.tile`tile3`)) {
        info.changeLifeBy(-1)
        sprite.destroy()
    }
})
let limit = 0
let falling: Sprite = null
let s4Dir = 1
info.setLife(3)
let BARQUE = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . 1 1 1 1 1 1 1 1 1 1 1 . . . 
    . . 1 1 1 1 1 1 1 1 1 1 1 . . . 
    . . 1 1 1 1 1 1 1 1 1 1 1 . . . 
    . . 1 1 1 1 1 1 1 1 1 1 1 . . . 
    . . 1 1 1 1 1 1 1 1 1 1 1 . . . 
    . . 1 1 1 1 1 1 1 1 1 1 1 . . . 
    . . 1 1 1 1 1 1 1 1 1 1 1 . . . 
    . . f f 1 1 1 1 1 1 1 1 f . . . 
    . . 1 f 1 1 1 1 1 1 1 f 1 . . . 
    . . 1 f f f f f f f f 1 1 . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
BARQUE.setPosition(80, 100)
controller.moveSprite(BARQUE, 160, 0)
let mySprite4 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . 8 8 8 8 8 8 8 1 1 1 1 1 . . . 
    8 8 8 8 8 8 8 8 1 1 1 1 1 1 . . 
    8 8 8 8 8 8 8 8 1 1 1 1 1 1 . . 
    8 8 8 8 8 8 8 8 1 1 1 1 1 1 . . 
    8 8 8 8 8 1 8 8 1 1 1 1 1 1 . . 
    8 8 8 8 8 1 1 8 1 1 1 1 1 1 . . 
    8 8 8 8 8 1 1 1 1 1 1 1 1 1 . . 
    8 8 8 8 8 1 1 1 1 1 1 1 1 1 . . 
    8 8 8 8 8 1 1 8 1 1 1 1 1 1 . . 
    8 8 8 8 8 1 8 8 1 1 1 1 1 1 . . 
    8 8 8 8 8 8 8 8 1 1 1 1 1 1 . . 
    8 8 8 8 8 8 8 8 1 1 1 1 1 1 . . 
    . 8 8 8 8 8 8 8 1 1 1 1 1 . . . 
    . . . 8 8 8 . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.snake)
mySprite4.setFlag(SpriteFlag.Ghost, true)
mySprite4.setPosition(-7, 100)
tiles.setTilemap(tilemap`level`)
game.onUpdateInterval(2200, function () {
    mySprite4.vx = 10 * s4Dir
    s4Dir = s4Dir * -1
})
game.onUpdateInterval(2000, function () {
    if (info.score() < 10 || randint(1, Math.min(50, info.score())) < 10) {
        falling = sprites.create(img`
            1 1 1 f f 1 1 1 
            1 1 f 1 1 f 1 1 
            1 f 1 1 1 1 f 1 
            1 1 e 1 1 e 1 1 
            1 1 e e f e 1 1 
            1 1 1 1 f 1 1 1 
            1 1 1 1 f 1 1 1 
            1 1 1 f 1 f 1 1 
            `, SpriteKind.Projectile)
    } else {
        falling = sprites.create(img`
            ........................
            ........................
            ........................
            ........................
            ..........ffff..........
            ........ff1111ff........
            .......fb111111bf.......
            .......f11111111f.......
            ......fd11111111df......
            ......fd11111111df......
            ......fddd1111dddf......
            ......fbdbfddfbdbf......
            ......fcdcf11fcdcf......
            .......fb111111bf.......
            ......fffcdb1bdffff.....
            ....fc111cbfbfc111cf....
            ....f1b1b1ffff1b1b1f....
            ....fbfbffffffbfbfbf....
            .........ffffff.........
            ...........fff..........
            ........................
            ........................
            ........................
            ........................
            `, SpriteKind.Projectile2)
    }
    falling.setPosition(randint(20, 140), 20)
    limit = Math.min(10, info.score())
    falling.setVelocity(randint(-100, 100), randint(0 - limit, 5))
    falling.ay = 20
    falling.setBounceOnWall(true)
})
