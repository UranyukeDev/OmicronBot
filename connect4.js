const Discord = require("discord.js");

// vars
const width = 7;
const height = 7;
const gameBoard = [];
const reactions = {"1️⃣": 1, "2️⃣": 2, "3️⃣": 3, "4️⃣": 4, "5️⃣": 5, "6️⃣": 6, "7️⃣": 7};

class Connect4
{
    constructor()
    {
        this.gameEmbed = null;
        this.inGame = false;
        this.redTurn = true;
    }

    gameBoardToString()
    {
        let str = "| . 1 | . 2 | 3 | . 4 | . 5 | 6 | . 7 |\n"
        for (let y = 0; y < height; y++)
        {
            for (let x = 0; x < width; x++)
            {
                str += "|" + gameBoard[y * width + x];
            }
            str += "|\n";
        }
        return str;
    }

    newGame(msg)
    {
        if (this.inGame)
        {
            msg.channel.send(":confused: oops, looks like someone is already playing connect4. Why don't you try another game in the meantime? ");;
            return;
        }
        
        for (let y = 0; y < height; y++)
        {
            for (let x = 0; x < width; x++)
            {
                gameBoard[y * width + x] = "⚪";
            }
        }

        this.inGame = true;
        const embed = new Discord.MessageEmbed()
            .setColor("#FFA600")
            .setTitle("Connect 4")
            .setDescription(this.gameBoardToString())
            .addField("Turn :", this.getChipFromTurn())
            .setTimestamp();

        msg.channel.send(embed).then(emsg =>
        {
            this.gameEmbed = emsg;
            Object.keys(reactions).forEach(reaction => {
                this.gameEmbed.react(reaction);
            });

            this.waitForReaction();
        });
    }

    step()
    {
        this.redTurn = !this.redTurn;
        const editEmbed = new Discord.MessageEmbed()
            .setColor("#FFA600")
            .setTitle("Connect 4")
            .setDescription(this.gameBoardToString())
            .addField("Turn:", this.getChipFromTurn())
            .setTimestamp();
        this.gameEmbed.edit(editEmbed);

        this.waitForReaction();
    }

    gameOver(winner)
    {
        this.inGame = false;
        const editEmbed = new Discord.MessageEmbed()
            .setColor("#FFA600")
            .setTitle("Connect 4")
            .setDescription("GAME OVER " + this.getWinnerText(winner))
            .setTimestamp();
        this.gameEmbed.edit(editEmbed);
        this.gameEmbed.reactions.removeAll();
    }

    filter(reaction, user)
    {
        return Object.keys(reactions).includes(reaction.emoji.name) && user.id !== this.gameEmbed.author.id;
    }

    waitForReaction()
    {
        this.gameEmbed.awaitReactions((reaction, user) => this.filter(reaction, user), { max: 1, time: 300000, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first();
                const column = reactions[reaction.emoji.name] - 1;
                let placedX = -1;
                let placedY = -1;

                for (let y = height - 1; y >= 0; y--) {
                    const chip = gameBoard[column + (y * width)];
                    if (chip === "⚪") {
                        gameBoard[column + (y * width)] = this.getChipFromTurn();
                        placedX = column;
                        placedY = y;
                        break;
                    }
                }

                reaction.users.remove(reaction.users.cache.filter(user => user.id !== this.gameEmbed.author.id).first().id).then(() => {
                    if (placedY == 0)
                        this.gameEmbed.reactions.cache.get(reaction.emoji.name).remove();
                        
                    if (this.hasWon(placedX, placedY)) {
                        this.gameOver(this.getChipFromTurn());
                    }
                    else if (this.isBoardFull()) {
                        this.gameOver("TIE");
                    }
                    else {
                        this.step();
                    }
                });
            })
            .catch(collected => {
                this.gameOver("TIMEOUT");
            });
    }

    getChipFromTurn()
    {
        if (this.redTurn) {
            return "🔴";
        } else {
            return "🟡";
        }
    }

    hasWon(placedX, placedY)
    {
        const chip = this.getChipFromTurn();

        //Horizontal Check
        const y = placedY * width;
        for (var i = Math.max(0, placedX - 3); i <= placedX; i++) {
            var adj = i + y;
            if (i + 3 < width) {
                if (gameBoard[adj] === chip && gameBoard[adj + 1] === chip && gameBoard[adj + 2] === chip && gameBoard[adj + 3] === chip)
                    return true;
            }
        }

        //Verticle Check
        for (var i = Math.max(0, placedY - 3); i <= placedY; i++) {
            var adj = placedX + (i * width);
            if (i + 3 < height) {
                if (gameBoard[adj] === chip && gameBoard[adj + width] === chip && gameBoard[adj + (2 * width)] === chip && gameBoard[adj + (3 * width)] === chip)
                    return true;
            }
        }

        //Ascending Diag
        for (var i = -3; i <= 0; i++) {
            var adjX = placedX + i;
            var adjY = placedY + i;
            var adj = adjX + (adjY * width);
            if (adjX + 3 < width && adjY + 3 < height) {
                if (gameBoard[adj] === chip && gameBoard[adj + width + 1] === chip && gameBoard[adj + (2 * width) + 2] === chip && gameBoard[adj + (3 * width) + 3] === chip)
                    return true;
            }
        }

        //Descending Diag
        for (var i = -3; i <= 0; i++) {
            var adjX = placedX + i;
            var adjY = placedY - i;
            var adj = adjX + (adjY * width);
            if (adjX + 3 < width && adjY - 3 >= 0) {
                if (gameBoard[adj] === chip && gameBoard[adj - width + 1] === chip && gameBoard[adj - (2 * width) + 2] === chip && gameBoard[adj - (3 * width) + 3] === chip)
                    return true;
            }
        }

        return false;
    }

    isBoardFull()
    {
        for (let y = 0; y < height; y++)
            for (let x = 0; x < width; x++)
                if (gameBoard[y * width + x] === "⚪")
                    return false;
        return true;
    }

    getWinnerText(winner)
    {
        if (winner === "🔴" || winner === "🟡")
            return winner + " Has Won the game, congrats.";
        else if (winner == "TIE")
            return "Tie.";
        else if (winner == "TIMEOUT")
            return "The game has been interrupted due to timeout.";
    }
};

module.exports = Connect4;
