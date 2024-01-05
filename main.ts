namespace SpriteKind {
    export const Projectile2 = SpriteKind.create()
    export const snake = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Projectile2, SpriteKind.Player, function (sprite, otherSprite) {
    falling = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . 3 1 1 3 . . . . . . 
        . . . . . 2 1 1 1 1 2 . . . . . 
        . . . . . 2 1 1 1 1 2 . . . . . 
        . . . . . . 3 1 1 3 . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Projectile)
    falling.setBounceOnWall(false)
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
    . . 1 1 1 1 1 f f 1 1 1 1 . . . 
    . . 1 1 1 1 1 f 1 f 1 1 1 . . . 
    . . 1 1 1 1 1 f 1 1 f 1 1 . . . 
    . . 1 1 1 1 1 f 1 1 1 f 1 . . . 
    . . 1 1 1 1 1 f f f f 1 1 . . . 
    . . f 1 1 1 1 f 1 1 1 1 f . . . 
    . . 1 f 1 1 1 f 1 1 1 f 1 . . . 
    . . 1 1 f f f f f f f 1 1 . . . 
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
            . . f f f . . . . . . . . f f f 
            . f f c c . . . . . . f c b b c 
            f f c c . . . . . . f c b b c . 
            f c f c . . . . . . f b c c c . 
            f f f c c . c c . f c b b c c . 
            f f c 3 c c 3 c c f b c b b c . 
            f f b 3 b c 3 b c f b c c b c . 
            . c 1 b b b 1 b c b b c c c . . 
            . c 1 b b b 1 b b c c c c . . . 
            c b b b b b b b b b c c . . . . 
            c b 1 f f 1 c b b b b f . . . . 
            f f 1 f f 1 f b b b b f c . . . 
            f f 2 2 2 2 f b b b b f c c . . 
            . f 2 2 2 2 b b b b c f . . . . 
            . . f b b b b b b c f . . . . . 
            . . . f f f f f f f . . . . . . 
            `, SpriteKind.Projectile2)
    }
    falling.setPosition(randint(20, 140), 20)
    limit = Math.min(10, info.score())
    falling.setVelocity(randint(-100, 100), randint(0 - limit, 5))
    falling.ay = 20
    falling.setBounceOnWall(true)
})
