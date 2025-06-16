const Discord = require("discord.js");
const fs = require("fs");

//FALLEN WORLD VARS
let data = JSON.parse(fs.readFileSync("./data.json", "utf8"));

class FallenWorld
{
	constructor()
	{
		this.temperature = 20; //min: 10 & max: 40
		this.radioactivity = 3;
	}

	update()
	{
		var r = Math.random();
		if(r < 0.5)
			this.temperature++;
		else
			this.temperature--;

		if(this.temperature > 40)
			this.temperature = 40;
		else if (this.temperature < 10)
			this.temperature = 10;
	}

	newEnergy()
	{
		for(var a in data)
		{
			if(data[a].egy < 30)
				data[a].egy++;
			fs.writeFile("./data.json", JSON.stringify(data), (err) =>
			{
    			if (err) console.error(err)
  			});
		}
	}

	newGame(message)
	{
		this.update();
		let id = message.author.id;

		data[id] = 
    	{
    		mny: 500,
    		fd: 100,
    		wt: 100,
    		mdc: 100,
    		ppl: 15,
    		wpn: 100,
    		rml: 100,
    		vgt: 100,
    		egy: 30
    	};

		fs.writeFile("./data.json", JSON.stringify(data), (err) =>
		{
    		if (err) console.error(err)
  		});

		const embed = new Discord.MessageEmbed()
        	.setColor("#4F4F4F")
        	.setTitle("Fallen World")
        	.setDescription(":boom: Your village has been successfully destroyed and your progress has been reset.\n:house: You are now the manager of a new village.")
        	.setTimestamp();

    	message.channel.send(embed).then(emsg =>
    	{
        	this.gameEmbed = emsg;
    	});
	}

	info(message)
	{
		this.update();
		let id = message.author.id;
		var str;
		if (!data[id])
		{
			str = ":leaves: Hmmm, looks like you don't have a village. Use `>fw newgame` to create your village.";
		} else
		{
			let ppl = data[id].ppl;
			let mny = data[id].mny;
			let fd = data[id].fd;
			let wt = data[id].wt;
			let mdc = data[id].mdc;
			let wpn = data[id].wpn;
			let rml = data[id].rml;
			let vgt = data[id].vgt;
			let egy = data[id].egy;
			str = `:large_orange_diamond: **__Village of <@${id}>__** :large_orange_diamond:\n\n`;

			if(ppl > 10000)
				str += "**Status :** *Town*\n\n";
			else if(ppl > 5000)
				str += "**Status :** *Small town*\n\n";
			else if(ppl > 1000)
				str += "**Status :** *Big village*\n\n";
			else if(ppl > 500)
				str += "**Status :** *Village*\n\n";
			else if(ppl > 250)
				str += "**Status :** *Small village*\n\n";
			else if(ppl > 100)
				str += "**Status :** *Locality*\n\n";
			else
				str += "**Status :** *Hamlet*\n\n";

			str +=
			`:bust_in_silhouette: **People :** *${ppl}*\n` +
			`:dollar: **Money :** *${mny}*\n` +
			`:poultry_leg: **Food :** *${fd}*\n` +
			`:droplet: **Water :** *${wt}*\n` +
			`:pill: **Medicine :** *${mdc}*\n` +
			`:axe: **Weapons :** *${wpn}*\n` +
			`:bricks: **Raw material :** *${rml}*\n` +
			`:herb: **Vegetation :** *${vgt}*\n\n` +
			`:zap: **Energy left :** *${egy}* (+1 every 10 minutes)\n` +
			`:thermometer: **Temperature :** *${this.temperature}°C*\n` +
			`:radioactive: **Radioactivity :** *${this.radioactivity} Bq*`;
		}

		const embed = new Discord.MessageEmbed()
        	.setColor("#4F4F4F")
        	.setTitle("Fallen World")
        	.setDescription(str)
        	.setTimestamp()
        	.setThumbnail(message.author.avatarURL());

		message.channel.send(embed).then(emsg =>
    	{
        	this.gameEmbed = emsg;
    	});
	}

