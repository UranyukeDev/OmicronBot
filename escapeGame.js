const Discord = require("discord.js");

const WIDTH = 13;
const HEIGHT = 13;

class EscapeGame
{
	constructor()
	{
		this.advice = "";
		this.userID;
		this.gameMap = [];
		this.gameEmbed = null;
		this.inGame = false;
		this.level = 1;
		this.key;
	}

	generateLevel()
	{
		this.advice = "*no info*";
		this.key = false;
		switch(this.level) //🟫, ⚫, 👤, 👻, 🚪, 🔥, 📦, 🔑, 🔒
		{
			case 1:
				this.advice = "👻 -> Ghosts move in random direction you have to avoid touching them.";
				this.gameMap = [
				['🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','⚫','🟫','🟫','🟫','🟫','🟫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','⚫','🟫','⚫','⚫','⚫','🟫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','👻','⚫','🟫','⚫','👤','⚫','🟫','⚫','👻','⚫','🟫',],
				['🟫','⚫','⚫','⚫','🟫','⚫','⚫','⚫','🟫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','⚫','🟫','⚫','⚫','⚫','🟫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','🟫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','🟫','⚫','🚪','⚫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','🟫','⚫','⚫','⚫','🟫',],
				['🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫',]
				]; break;
			case 2:
				this.advice = "🔥 -> Fire works like walls but when you enter it you will die unlike the wall which pushes you back.";
				this.gameMap = [
				['🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','🔥','⚫','⚫','⚫','🟫',],
				['🟫','⚫','👤','⚫','⚫','⚫','🔥','⚫','⚫','⚫','👻','⚫','🟫',],
				['🟫','⚫','⚫','⚫','🔥','⚫','⚫','⚫','⚫','⚫','⚫','⚫','🟫',],
				['🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','🔥','⚫','⚫','⚫','👻','⚫','⚫','⚫','🔥','⚫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','⚫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','🔥','⚫','⚫','⚫','🟫',],
				['🟫','⚫','👻','⚫','⚫','⚫','🔥','⚫','⚫','⚫','🚪','⚫','🟫',],
				['🟫','⚫','⚫','⚫','🔥','⚫','⚫','⚫','⚫','⚫','⚫','⚫','🟫',],
				['🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫',]
				]; break;
			case 3:
				this.gameMap = [
				['🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫',],
				['🟫','⚫','⚫','🔥','⚫','⚫','⚫','⚫','⚫','🔥','⚫','⚫','🟫',],
				['🟫','⚫','⚫','🔥','⚫','⚫','🔥','👻','⚫','🔥','⚫','⚫','🟫',],
				['🟫','⚫','⚫','🔥','⚫','⚫','⚫','⚫','⚫','🔥','⚫','⚫','🟫',],
				['🟫','🟫','🟫','🟫','⚫','🟫','🟫','🟫','⚫','🟫','🟫','🟫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','⚫','⚫','🔥','⚫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','👤','⚫','⚫','⚫','⚫','🔥','⚫','👻','🚪','⚫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','⚫','⚫','🔥','⚫','⚫','⚫','⚫','🟫',],
				['🟫','🟫','🟫','🟫','⚫','🟫','🟫','🟫','⚫','🟫','🟫','🟫','🟫',],
				['🟫','⚫','⚫','🔥','⚫','⚫','⚫','⚫','⚫','🔥','⚫','⚫','🟫',],
				['🟫','⚫','⚫','🔥','⚫','👻','🔥','⚫','⚫','🔥','⚫','⚫','🟫',],
				['🟫','⚫','⚫','🔥','⚫','⚫','⚫','⚫','⚫','🔥','⚫','⚫','🟫',],
				['🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫',]
				]; break;
			case 4:
				this.advice = "📦 -> Boxes can be pushed by the player.";
				this.gameMap = [
				['🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫',],
				['🟫','⚫','⚫','⚫','🟫','⚫','📦','⚫','⚫','⚫','⚫','⚫','🟫',],
				['🟫','🔥','👤','🔥','🟫','⚫','⚫','📦','⚫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','⚫','🟫','⚫','🟫','🟫','🟫','⚫','⚫','⚫','🟫',],
				['🟫','🔥','⚫','🔥','🟫','⚫','🟫','🚪','🟫','🔥','⚫','🔥','🟫',],
				['🟫','⚫','⚫','⚫','🟫','⚫','🟫','⚫','🟫','⚫','⚫','⚫','🟫',],
				['🟫','🔥','⚫','🔥','🟫','⚫','🟫','⚫','🟫','🔥','⚫','🔥','🟫',],
				['🟫','⚫','⚫','⚫','🟫','⚫','⚫','⚫','🟫','⚫','⚫','⚫','🟫',],
				['🟫','🔥','⚫','🔥','🟫','⚫','⚫','⚫','🟫','🔥','⚫','🔥','🟫',],
				['🟫','⚫','⚫','⚫','🟫','🟫','🟫','🟫','🟫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','📦','⚫','⚫','📦','⚫','📦','⚫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','📦','⚫','📦','⚫','⚫','📦','⚫','⚫','⚫','🟫',],
				['🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫',]
				]; break;
			case 5:
				this.gameMap = [
				['🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫',],
				['🟫','⚫','⚫','⚫','📦','⚫','📦','⚫','📦','📦','⚫','⚫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','📦','⚫','📦','⚫','📦','📦','⚫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','⚫','📦','⚫','📦','⚫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','⚫','🟫','🟫','🟫','🟫','🟫','⚫','👻','⚫','🟫',],
				['🟫','⚫','📦','⚫','🟫','⚫','⚫','⚫','🟫','⚫','⚫','⚫','🟫',],
				['🟫','📦','📦','📦','🟫','⚫','🔥','⚫','🟫','⚫','⚫','📦','🟫',],
				['🟫','⚫','⚫','⚫','🟫','⚫','🔥','⚫','🟫','📦','📦','📦','🟫',],
				['🟫','⚫','👻','⚫','🟫','⚫','🔥','⚫','🟫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','⚫','🟫','⚫','🔥','⚫','🟫','🔥','⚫','⚫','🟫',],
				['🟫','⚫','👤','⚫','🟫','⚫','🔥','⚫','🟫','⚫','🚪','⚫','🟫',],
				['🟫','⚫','⚫','⚫','🟫','⚫','⚫','⚫','🟫','⚫','⚫','⚫','🟫',],
				['🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫',]
				]; break;
			case 6:
				this.advice = "🔑 -> The key allows the player to unlock a door.";
				this.gameMap = [
				['🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫',],
				['🟫','⚫','⚫','🟫','⚫','🟫','⚫','⚫','🟫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','🟫','⚫','🟫','⚫','⚫','🟫','⚫','🚪','⚫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','🔒','⚫','⚫','🟫','⚫','⚫','⚫','🟫',],
				['🟫','👻','⚫','🟫','⚫','🟫','⚫','👻','🟫','⚫','🟫','🟫','🟫',],
				['🟫','⚫','⚫','🟫','⚫','🟫','⚫','⚫','🟫','📦','🟫','⚫','🟫',],
				['🟫','⚫','⚫','🟫','⚫','🟫','⚫','⚫','⚫','📦','⚫','⚫','🟫',],
				['🟫','🔑','⚫','🟫','⚫','🟫','⚫','⚫','🟫','⚫','🟫','⚫','🟫',],
				['🟫','🟫','🟫','🟫','⚫','🟫','🟫','🟫','🟫','⚫','🟫','🟫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','⚫','🔥','👻','⚫','⚫','👻','⚫','👤','⚫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','🟫',],
				['🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫',]
				]; break;
			case 7:
				this.gameMap = [
				['🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫',],
				['🟫','👤','🔥','⚫','⚫','⚫','🔥','⚫','⚫','⚫','🔥','⚫','🟫',],
				['🟫','⚫','⚫','⚫','🔥','⚫','⚫','⚫','🔥','⚫','⚫','⚫','🟫',],
				['🟫','⚫','🔥','⚫','⚫','👻','🔥','⚫','⚫','👻','🔥','⚫','🟫',],
				['🟫','⚫','⚫','⚫','🔥','⚫','⚫','⚫','🔥','⚫','⚫','⚫','🟫',],
				['🟫','⚫','🔥','⚫','⚫','⚫','🔥','⚫','⚫','⚫','🔥','⚫','🟫',],
				['🟫','⚫','⚫','👻','🔥','⚫','⚫','👻','🔥','⚫','⚫','⚫','🟫',],
				['🟫','⚫','🔥','⚫','⚫','⚫','🔥','⚫','⚫','⚫','🔥','⚫','🟫',],
				['🟫','⚫','⚫','⚫','🔥','⚫','⚫','⚫','🔥','⚫','⚫','⚫','🟫',],
				['🟫','⚫','🔥','⚫','⚫','👻','🔥','⚫','⚫','👻','🔥','⚫','🟫',],
				['🟫','⚫','⚫','⚫','🔥','⚫','⚫','⚫','🔥','⚫','⚫','⚫','🟫',],
				['🟫','⚫','🔥','⚫','⚫','⚫','🔥','⚫','⚫','⚫','🔥','🚪','🟫',],
				['🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫',]
				]; break;
			case 8:
				this.advice = "🧠 -> Here you are going to need to use your brain.";
				this.gameMap = [
				['🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫',],
				['🟫','⚫','⚫','🟫','🟫','⚫','👤','⚫','🟫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','🔥','🟫','🟫','⚫','⚫','⚫','🟫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','🟫','🟫','📦','📦','📦','🟫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','🟫','🟫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','🟫','🟫','⚫','📦','⚫','⚫','🟫','🟫','🟫','🟫',],
				['🟫','⚫','🔥','🟫','🟫','⚫','🟫','📦','📦','⚫','⚫','🟫','🟫',],
				['🟫','⚫','⚫','🟫','🟫','⚫','⚫','📦','⚫','⚫','🟫','🟫','🟫',],
				['🟫','🔥','⚫','🟫','🟫','🟫','🟫','🟫','🔒','📦','🟫','🟫','🟫',],
				['🟫','⚫','⚫','⚫','🔥','⚫','⚫','🟫','⚫','🟫','⚫','🟫','🟫',],
				['🟫','⚫','🔥','👻','⚫','⚫','🔑','🟫','⚫','🚪','⚫','🟫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','🔥','⚫','🟫','⚫','⚫','⚫','🟫','🟫',],
				['🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫',]
				]; break;
			case 9:
				this.gameMap = [
				['🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','📦','⚫','📦','⚫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','🟫','🟫','🟫','⚫','🟫','🟫','🟫','⚫','⚫','🟫',],
				['🟫','📦','🟫','⚫','🟫','⚫','👻','⚫','🟫','🔑','🟫','📦','🟫',],
				['🟫','⚫','🟫','⚫','🟫','⚫','⚫','⚫','🟫','⚫','🟫','⚫','🟫',],
				['🟫','⚫','🟫','⚫','🟫','📦','🔒','📦','🟫','⚫','🟫','⚫','🟫',],
				['🟫','⚫','🟫','📦','🔥','📦','⚫','⚫','🔥','⚫','🟫','⚫','🟫',],
				['🟫','⚫','🟫','⚫','⚫','📦','📦','📦','⚫','⚫','🟫','⚫','🟫',],
				['🟫','⚫','🟫','📦','📦','📦','⚫','⚫','📦','📦','🟫','⚫','🟫',],
				['🟫','⚫','🟫','👤','⚫','📦','⚫','⚫','📦','⚫','🟫','⚫','🟫',],
				['🟫','⚫','⚫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','⚫','🚪','⚫','⚫','⚫','⚫','⚫','🟫',],
				['🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫',]
				]; break;
			case 10:
				this.gameMap = [
				['🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','⚫','👤','⚫','⚫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','🟫',],
				['🟫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','⚫','🟫',],
				['🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫',]
				]; break;
		}
	}

