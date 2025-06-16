const Discord = require("discord.js");
const bot = new Discord.Client();
require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");
const SpaceGame = require("./spaceGame");
const Connect4Game = require("./connect4");
const CarGame = require("./coolCar");
const EscapeGame = require("./escapeGame")
const PREFIX = ">";

const spaceGame = new SpaceGame(bot);
const connect4Game = new Connect4Game(bot);
const carGame = new CarGame(bot);
const escapeGame = new EscapeGame(bot);

//BOT COMMANDS
bot.on("ready", () =>
{
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity("Minecraft | >help");
});

bot.on("message", (message) =>
{
    if (!message.content.startsWith(PREFIX)) return;
    if (message.author.bot) return;

    if(message.content === ">hello")
    {
        message.channel.send("Hello.");
    } else if(message.content === ">help")
    {
        message.channel.send("Here are all the commands I can respond to, commands have a prefix '>'");
        message.channel.send
        (":white_small_square: `>hello` -> Respond hello\n" + 
            ":white_small_square: `>rand` -> Show random number\n" +
            ":white_small_square: `>rpc [rock, paper, scissors]` -> Play a rock paper scissors game.\n" +
            ":white_small_square: `>play space` -> Play a space game.\n" +
            ":white_small_square: `>play car` -> Play a cool car game.\n" +
            ":white_small_square: `>play connect4` -> Play Connect 4 game.\n" +
	        ":white_small_square: `>play escape` -> Play escape game.\n" +
            ":white_small_square: `>changelogs` -> Displays changes or new features added to the bot.\n" +
            ":white_small_square: `>plus` -> Displays information about the bot."
        );
    } else if(message.content === ">rand")
    {
        var random = Math.floor(Math.random() * (100 - 1)) + 1;
        message.channel.send(random);
    } else if(message.content === ">rpc")
    {
        message.channel.send(":warning: No, you must add [paper, rock or scissors] in the command !")
    }else if(message.content === ">rpc paper")
    {
        var guess = Math.floor(Math.random() * (4 - 1)) + 1;
        if(guess == 3){ message.channel.send(":punch: You won."); }
        if(guess == 2){ message.channel.send(":raised_hand: Equality."); }
        if(guess == 1){ message.channel.send(":v: You lost."); }
    } else if(message.content === ">rpc scissors")
    {
        var guess = Math.floor(Math.random() * (4 - 1)) + 1;
        if(guess == 3){ message.channel.send(":punch: You lost."); }
        if(guess == 2){ message.channel.send(":raised_hand: You won."); }
        if(guess == 1){ message.channel.send(":v: Equality."); }
    } else if(message.content === ">rpc rock")
    {
        var guess = Math.floor(Math.random() * (4 - 1)) + 1;
        if(guess == 3){ message.channel.send(":punch: Equality."); }
        if(guess == 2){ message.channel.send(":raised_hand: You lost."); }
        if(guess == 1){ message.channel.send(":v: You won."); }
    } else if(message.content === ">changelogs")
    {
        message.channel.send
        (
        	"**Update 9**\n- Updated Space Game\n- Added a new game called 'Cool Car Game'"
        );
    } else if(message.content === ">plus")
    {
    	message.channel.send("**Host :** Heroku\n**Language :** Node.js");
    } else if (message.content === ">play space")
    {
        spaceGame.newGame(message);
        
    } else if (message.content === ">play connect4")
    {
        connect4Game.newGame(message);
    } else if (message.content === ">play car")
    {
        carGame.newGame(message);
    } else if (message.content === ">play escape")
    {
        escapeGame.newGame(message);
    }
});

bot.login(process.env.TOKEN);