	updateStats(id, ppl, mny, fd, wt, mdc, wpn, rml, vgt, egy)
	{
		data[id] = 
    	{
    		mny: data[id].mny += mny,
    		fd: data[id].fd += fd,
    		wt: data[id].wt += wt,
    		mdc: data[id].mdc += mdc,
    		ppl: data[id].ppl += ppl,
    		wpn: data[id].wpn += wpn,
    		rml: data[id].rml += rml,
    		vgt: data[id].vgt += vgt,
    		egy: data[id].egy += egy
    	};
    	fs.writeFile("./data.json", JSON.stringify(data), (err) =>
		{
    		if (err) console.error(err)
  		});
	}

	expedition(message)
	{
		if (!data[message.author.id])
		{
			message.channel.send("You don't have a village !")
			return;
		}

		if(data[message.author.id].egy <= 1)
		{
			message.channel.send("You don't have enough energy !");
			return;
		}

		let str = "";
		let newPeople = 0;
		let newFood = 0;
		let newWater = 0;
		let newMedicine = 0;
		let newWeapons = 0;
		let newMaterials = 0;

		str = ":footprints: You send explorers to the northern forest.\n\n";
		let r1 = Math.floor(Math.random() * (50 - -20) + -20); //food
		newFood = r1;
		if(r1 < 0)
			str += `:fork_knife_plate: The explorers quickly ran out of food during their exploration.\n\n`;
		else
			str += `:canned_food: The explorers found an abandoned car in the forest where they could find ${r1} cans.\n\n`;

		let r2 = Math.floor(Math.random() * (50 - -20) + -20); //water
		newWater = r2;
		if(r2 < 0)
			str += `:ice_cube: Due to a great heat in the forest, the explorers quickly ran out of water\n\n`;
		else
			str += `:basket: Thanks to the rain, the explorers put rain collectors on the branches of the trees to collect water.\n\n`;

		let r3 = Math.floor(Math.random() * (40 - -20) + -20); //medicine
		newMedicine = r3;
		if(r3 < 0)
			str += `:boar: The explorers came face to face with a group of wild boars next to an abandoned village. Despite some injuries, the explorers were able to eat the meat of wild boars.\n\n`;
		else
			str += `:house_abandoned: The explorers passed through an abandoned village and were able to collect some medicine. They then had to leave quickly because of suspicious noises.\n\n`;

		let r4 = Math.floor(Math.random() * (40 - -20) + -20); //weapons
		newWeapons = r4;
		if(r4 < 0)
			str += `:detective: While fleeing from the village, the explorers were pursued by other heavily armed survivors and had to give up all their weapons.\n\n`;
		else
			str += `:knife: The explorers find some weapons including knives and guns near the village in boxes which probably belong to other survivors.\n\n`;

		let r5 = Math.floor(Math.random() * (40 - 5) + 5); //materials
		newMaterials = r5;
		str += `:wood: On the way back the explorers cut down some trees in order to obtain wood.\n\n`;

		let r6 = Math.floor(Math.random() * 5);
		switch(r6)
		{
			case 0:
				str += ":white_check_mark: The explorers returned home without injuries.\n\n"; 
				newPeople = 0; break;
			case 1:
				str += ":adhesive_bandage: The explorers returned home without any loss but with some injuries.\n\n";
				newPeople = 0; break;
			case 2:
				str += ":snake: One of the explorers was bitten by a snake during the exploration. The venom has spread through the blood so much that it is impossible to save it.\n\n";
				newPeople = -1; break;
			case 3:
				str += ":question: The explorers mysteriously disappeared on the way back. No resources could be recovered and the explorers were not found.\n\n";
				newPeople = -5; newFood = -10; newWater = -10; newMedicine = -10; newWeapons = -10; newMaterials = 0; break;
			case 4:
				str += ":nut_and_bolt: The explorers returned and found some metal parts on the way back.\n\n";
				newMaterials += 15; break;
		}

		str += `**Assessment :**\n` +
		`- :bust_in_silhouette: **${newPeople} people**\n` + `- :poultry_leg: **${newFood} food**\n` +
		`- :droplet: **${newWater} water**\n` + `- :pill: **${newMedicine} medicine**\n` +
		`- :axe: **${newWeapons} weapons**\n` + `- :bricks: **${newMaterials} raw materials**`;

		this.updateStats(message.author.id, newPeople, 0, newFood, newWater, newMedicine, newWeapons, newMaterials, 0, -2);

		const embed = new Discord.MessageEmbed()
        	.setColor("#4F4F4F")
        	.setTitle("Fallen World Expedition (-2 energy)")
        	.setDescription(str)
        	.setTimestamp()
        	.setThumbnail("https://i.imgur.com/ypp3K5a.png");
		message.channel.send(embed).then(emsg =>
    	{
        	this.gameEmbed = emsg;
    	});
    	this.checkIfDeath(message);
	}

