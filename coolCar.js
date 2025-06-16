const Discord = require("discord.js")

//COOLCAR VARS
const WIDTH = 10;
const HEIGHT = 4;
const gameMap = [];
const construction1 = {x: 0, y: 0};
const construction2 = {x: 0, y: 0};
const construction3 = {x: 0, y: 0};
const construction4 = {x: 0, y: 0};
const construction5 = {x: 0, y: 0};
const oil = {x: 0, y: 0};
const policeCar = {x: 0, y: 0};

class CoolCar
{
	constructor()
	{
		this.userID;
		this.car
		this.gameEmbed = null;
		this.inGame = false;
		this.score;
		this.fuel;

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
        		if((x == construction1.x && y == construction1.y) || (x == construction2.x && y == construction2.y) || (x == construction3.x && y == construction3.y) || (x == construction4.x && y == construction4.y) || (x == construction5.x && y == construction5.y))
        		{
        			str += "🚧";
        			continue;
        		} else if (x == oil.x && y == oil.y)
        		{
        			str += "🛢";
        			continue;
        		} else if (x == policeCar.x && y == policeCar.y)
        		{
        			str += "🚓";
        			continue;
        		} else if (x == this.car.x && y == this.car.y)
        		{
        			str += "🚗";
        			continue;
        		}

        		let flag = true;
        		if (flag)
                	str += gameMap[y * WIDTH + x];
        	}
        	str += "\n";
    	}
    	return str;
	}

	isCarCrashed(pos)
	{
		return ((construction1.x == pos.x && construction1.y == pos.y) || (construction2.x == pos.x && construction2.y == pos.y) || (pos.x == construction3.x && pos.y == construction3.y) || (pos.x == construction4.x && pos.y == construction4.y) || (pos.x == construction5.x && pos.y == construction5.y) || (pos.x == policeCar.x && pos.y == policeCar.y));
	}

	isOil(pos)
	{
		return (oil.x == pos.x && oil.y == pos.y);
	}

	pushObjects()
	{
		construction1.x -= 1;
		construction2.x -= 1;
		construction3.x -= 1;
		construction4.x -= 1;
		construction5.x -= 1;
		oil.x -= 1;
		policeCar.x -= 1;
	}

	newGame(message)
	{
		if (this.inGame)
    	{
        	message.channel.send(":confused: oops, looks like someone is already playing car game. Why don't you try another game in the meantime?");
        	return;
    	}

    	this.userID = message.author.id;
    	this.inGame = true;
    	this.score = 0;
    	this.fuel = 30;
    	this.car = {x: 0, y: 2}

    	let rnd;
    	rnd = parseInt(Math.random() * (HEIGHT));
    	construction1.x = 2;
    	construction1.y = rnd;
    	rnd = parseInt(Math.random() * (HEIGHT));
    	construction2.x = 4;
    	construction2.y = rnd;
    	rnd = parseInt(Math.random() * (HEIGHT));
    	construction3.x = 6;
    	construction3.y = rnd;
    	rnd = parseInt(Math.random() * (HEIGHT));
    	construction4.x = 8;
    	construction4.y = rnd;
    	rnd = parseInt(Math.random() * (HEIGHT));
    	construction5.x = 9;
    	construction5.y = rnd;
    	rnd = parseInt(Math.random() * (HEIGHT));
    	oil.x = 7;
    	oil.y = rnd;
    	rnd = parseInt(Math.random() * (HEIGHT));
    	policeCar.x = 5;
    	policeCar.y = rnd;


    	const embed = new Discord.MessageEmbed()
        	.setColor("#ff0000")
        	.setTitle("Cool Car Game")
        	.setDescription("**fuel left :** " + this.fuel + "L\n\n" + this.gameMapToString())
        	.setTimestamp();

        message.channel.send(embed).then(emsg =>
    	{
        	this.gameEmbed = emsg;
        	this.gameEmbed.react('⬆');
        	this.gameEmbed.react('⬇');

        	this.waitForReaction();
    	});
	}

	step(pos)
	{
		this.score += 1;
		this.fuel -= 1;
		this.car = pos;
		this.pushObjects();

		if(Math.random() < 0.5)
		{
			policeCar.y += 1;
		}
		else
		{
			policeCar.y -= 1;
		}
		if(policeCar.y >= HEIGHT - 1)
		{
			policeCar.y = HEIGHT - 1;
		} else if(policeCar.y < 0)
		{
			policeCar.y = 0;
		}

		if (construction1.x < 0)
		{
			let rnd = parseInt(Math.random() * (HEIGHT));
			construction1.x = WIDTH;
			construction1.y = rnd;
		} else if (construction2.x < 0)
		{
			let rnd = parseInt(Math.random() * (HEIGHT));
			construction2.x = WIDTH;
			construction2.y = rnd;
		} else if (construction3.x < 0)
		{
			let rnd = parseInt(Math.random() * (HEIGHT));
			construction3.x = WIDTH;
			construction3.y = rnd;
		} else if (construction4.x < 0)
		{
			let rnd = parseInt(Math.random() * (HEIGHT));
			construction4.x = WIDTH;
			construction4.y = rnd;
		} else if (construction5.x < 0)
		{
			let rnd = parseInt(Math.random() * (HEIGHT));
			construction5.x = WIDTH;
			construction5.y = rnd;
		} else if (oil.x < 0)
		{
			let rnd = parseInt(Math.random() * (HEIGHT));
			oil.x = WIDTH;
			oil.y = rnd;
		} else if (policeCar.x < 0)
		{
			let rnd = parseInt(Math.random() * (HEIGHT));
			policeCar.x = WIDTH;
			policeCar.y = rnd;
		}

		const editEmbed = new Discord.MessageEmbed()
	        .setColor("#ff0000")
	        .setTitle("Cool Car Game")
	        .setDescription("**fuel left :** " + this.fuel + "L\n\n" + this.gameMapToString())
	        .setTimestamp();
	    this.gameEmbed.edit(editEmbed);

	    this.waitForReaction();
	}

	gameover()
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
    	} else if (this.score > 350)
    	{
        	rank = "Pro";
    	} else if (this.score > 300)
    	{
        	rank = "Elite";
    	} else if (this.score > 250)
    	{
        	rank = "Good";
    	} else if (this.score > 200)
    	{
        	rank = "Average";
    	} else if (this.score > 150)
    	{
        	rank = "Beginner";
    	} else if (this.score > 100)
    	{
        	rank = "Novice";
    	} else if (this.score > 50)
    	{
        	rank = "Lamer";
    	} else if (this.score > 0)
    	{
        	rank = "Idiot";
    	}

    	this.inGame = false;
    	const editEmbed = new Discord.MessageEmbed()
        	.setColor("#ff0000")
        	.setTitle("Cool Car Game")
        	.setDescription("GAME OVER!\nSCORE: " + this.score + "\nRANK: " + rank)
        	.setTimestamp();
    	this.gameEmbed.edit(editEmbed);
    	this.gameEmbed.reactions.removeAll();
	}

	filter(reaction, user)
	{
    	return ['⬆', '⬇'].includes(reaction.emoji.name) && user.id !== this.gameEmbed.author.id;
	}

	waitForReaction()
	{
	    this.gameEmbed.awaitReactions((reaction, user) => this.filter(reaction, user), { max: 1, time: 60000, errors: ["time"] })
	        .then(collected => 
	        {
	            const reaction = collected.first();

	            const ccar = this.car;
	            const nextPos = { x: ccar.x, y: ccar.y };
	            if (reaction.emoji.name === '⬆')
	            {
	                let nextY = ccar.y - 1;
	                if (nextY <= 0)
	                    nextY = 0;
	                nextPos.y = nextY;
	            }
	            else if (reaction.emoji.name === '⬇')
	            {
	                let nextY = ccar.y + 1;
	                if (nextY >= HEIGHT - 1)
	                    nextY = HEIGHT - 1;
	                nextPos.y = nextY;
	            }

	            reaction.users.remove(reaction.users.cache.filter(user => user.id !== this.gameEmbed.author.id).first().id).then(() =>
	            {
	                if ((this.isCarCrashed(this.car)) || (this.fuel <= 0))
	                {
	                    this.gameover();
	                }
	                else
	                {
	                    if (this.isOil(this.car))
	                    {
	                        this.fuel += 12;
	                        this.score += 2;
	                    }
	                    this.step(nextPos);
	                }
	            });
	        })
	        .catch(collected => 
	        {
	            this.gameover();
	        });
	}
}

module.exports = CoolCar;