	convertToString()
	{
		let str = "";
		for(var i = 0; i < WIDTH; i++)
		{
			for(var j = 0; j < HEIGHT; j++)
			{
				str += this.gameMap[i][j];
			}
			str += "\n";
		}

		return str;
	}

	newGame(message)
	{	
		if (this.inGame)
    	{
        	message.channel.send(":confused: oops, looks like someone is already playing escape game. Why don't you try another game in the meantime?");
        	return;
    	}

    	this.userID = message.author.id;
    	this.inGame = true;
    	this.level = 1;
    	this.advice = "";
    	this.key = false;

    	this.generateLevel();

    	const embed = new Discord.MessageEmbed()
        	.setColor("#000066")
        	.setTitle("Escape Game")
        	.setDescription("**Level :** " + this.level + "\n\n" + this.advice + "\n\n" + this.convertToString())
        	.setTimestamp();

        message.channel.send(embed).then(emsg =>
    	{
        	this.gameEmbed = emsg;
        	this.gameEmbed.react('⬆');
        	this.gameEmbed.react('⬅️');
        	this.gameEmbed.react('➡️');
        	this.gameEmbed.react('⬇');
        	this.gameEmbed.react('🔄');

        	this.waitForReaction();
    	});
	}

	moveGhosts()
	{
		let gx = [];
		let gy = [];
		for(var i = 0; i < WIDTH; i++)
		{
			for(var j = 0; j < HEIGHT; j++)
			{
				if(this.gameMap[i][j] == '👻')
				{
					let rnd = Math.floor(Math.random() * 4);
					switch(rnd)
					{
						case 0: //left
							if(this.gameMap[i][j-1] == '⚫')
							{
								this.gameMap[i][j] = '⚫';
								gx.push(j-1);
								gy.push(i);
							} break;
						case 1: //right
							if(this.gameMap[i][j+1] == '⚫')
							{
								this.gameMap[i][j] = '⚫';
								gx.push(j+1);
								gy.push(i);
							} break;
						case 2: //up
							if(this.gameMap[i-1][j] == '⚫')
							{
								this.gameMap[i][j] = '⚫';
								gx.push(j);
								gy.push(i-1);
							} break;
						case 3: //down
							if(this.gameMap[i+1][j] == '⚫')
							{
								this.gameMap[i][j] = '⚫';
								gx.push(j);
								gy.push(i+1);
							} break;
					}
				} else if(this.gameMap[i][j] == '🔒')
				{
					if(this.key == true)
					{
						this.gameMap[i][j] = '⚫';
					}
				}
			}
		}

		for(var i = 0; i < gx.length; i++)
		{
			this.gameMap[gy[i]][gx[i]] = '👻';
		}
	}