	event(message)
	{
		if (!data[message.author.id])
		{
			message.channel.send("You don't have a village !")
			return;
		}

		if(data[message.author.id].egy <= 0)
		{
			message.channel.send("You don't have enough energy !");
			return;
		}

		let r = Math.floor(Math.random() * 31);
		let str = "";

		switch(r)
		{
			//id, ppl, mny, fd, wt, mdc, wpn, rml, vgt, egy
			case 0:
				str = ":exclamation: Strangers have arrived at your village, they ask for help because a friend of theirs is injured.\n\n" +
				":trident: You decide to help them by offering them bandages and medicine. To thank you, they offer you fresh water and some weapons.\n\n" +
				"**Gained resources :**\n:droplet: **+15 water**\n:axe: **+15 weapons**\n\n" +
				"**Lost resources :**\n:pill: **-15 medicine**";
				this.updateStats(message.author.id, 0, 0, 0, 15, 0, -15, 15, 0, -1); break;
			case 1:
				str = ":exclamation: Acid rain seems to fall on the village.\n\n\n" +
				":cloud_rain: The acid rain severely damages the plants in the village. The villagers do their best to try to cover the gardens.\n\n\n" +
				"**Gained resources :**\nnone\n\n" +
				"**Lost resources :**\n:herb: **-20 vegetation**";
				this.updateStats(message.author.id, 0, 0, 0, 0, 0, 0, 0, -20, -1); break;
			case 2:
				str = ":exclamation: A fire breaks out in a small house in the village;\n\n" +
				":fire: The inhabitants hurry quickly to put out the fire. The fire does not cause any casualties but burns all the materials inside.\n\n" +
				"**Gained resources :**\nnone\n\n" +
				"**Lost resources :**\n:bricks: **-20 raw material**";
				this.updateStats(message.author.id, 0, 0, 0, 0, 0, 0, -20, 0, -1); break;
			case 3:
				str = ":exclamation: While digging in his garden, an inhabitant comes across a cave.\n\n" +
				":pick: The cave contains a large number of coal and copper. Very good materials.\n\n" +
				"**Gained resources :**\n:bricks: **+50 raw material**\n\n" +
				"**Lost resources :**\n:dollar: **-10 money**";
				this.updateStats(message.author.id, 0, -10, 0, 0, 0, 0, 50, 0, -1); break;
			case 4:
				str = ":exclamation: Some of your inhabitants are said to be involved in arms trafficking with enemies.\n\n" +
				":construction: You decide to intervene and banish the culprits from the village.\n\n" +
				"**Gained resources :**\n:axe: **+10 weapons**\n:dollar: **+20 money**\n\n" +
				"**Lost resources :**\n:bust_in_silhouette: **-2 people**";
				this.updateStats(message.author.id, -2, 20, 0, 0, 0, 10, 0, 0, -1); break;
			case 5:
				str = "exclamation: Refugees arrived at your village asking if you could welcome them. Their town was reportedly bombarded by warplanes from southern countries.\n\n" +
				":tent: You agree to take them to your home in exchange for a large sum of money.\n\n"
				"**Gained resources :**\n:bust_in_silhouette: **+5 people**\n:dollar: **+50 money**\n\n" +
				"**Lost resources :**\n:droplet: **-15 water**";
				this.updateStats(message.author.id, 5, 50, 0, -15, 0, 0, 0, 0, -1); break;
			case 6:
				str = ":exclamation: Thefts have taken place in your village, money and food have been stolen.\n\n" +
				":page_facing_up: You decide to investigate the culprit.\n\n" +
				"**Gained resources :**\nnone\n\n" +
				"**Lost resources :**\n:dollar: **-25 money**\n:poultry_leg: **-15 food**";
				this.updateStats(message.author.id, 0, -25, -15, 0, 0, 0, 0, 0, -1); break;
			case 7:
				str = ":exclamation: A van drives around your village in a circle provoking the locals.\n\n" +
				":truck: You decide to intervene with weapons, the man inside the van seems to be drunk, you decide to imprison him.\n\n" +
				"**Gained resources :**\n:bricks: **+20 raw material**\n\n" +
				"**Lost resources :**\n:axe: **-10 weapons**";
				this.updateStats(message.author.id, 0, 0, 0, 0, 0, -10, 20, 0, -1); break;
			case 8:
				str = ":exclamation: While digging in his garden, an inhabitant falls into a hole filled with water that appears to be drinkable.\n\n" +
				":ocean: You decide to use for your village.\n\n" +
				"**Gained resources :**\n:droplet: **+60 water**\n\n" +
				"**Lost resources :**\n:dollar: **-20 money**";
				this.updateStats(message.author.id, 0, -20, 0, 60, 0, 0, 0, 0, -1); break;
			case 9:
				str = ":exclamation: Several residents are injured while working.\n\n" +
				":adhesive_bandage: You decide to heal them\n\n" +
				"**Gained resources :**\n:dollar: **+10 money**\n\n" +
				"**Lost resources :**\n:pill: **-10 medicine**";
				this.updateStats(message.author.id, 0, 10, 0, 0, -10, 0, 0, 0, -1); break;
			case 10:
				str = ":exclamation: Flooding occurs in some areas of the village due to heavy rains.\n\n" +
				":ocean: The floods make some buildings unusable and make access to equipment very hard.\n\n" +
				"**Gained resources :**\nnone\n\n" +
				"**Lost resources :**\n:bricks: **-25 raw material**\n:dollar: **-25 money**";
				this.updateStats(message.author.id, 0, -25, 0, 0, 0, 0, -25, 0, -1); break;
			case 11:
				str = ":wolf: Rabid wolves enter the village and bite several residents.\n\n" +
				":x: Bitten residents show symptoms of fatigue, headaches, chills and fever.\n\n" +
				"**Gained resources :**\nnone\n\n" +
				"**Lost resources :**\n:pill: **-25 medicine**";
				this.updateStats(message.author.id, 0, 0, 0, 0, -25, 0, 0, 0, -1); break;
			case 12:
				str = ":full_moon: During the night, you hear an explosion that wakes up a large part of the village. You see a car heading towards the forest at full speed.\n\n" +
				":fire: The explosion destroys part of a small house and kills one. The bomb was probably dropped overnight by an enemy.\n\n" +
				"**Gained resources :**\nnone\n\n" +
				"**Lost resources :**\n:bust_in_silhouette: **-1 people**\n:bricks: **-30 raw material**";
				this.updateStats(message.author.id, -1, 0, 0, 0, 0, 0, -30, 0, -1); break;
			case 13:
				str = ":cow: The cows in your village have started to produce blood instead of milk.\n\n" +
				":fallen_leaf: This has big consequences for your village.\n\n" +
				"**Gained resources :**\nnone\n\n" +
				"**Lost resources :**\n:herb: **-50 vegetation**";
				this.updateStats(message.author.id, 0, 0, 0, 0, 0, 0, 0, -50, -1); break;
			case 14:
				str = ":busts_in_silhouette: A group of survivors arrive in your village. They are working on a project to rehabilitate some irradiated towns but they lack funds.\n\n" +
				":people_hugging: You decide to help them by giving them money, in exchange they offer you food and water.\n\n" +
				"**Gained resources :**\n:poultry_leg: **+40 food**\n:droplet: **+40 water**\n\n" +
				"**Lost resources :**\n:dollar: **-75 money**";
				this.updateStats(message.author.id, 0, -75, 40, 40, 0, 0, 0, -0, -1); break;
			case 15:
				str = ":microscope: One of your residents who is a former biologist found a cure for one of the epidemics of this world.\n\n" +
				":test_tube: You give the treatment to all your residents for immunity to this disease.\n\n" +
				"**Gained resources :**\n:pill: **+35 medicine**\n\n" +
				"**Lost resources :**\nnone";
				this.updateStats(message.author.id, 0, 0, 0, 0, 35, 0, 0, 0, -1); break;
			case 16:
				str = ":rice_scene: Your gardeners are starting to use pesticides in their gardens.\n\n" +
				":carrot: They improve the production of food and trade, but despite this they harm the environment.\n\n" +
				"**Gained resources :**\n:dollar: **+25 money**\n:poultry_leg: **+30 food**\n\n" +
				"**Lost resources :**\n:herb: **-35 vegetation**";
				this.updateStats(message.author.id, 0, 25, 30, 0, 0, 0, 0, -40, -1); break;
			case 17:
				str = ":bread: Restaurant owners in your village are often criticized for making bad meals.\n\n" +
				":pizza: You decide to invest money to better train cooks in order to better satisfy your people.\n\n" +
				"**Gained resources :**\n:poultry_leg: **+20 food**\n\n" +
				"**Lost resources :**\n:dollar: **-50 money**";
				this.updateStats(message.author.id, 0, -50, 20, 0, 0, 0, 0, 0, -1); break;
			case 18:
				str = ":syringe: A drug is sold illegally in the village. You decide to intervene.\n\n" +
				":shield: You decide to punish the people havinv consumed the drug, some people run from the village.\n\n" +
				"**Gained resources :**\n:pill: **+25 medicine**\n\n" +
				"**Lost resources :**\n:bust_in_silhouette: **-3 people**";
				this.updateStats(message.author.id, -3, 0, 20, 0, 25, 0, 0, 0, -1); break;
			case 19:
				str = ":fire: A forest fire appears. He burns the trees and he is unstoppable.\n\n" +
				":cloud_rain: Fortunately a rain greatly reduces the fire, the residents of your village use water to extinguish the remains of the fire. Despite everything, the fire devastated the forest greatly.\n\n" +
				"**Gained resources :**\nnone\n\n" +
				"**Lost resources :**\n:droplet: **-25 water**\n:herb: **-65 vegetation**";
				this.updateStats(message.author.id, 0, 0, 0, -25, 0, 0, 0, -65, -1); break;
			case 20:
				str = ":package: Your residents have found an old store of seeds near the village.\n\n" +
				":ear_of_rice: This allows more plants to be planted.\n\n" +
				"**Gained resources :**\n:herb: **+30 vegetation**\n\n" +
				"**Lost resources :**\nnone";
				this.updateStats(message.author.id, 0, 0, 0, 0, 0, 0, 0, 30, -1); break;
			case 21:
				str += ":radio: You receive a mysterious radio signal coming from the northern forest.\n\n" +
				":mag: You try to decode it and you get the following letters: I .. T ... I .. S ... C .. O .. M .. I .. N .. G ..\n\n" +
				"**Gained resources :**\nnone\n\n" +
				"**Lost resources :**\nnone";
				this.updateStats(message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, -1); break;
			case 22:
				str += ":satellite: A group of survivors need equipment to set up a telecommunication system between villages.\n\n" +
				":gear: You decide to help them by giving them some of your material.\n\n";
				"**Gained resources :**\nnone\n\n" +
				"**Lost resources :**\n:bricks: **-15 raw material**";
				this.updateStats(message.author.id, 0, 0, 0, 0, 0, 0, -15, 0, -1); break;
			case 23:
				str += ":family_man_boy: Children in your village need education. You decide to look for educational books for children.\n\n" +
				":closed_book: After several hours of research you find some old math and physics textbooks. Your villagers are willing to pay for them.\n\n" +
				"**Gained resources :**\n:dollar: **+20 money**\n\n" +
				"**Lost resources :**\nnone";
				this.updateStats(message.author.id, 0, 20, 0, 0, 0, 0, 0, 0, -1); break;
			case 24:
				str += ":hamburger: Rumors are spreading in your village that you keep food for yourself.\n\n" +
				":eye: You decide to donate food to residents in order to silence the rumors.\n\n" +
				"**Gained resources :**\nnone\n\n" +
				"**Lost resources :**\n:poultry_leg: **-20 food**";
				this.updateStats(message.author.id, 0, 0, -20, 0, 0, 0, 0, 0, -1); break;
			case 25:
				str += ":cockroach: Residents complain of giant cockroaches in their homes. They threaten to leave the village if this continues.\n\n" +
				":squeeze_bottle: You decide to get rid of these cockroaches by buying anti cockroach products from other villages.\n\n" +
				"**Gained resources :**\nnone\n\n" +
				"**Lost resources :**\n:dollar: **-25 money**";
				this.updateStats(message.author.id, 0, -25, 0, 0, 0, 0, 0, 0, -1); break;
			case 26:
				str += ":video_game: A resident has found an old box full of video game consoles, he asks to be paid to distribute it to the residents.\n\n" +
				":thumbsup: You accept the offer. Video games keep more residents entertained.\n\n" +
				"**Gained resources :**\n:bust_in_silhouette: **+2 people**\n\n" +
				"**Lost resources :**\n:dollar: **-30 money**";
				this.updateStats(message.author.id, 2, -30, 0, 0, 0, 0, 0, 0, -1); break;
			case 27:
				str += ":tulip: The sources of many rivers have turned into swamps.\n\n" +
				":dash: You decide to spend a large amount of money so that your residents can sanitize these areas.\n\n" +
				"**Gained resources :**\n:herb: **+40 vegetation**\n\n" +
				"**Lost resources :**\n:dollar: **-50 money**";
				this.updateStats(message.author.id, 0, -50, 0, 0, 0, 0, 0, 40, -1); break;
			case 28:
				str += ":candle: Religious fanatics have attacked one of the areas of your village.\n\n" +
				":no_entry: You send your soldiers to intervene.\n\n" +
				"**Gained resources :**\n:dollar: **+20 money**\n\n" +
				"**Lost resources :**\n:axe: **-10 weapons**";
				this.updateStats(message.author.id, 0, 20, 0, 0, 0, -10, 0, 0, -1); break;
			case 29:
				str += ":microscope: A group of researchers would like to make experiments with seeds to be able to make the plants more resistant.\n\n" +
				":moneybag: These researchers ask you to pay in order to continue the experiments.\n\n" +
				"**Gained resources :**\n:herb: **+35 vegetation**\n\n" +
				"**Lost resources :**\n:dollar: **-20 money**";
				this.updateStats(message.author.id, 0, -20, 0, 0, 0, 0, 0, 35, -1); break;
			case 30:
				str += ":anger: Several residents complain of frequent headaches while working.\n\n" +
				":stethoscope: You decide to offer them more medicine.\n\n" +
				"**Gained resources :**\nnone\n\n" +
				"**Lost resources :**\n:pill: **-10 medicine**";
				this.updateStats(message.author.id, 0, 0, 0, 0, -10, 0, 0, 0, -1); break;
		}

		const embed = new Discord.MessageEmbed()
        	.setColor("#4F4F4F")
        	.setTitle("Fallen World Event (-1 energy)")
        	.setDescription(str)
        	.setTimestamp()
        	.setThumbnail("https://i.imgur.com/rsFPGhM.jpg");
		message.channel.send(embed).then(emsg =>
    	{
        	this.gameEmbed = emsg;
    	});
    	this.checkIfDeath(message);
	}

