const Discord = require("discord.js");

const WIDTH = 9;
const HEIGHT = 4;
const gameMap = [];
const asteroid1 = {x: 0, y: 0}
const asteroid2 = {x: 0, y: 0}
const asteroid3 = {x: 0, y: 0}
const asteroid4 = {x: 0, y: 0}
const asteroid5 = {x: 0, y: 0}
const spacePackage = {x: -1, y: -1}

class SpaceGame
{
constructor()
{
    this.userID;
    this.rocket = {x: 5, y:3}
    this.score = 0;
    this.boxes = 0;
    this.gameEmbed = null;
    this.inGame = false;
    this.secret = 0;
    this.isPackage = false;
    for (let y = 0; y < HEIGHT; y++)
    {
        for (let x = 0; x < WIDTH; x++)
        {
            gameMap[y * WIDTH + x] = "⬛";
        }
    }
}

gameMapToString()
{
    let str = "";
    for (let y = 0; y < HEIGHT; y++)
    {
        for (let x = 0; x < WIDTH; x++)
        {
            if ((x == asteroid1.x && y == asteroid1.y) || (x == asteroid2.x && y == asteroid2.y) || (x == asteroid3.x && y == asteroid3.y) || (x == asteroid4.x && y == asteroid4.y) || (x == asteroid5.x && y == asteroid5.y))
            {
                if (this.secret == 0)
                {
                    str += "🌑";
                } else if (this.secret == 1)
                {
                    str += "⛈";
                } else if (this.secret == 2)
                {
                    str += "🦈";
                } else if (this.secret == 3)
                {
                    str += "💊";
                } else if (this.secret == 4)
                {
                    str += "🌳";
                }
                continue;
            }

            if (x == spacePackage.x && y == spacePackage.y)
            {
                if (this.secret == 0)
                {
                    str += "📦";
                } else if (this.secret == 1)
                {
                    str += "🌈";
                } else if (this.secret == 2)
                {
                    str += "🦐";
                } else if (this.secret == 3)
                {
                    str += "🧬";
                } else if (this.secret == 4)
                {
                    str += "🌼";
                }
                continue;
            }

            let flag = true;
            if (x == this.rocket.x && y == this.rocket.y)
            {
                if (this.secret == 0)
                {
                    str += "🚀";
                } else if (this.secret == 1)
                {
                    str += "✈";
                } else if (this.secret == 2)
                {
                    str += "🐟";
                } else if (this.secret == 3)
                {
                    str += "🦠";
                } else if (this.secret == 4)
                {
                    str += "🐝";
                }
                flag = false;
            }

            if (flag)
                str += gameMap[y * WIDTH + x];
        }
        str += "\n";
    }
    return str;
}

isPosInRocket(pos)
{
    return ((asteroid1.x == pos.x && asteroid1.y == pos.y) || (asteroid2.x == pos.x && asteroid2.y == pos.y) || (asteroid3.x == pos.x && asteroid3.y == pos.y) || (asteroid4.x == pos.x && asteroid4.y == pos.y) || (asteroid5.x == pos.x && asteroid5.y == pos.y));
}

isPosInPackage(pos)
{
    return (spacePackage.x == pos.x && spacePackage.y == pos.y);
}

newAsteroidPosition()
{
    let newAsteroidPos = { x: 0, y: 0 };

    newAsteroidPos = { x: parseInt(Math.random() * WIDTH), y: 0 };
    asteroid1.x = newAsteroidPos.x;
    asteroid1.y = newAsteroidPos.y;

    do
    {
        newAsteroidPos = { x: parseInt(Math.random() * WIDTH), y: 0 };
        asteroid2.x = newAsteroidPos.x;
        asteroid2.y = newAsteroidPos.y;
    } while (asteroid2.x == asteroid1.x);
    
    do
    {
        newAsteroidPos = { x: parseInt(Math.random() * WIDTH), y: 0 };
        asteroid3.x = newAsteroidPos.x;
        asteroid3.y = newAsteroidPos.y;
    } while (asteroid3.x == asteroid2.x || asteroid3.x == asteroid1.x);

    do
    {
        newAsteroidPos = { x: parseInt(Math.random() * WIDTH), y: 0 };
        asteroid4.x = newAsteroidPos.x;
        asteroid4.y = newAsteroidPos.y;
    } while (asteroid4.x == asteroid3.x || asteroid4.x == asteroid2.x || asteroid4.x == asteroid1.x);

    do
    {
        newAsteroidPos = { x: parseInt(Math.random() * WIDTH), y: 0 };
        asteroid5.x = newAsteroidPos.x;
        asteroid5.y = newAsteroidPos.y;
    } while (asteroid5.x == asteroid4.x || asteroid5.x == asteroid3.x || asteroid5.x == asteroid2.x || asteroid5.x == asteroid1.x);
}

newPackagePosition()
{
    let newPackPos = {x: 0, y: 0};
    newPackPos = {x: parseInt(Math.random() * WIDTH), y: -1};
    spacePackage.x = newPackPos.x;
    spacePackage.y = newPackPos.y;
}

pushAsteroid()
{
    asteroid1.y += 1;
    asteroid2.y += 1;
    asteroid3.y += 1;
    asteroid4.y += 1;
    asteroid5.y += 1;
    
    if (this.isPackage)
        spacePackage.y += 1;
}

newGame(message)
{
    if (this.inGame)
    {
        message.channel.send(":confused: oops, looks like someone is already playing space game. Why don't you try another game in the meantime? ");
        return;
    }

    let rnd = parseInt(Math.random() * 10);
    if (rnd == 1)
    {
        this.secret = 1;
    } else if (rnd == 2)
    {
        this.secret = 2;
    } else if (rnd == 3)
    {
        this.secret = 3;
    } else if (rnd == 4)
    {
        this.secret = 4;
    } else
    {
        this.secret = 0;
    }

    this.userID = message.author.id;
    this.inGame = true;
    this.score = 0;
    this.boxes = 0;
    this.rocket = {x: 5, y: 3};
    this.newAsteroidPosition();
    const embed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Space game")
        .setDescription(this.gameMapToString())
        .setTimestamp();

    message.channel.send(embed).then(emsg =>
    {
        this.gameEmbed = emsg;
        this.gameEmbed.react('⬅️');
        this.gameEmbed.react('➡️');

        this.waitForReaction();
    });
}

step(pos) 
{
    // generate package randomly (1/12)
    if (!this.isPackage)
    {
        let rnd = parseInt(Math.random() * 12);
        if (rnd == 1)
        {
            this.isPackage = true;
            this.newPackagePosition();
        }
    }

    this.score += 1;
    this.rocket = pos;
    this.pushAsteroid();

    if (asteroid1.y >= 5)
        this.newAsteroidPosition();

    if (spacePackage.y >= 5)
    {
        this.isPackage = false;
        spacePackage.x = -1;
        spacePackage.y = -1;
    }

    const editEmbed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Space Game")
        .setDescription(this.gameMapToString())
        .setTimestamp();
    this.gameEmbed.edit(editEmbed);

    this.waitForReaction();
}

gameOver()
{
    let rank = "";
    if (this.score > 1000)
    {
        rank = "Legend";
    } else if (this.score > 500)
    {
        rank = "Master";
    } else if (this.score > 400)
    {
        rank = "Expert";
    } else if (this.score > 300)
    {
        rank = "Pro";
    } else if (this.score > 200)
    {
        rank = "Elite";
    } else if (this.score > 150)
    {
        rank = "Good";
    } else if (this.score > 100)
    {
        rank = "Average";
    } else if (this.score > 75)
    {
        rank = "Beginner";
    } else if (this.score > 50)
    {
        rank = "Novice";
    } else if (this.score > 10)
    {
        rank = "Lamer";
    } else if (this.score > 0)
    {
        rank = "Idiot";
    }

    this.inGame = false;
    const editEmbed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Space Game")
        .setDescription("GAME OVER!\nSCORE: " + this.score + "\nCOLLECTED PACKAGES: " + this.boxes + "\nRANK: " + rank)
        .setTimestamp();
    this.gameEmbed.edit(editEmbed);

    this.gameEmbed.reactions.removeAll();
}

filter(reaction, user)
{
    return ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id !== this.gameEmbed.author.id;
}

waitForReaction()
{
    this.gameEmbed.awaitReactions((reaction, user) => this.filter(reaction, user), { max: 1, time: 60000, errors: ["time"] })
        .then(collected => 
        {
            const reaction = collected.first();

            const rocketHead = this.rocket;
            const nextPos = { x: rocketHead.x, y: rocketHead.y };
            if (reaction.emoji.name === '⬅️')
            {
                let nextX = rocketHead.x - 1;
                if (nextX < 0)
                    nextX = WIDTH - 1;
                nextPos.x = nextX;
            }
            else if (reaction.emoji.name === '➡️')
            {
                let nextX = rocketHead.x + 1;
                if (nextX >= WIDTH)
                    nextX = 0;
                nextPos.x = nextX;
            }

            reaction.users.remove(reaction.users.cache.filter(user => user.id !== this.gameEmbed.author.id).first().id).then(() =>
            {
                if (this.isPosInRocket(this.rocket))
                {
                    this.gameOver();
                }
                else
                {
                    if (this.isPosInPackage(this.rocket))
                    {
                        this.boxes += 1;
                        this.score += 35;
                    }
                    this.step(nextPos);
                }
            });
        })
        .catch(collected => 
        {
            this.gameOver();
        });
    }
}

module.exports = SpaceGame;