	step()
	{
		const editEmbed = new Discord.MessageEmbed()
	        .setColor("#000066")
	        .setTitle("Escape Game")
	        .setDescription("**Level :** " + this.level + "\n\n" + this.advice + "\n\n" + this.convertToString())
	        .setTimestamp();
	    this.gameEmbed.edit(editEmbed);

	    this.waitForReaction();
	}

	gameOver()
	{
		this.inGame = false;
    	const editEmbed = new Discord.MessageEmbed()
        	.setColor("#000066")
        	.setTitle("Escape Game")
        	.setDescription("GAME OVER!\nLEVELS COMPLETED: " + this.level)
        	.setTimestamp();
    	this.gameEmbed.edit(editEmbed);
    	this.gameEmbed.reactions.removeAll();
	}

	filter(reaction, user)
	{
		return ['⬆', '⬅️', '➡️', '⬇', '🔄'].includes(reaction.emoji.name) && user.id !== this.gameEmbed.author.id;
	}

	waitForReaction()
	{
		let x, y;
		for(var i = 0; i < WIDTH; i++)
		{
			for(var j = 0; j < HEIGHT; j++)
			{
				if(this.gameMap[i][j] == '👤')
				{
					y = i;
					x = j;
				}
			}
		}
		this.moveGhosts();
		this.gameEmbed.awaitReactions((reaction, user) => this.filter(reaction, user), { max: 1, time: 60000, errors: ["time"] })
	        .then(collected => 
	        {
	            const reaction = collected.first();
	            let dead = false;

	            if (reaction.emoji.name === '⬅️') //LEFT
	            {
	                if(this.gameMap[y][x-1] == '⚫')
	                {
	                	this.gameMap[y][x] = '⚫';
	                	this.gameMap[y][x-1] = '👤';
	                } else if(this.gameMap[y][x-1] == '🟫')
	                {
	                	this.gameMap[y][x] = '👤';
	                } else if(this.gameMap[y][x-1] == '🚪')
	                {
	                	this.level++;
	                	this.generateLevel();
	                } else if(this.gameMap[y][x-1] == '👻')
	                {
	                	this.gameOver(); dead = true;
	                } else if(this.gameMap[y][x-1] == '🔥')
	                {
	                	this.gameOver(); dead = true;
	                } else if(this.gameMap[y][x-1] == '📦')
	                {
	                	if(this.gameMap[y][x-2] == '⚫')
	                	{
	                		this.gameMap[y][x] = '⚫';
	                		this.gameMap[y][x-1] = '👤';
	                		this.gameMap[y][x-2] = '📦';
	                	} else
	                	{
	                		this.gameMap[y][x] = '👤';
	                	}
	                } else if(this.gameMap[y][x-1] == '🔒')
	                {
	                	this.gameMap[y][x] = '👤';
	                } else if(this.gameMap[y][x-1] == '🔑')
	                {
	                	this.gameMap[y][x] = '⚫';
	                	this.gameMap[y][x-1] = '👤';
	                	this.key = true;
	                }
	            } else if (reaction.emoji.name === '➡️') //RIGHT
	            {
	                if(this.gameMap[y][x+1] == '⚫')
	                {
	                	this.gameMap[y][x] = '⚫';
	                	this.gameMap[y][x+1] = '👤';
	                } else if(this.gameMap[y][x+1] == '🟫')
	                {
	                	this.gameMap[y][x] = '👤';
	                } else if(this.gameMap[y][x+1] == '🚪')
	                {
	                	this.level++;
	                	this.generateLevel();
	                } else if(this.gameMap[y][x+1] == '👻')
	                {
	                	this.gameOver(); dead = true;
	                } else if(this.gameMap[y][x+1] == '🔥')
	                {
	                	this.gameOver(); dead = true;
	                } else if(this.gameMap[y][x+1] == '📦')
	                {
	                	if(this.gameMap[y][x+2] == '⚫')
	                	{
	                		this.gameMap[y][x] = '⚫';
	                		this.gameMap[y][x+1] = '👤';
	                		this.gameMap[y][x+2] = '📦';
	                	} else
	                	{
	                		this.gameMap[y][x] = '👤';
	                	}
	                } else if(this.gameMap[y][x+1] == '🔒')
	                {
	                	this.gameMap[y][x] = '👤';
	                } else if(this.gameMap[y][x+1] == '🔑')
	                {
	                	this.gameMap[y][x] = '⚫';
	                	this.gameMap[y][x+1] = '👤';
	                	this.key = true;
	                }
	            } else if (reaction.emoji.name === '⬆') //UP
	            {
	            	if(this.gameMap[y-1][x] == '⚫')
	                {
	                	this.gameMap[y][x] = '⚫';
	                	this.gameMap[y-1][x] = '👤';
	                } else if(this.gameMap[y-1][x] == '🟫')
	                {
	                	this.gameMap[y][x] = '👤';
	                } else if(this.gameMap[y-1][x] == '🚪')
	                {
	                	this.level++;
	                	this.generateLevel();
	                } else if(this.gameMap[y-1][x] == '👻')
	                {
	                	this.gameOver(); dead = true;
	                } else if(this.gameMap[y-1][x] == '🔥')
	                {
	                	this.gameOver(); dead = true;
	                } else if(this.gameMap[y-1][x] == '📦')
	                {
	                	if(this.gameMap[y-2][x] == '⚫')
	                	{
	                		this.gameMap[y][x] = '⚫';
	                		this.gameMap[y-1][x] = '👤';
	                		this.gameMap[y-2][x] = '📦';
	                	} else
	                	{
	                		this.gameMap[y][x] = '👤';
	                	}
	                } else if(this.gameMap[y-1][x] == '🔒')
	                {
	                	this.gameMap[y][x] = '👤';
	                } else if(this.gameMap[y-1][x] == '🔑')
	                {
	                	this.gameMap[y][x] = '⚫';
	                	this.gameMap[y-1][x] = '👤';
	                	this.key = true;
	                }
	            } else if (reaction.emoji.name === '⬇') //DOWN
	            {
	            	if(this.gameMap[y+1][x] == '⚫')
	                {
	                	this.gameMap[y][x] = '⚫';
	                	this.gameMap[y+1][x] = '👤';
	                } else if(this.gameMap[y+1][x] == '🟫')
	                {
	                	this.gameMap[y][x] = '👤';
	                } else if(this.gameMap[y+1][x] == '🚪')
	                {
	                	this.level++;
	                	this.generateLevel();
	                } else if(this.gameMap[y+1][x] == '👻')
	                {
	                	this.gameOver(); dead = true;
	                } else if(this.gameMap[y+1][x] == '🔥')
	                {
	                	this.gameOver(); dead = true;
	                } else if(this.gameMap[y+1][x] == '📦')
	                {
	                	if(this.gameMap[y+2][x] == '⚫')
	                	{
	                		this.gameMap[y][x] = '⚫';
	                		this.gameMap[y+1][x] = '👤';
	                		this.gameMap[y+2][x] = '📦';
	                	} else
	                	{
	                		this.gameMap[y][x] = '👤';
	                	}
	                } else if(this.gameMap[y+1][x] == '🔒')
	                {
	                	this.gameMap[y][x] = '👤';
	                } else if(this.gameMap[y+1][x] == '🔑')
	                {
	                	this.gameMap[y][x] = '⚫';
	                	this.gameMap[y+1][x] = '👤';
	                	this.key = true;
	                }
	            } else if (reaction.emoji.name === '🔄') //restart level
	            {
	            	this.generateLevel();
	            }

	            reaction.users.remove(reaction.users.cache.filter(user => user.id !== this.gameEmbed.author.id).first().id).then(() =>
	            {
	            	if(dead == false)
	            	{
	            		this.step();
	            	}
	            });
	        })
	        .catch(collected => 
	        {
	        	console.log("timeout");
	            this.gameOver();
	        });
	}
}

module.exports = EscapeGame;