	work(message)
	{
		let str = "";
		let id = message.author.id;

		if (!data[id])
		{
			message.channel.send("You don't have a village !")
			return;
		}

		if(data[id].egy <= 2)
		{
			message.channel.send("You don't have enough energy !");
			return;
		}

		let newmoney = data[id].ppl * 4;
		let lostFood = data[id].ppl;
		let lostWater = Math.floor(data[id].ppl * (this.temperature / 10) + 5);

		this.updateStats(id, 0, newmoney, -lostFood, -lostWater, 0, 0, 0, 0, -3);

		str = "**You made people work in your village to get money.**\n:warning: Be careful, when the temperature is high, your workers drink more !\n\n" +
		`**Gained resources :**\n:dollar: **+${newmoney} money**\n\n` +
		`**Lost resources :**\n:poultry_leg: **-${lostFood} food**\n:droplet: **-${lostWater} water**`;

		const embed = new Discord.MessageEmbed()
        	.setColor("#4F4F4F")
        	.setTitle("Fallen World Work (-3 energy)")
        	.setDescription(str)
        	.setTimestamp()
        	.setThumbnail("https://d3h6k4kfl8m9p0.cloudfront.net/stories/iiitXy-O.Cx.IJTEWrUwhQ.jpg");
		message.channel.send(embed).then(emsg =>
    	{
        	this.gameEmbed = emsg;
    	});
    	this.checkIfDeath(message);
	}

	expand(message)
	{
		let str = "";
		let id = message.author.id;

		if (!data[id])
		{
			message.channel.send("You don't have a village !")
			return;
		}

		if(data[id].egy <= 3)
		{
			message.channel.send("You don't have enough energy !");
			return;
		}

		let newPeople = Math.floor(Math.random() * 10) + 1;

		this.updateStats(id, newPeople, -100, 0, 0, 0, 0, -80, -25, -4);

		str = "You've built more houses to accommodate people.\n\n" +
		`**Gained resources :**\n:bust_in_silhouette: **+${newPeople} people**\n\n` +
		`**Lost resources :**\n:dollar: **-100 money**\n:bricks: **-80 raw material**\n:herb: **-25 vegetation**`;

		const embed = new Discord.MessageEmbed()
        	.setColor("#4F4F4F")
        	.setTitle("Fallen World Expansion (-4 energy)")
        	.setDescription(str);
		message.channel.send(embed).then(emsg =>
    	{
        	this.gameEmbed = emsg;
    	});
    	this.checkIfDeath(message);
	}

	plant(message)
	{
		let str = "";
		let id = message.author.id;

		if (!data[id])
		{
			message.channel.send("You don't have a village !")
			return;
		}

		if(data[id].egy <= 1)
		{
			message.channel.send("You don't have enough energy !");
			return;
		}

		this.updateStats(id, 0, -40, 0, -20, 0, 0, 0, +25, -2);

		str = ":deciduous_tree: You have planted more trees to improve cultivation in your village.\n\n" +
		`**Gained resources :**\n:herb: **+25 vegetation**\n\n` +
		`**Lost resources :**\n:dollar: **-40 money**\n:droplet: **-20 water**`;

		const embed = new Discord.MessageEmbed()
        	.setColor("#4F4F4F")
        	.setTitle("Fallen World Planting (-2 energy)")
        	.setDescription(str)
        	.setTimestamp()
        	.setThumbnail("https://teslaphilippines.com/wp-content/uploads/2020/05/teslaphilippines.planting-trees.jpg");
		message.channel.send(embed).then(emsg =>
    	{
        	this.gameEmbed = emsg;
    	});
    	this.checkIfDeath(message);
	}

	cultivate(message)
	{
		let str = "";
		let id = message.author.id;

		if (!data[id])
		{
			message.channel.send("You don't have a village !")
			return;
		}

		if(data[id].egy <= 0)
		{
			message.channel.send("You don't have enough energy !");
			return;
		}

		let newFood = Math.floor(data[id].vgt / 50);
		this.updateStats(id, 0, 0, newFood, 0, 0, 0, 0, 0, -1);

		str = `:apple: Thanks to ${data[id].vgt} vegetations, you were able to cultivate ${newFood} fruits.\n\n` +
		`**Gained resources :**\n:poultry_leg: **+${newFood} food**`;

		const embed = new Discord.MessageEmbed()
        	.setColor("#4F4F4F")
        	.setTitle("Fallen World Cultivation (-1 energy)")
        	.setDescription(str)
        	.setTimestamp()
        	.setThumbnail("https://static.langimg.com/thumb/msid-72272073,width-540,resizemode-4/samayam-tamil.jpg");
		message.channel.send(embed).then(emsg =>
    	{
        	this.gameEmbed = emsg;
    	});
    	this.checkIfDeath(message);
	}

	riverwater(message)
	{
		let str = "";
		let id = message.author.id;

		if (!data[id])
		{
			message.channel.send("You don't have a village !")
			return;
		}

		if(data[id].egy <= 0)
		{
			message.channel.send("You don't have enough energy !");
			return;
		}

		let deadPeople = 0;
		let nstr = "";

		let r = Math.floor(Math.random() * 10);
		if(r == 2)
		{
			deadPeople = 10;
			nstr = ":microbe: **A cholera epidemic appears in your village which causes the death of at least 10 people.**\n\n";
		}

		this.updateStats(id, -deadPeople, 0, 0, 25, 0, 0, 0, 0, -1);
		str = ":park: You have allowed your inhabitants to drink water from the river knowing the risks.\n\n" + nstr +
		"**Gained resources :**\n:droplet: **+25 water**"

		const embed = new Discord.MessageEmbed()
        	.setColor("#4F4F4F")
        	.setTitle("Fallen World River water harvest (-1 energy)")
        	.setDescription(str)
        	.setTimestamp()
        	.setThumbnail("https://rvahub.com/wp-content/uploads/2016/07/13712567_610475455797785_381561311_n.jpg");
		message.channel.send(embed).then(emsg =>
    	{
        	this.gameEmbed = emsg;
    	});
    	this.checkIfDeath(message);
	}

	attack(message)
	{
		let str = "";
		let id = message.author.id;
		let nop = 0;
		let sameVillage = true;
		let r;

		if (!data[id])
		{
			message.channel.send("You don't have a village !")
			return;
		}

		if(data[id].egy <= 3)
		{
			message.channel.send("You don't have enough energy !");
			return;
		}

		let keys = Object.keys(data)
		let randKey;

		while(sameVillage)
		{
			let randomValue = Math.floor(Math.random() * keys.length);
			randKey = keys[randomValue];
			if(randomValue == id)
				continue;
			else
				sameVillage = false;
		}

		str += `:crossed_swords: **You attack the village of <@${randKey}>**\n\n`;

		if(data[id].wpn > data[randKey].wpn)
		{
			str += `:green_circle: Your army managed to overthrow the enemy forces and loot the village.\n\n`;
			let newPeople = Math.floor(Math.random() * 3);
			let newMoney = Math.floor(Math.random() * 200);
			let newFood = Math.floor(data[randKey].fd / 10);
			let newWater = Math.floor(data[randKey].wt / 10);
			let newMaterial = Math.floor(data[randKey].rml / 10);
			str += `**Gained resources :**\n:dollar: **+${newMoney} money**\n:poultry_leg: **+${newFood} food**\n:droplet: **+${newWater} water**\n:bricks: **+${newMaterial} raw material**\n\n` +
			`**Lost resources :**\n:bust_in_silhouette: **-${newPeople} people**\n:axe: **-25 weapons**\n:pill: **-25 medicine**`;

			this.updateStats(id, -newPeople, newMoney, newFood, newWater, -25, -25, newMaterial, 0, -4);
		} else
		{
			str += `:red_circle: Your army has been overthrown by enemy forces.\n\n`;
			let newPeople = Math.floor(Math.random() * 20);
			str += `**Gained resources :**\nnone\n\n` +
			`**Lost resources :**\n:bust_in_silhouette: **-${newPeople} people**\n:axe: **-75 weapons**\n:pill: **-75 weapons**`;

			this.updateStats(id, -newPeople, 0, 0, 0, -75, -75, 0, 0, -4)
		}

		const embed = new Discord.MessageEmbed()
        	.setColor("#FF8B00")
        	.setTitle("Fallen World Attack (-4 energy)")
        	.setDescription(str)
        	.setTimestamp()
        	.setThumbnail("https://cdn.dvidshub.net/media/thumbs/photos/1703/3221950/1000w_q95.jpg");
		message.channel.send(embed).then(emsg =>
    	{
        	this.gameEmbed = emsg;
    	});
    	this.checkIfDeath(message);
	}

	checkIfDeath(message)
	{
		let id = message.author.id;
		let str = "";
		//ppl, mny, fd, wt, mdc, wpn, rml, vgt, egy
		if(data[id].ppl <= 0)
			str = ":skull_crossbones: All the inhabitants of your village are dead because of your decisions. You find yourself alone without hope in a cruel, dark world.\n\n\n";
		else if(data[id].mny <= 0)
			str = ":moneybag: You are overwhelmed with debts and you have no more money for your village. Your head is sold to enemy villages.\n\n\n";
		else if(data[id].fd <= 0)
			str = ":fork_knife_plate: Your village lacks food and falls into a famine. Your inhabitants are dying one by one.\n\n\n";
		else if(data[id].wt <= 0)
			str = ":ice_cube: Your village lacks water and the inhabitants quickly seize the last reserves and flee.\n\n\n";
		else if(data[id].mdc <= 0)
			str = ":test_tube: Your village is experiencing a severe pandemic from an unknown virus. You start to have a fever.\n\n\n";
		else if(data[id].wpn <= 0)
			str = ":knife: Your village falls into the hands of your enemies because of your inability to defend yourself. You are captured and executed with what remains of your inhabitants.\n\n\n";
		else if(data[id].rml <= 0)
			str = ":salt: You are running out of important materials and your villagers are unhappy about it. People start to search the trash cans to find what they lack which is bringing dangerous rats to the village.\n\n\n";
		else if(data[id].vgt <= 0)
			str = ":drop_of_blood: The level of radioactivity has exceeded the tolerance threshold. You can no longer guarantee the health of the people because of the lack of vegetation. You die in excruciating pain.\n\n\n";

		if(!str == "")
		{
			str += "__**GAME OVER**__";
			const embed = new Discord.MessageEmbed()
        		.setColor("#880000")
        		.setTitle("Fallen World Death")
        		.setDescription(str)
        		.setTimestamp();
			message.channel.send(embed).then(emsg =>
    		{
        		this.gameEmbed = emsg;
    		});
    		this.newGame(message);
		}
	}
}

module.exports = FallenWorld;
