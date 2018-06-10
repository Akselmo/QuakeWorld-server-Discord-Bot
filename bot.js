
// Import the discord.js module
const Discord = require('discord.js');

//Import quakeworld module
const quakeworld = require('quakeworld');

// Create an instance of a Discord client
const client = new Discord.Client();

// The token of your bot - https://discordapp.com/developers/applications/me
const token = 'TOKEN';

var hostname = "";
var serveripfull = "Your server ip and port, to show where to connect in Discord";
var mode = "";
var map = "";
var playerstotal = "";
var player = [];
var spectator = [];
var playerString = "";
var spectatorString = "";
var amountPlayers = 0;
var amountSpectators = 0;

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//Check the messages user send
client.on('message', message =>
{
  //Do nothing if message is from a bot
  if (message.author.bot) return;

  //If message has !qserver (And only "!qserver")
  if (message.content === '!qserver') 
  {
    //Check if user has permissions
    //Default rolename is "Quakemod". You can add more roles to the array if you wish!
    if(!message.member.roles.some(r=>["Quakemod"].includes(r.name)))
    {
      return message.reply("Sorry, you don't have permissions to use this!");
    }

    //Look for data
    //Set your server ip and port here
    quakeworld('QUAKESERVERIP', QUAKESERVERPORT, 'status', [31], function (err, data)
    {
      console.log("Reloading data!");

      //Don't remove these, we have to refresh the data every time so nothing gets stuck
      hostname = "";
      mode = "";
      map = "";
      playerstotal = "";
      player = [];
      spectator = [];
      playerString = "";
      spectatorString = "";
      amountPlayers = 0;
      amountSpectators = 0;

      //Error handling
      if (err) 
      {
        console.log('ERROR: ', err);
      }

      //Hostname
      hostname = data.hostname;

      //Map
      map = data.map;

      //Teamplay or FFA
      if (data.teamplay == null)
      {
        mode = 'FFA';
      }
      else if (data.teamplay == '4')
      {
        mode = 'CTF';
      }
      else if (data.teamplay == '2')
      {
        mode = 'TDM';
      }
      else
      {
        mode = 'Unlisted';
      }

      //If no players, set first player and first spectator text
      if (data.players === null)
      {
        player[0] = "No players.";
        spectator[0] = "No spectators.";
      }

      //Check players and spectators
      else if (data.players != null)
      {
        //Go through all players
        for (var i = 0; i < data.players.length; i++)
        {
          //If player is not spectator
          if (data.players[i].frags != 'S')
          {
            var team;
            //Check if teamplay is on
            if (data.teamplay != null)
            {
              //Add players team
              team = "Team: " + data.players[i].team;
            }
            else 
            {
              //No team
              team = '';
            }
            //Add player to array
            player[i] = '' + data.players[i].name + ' | Frags: ' + data.players[i].frags + ' | Ping: ' + data.players[i].ping + team;
          }
        }

        //Look through the list again for spectators
        for (var i = 0; i < data.players.length; i++)
        {
          //If player is spectator
          if (data.players[i].frags === 'S')
          {
            //Add player to array
            spectator[i] = '' + data.players[i].name;
          }
        }
      }

      //Make the player array into a spring
      player.join('').split(''); 
      for (var i = 0; i < player.length; i++)
      {
        if (player[i] === undefined)
        {
          //Do nothing
        }
        else
        {
          //Add players to playerstring, also raise amount of players by one
          playerString += "" + player[i].toString() + "\n";
          amountPlayers++;
        }
      }

      //Make spectator array into a string
      spectator.join('').split(''); 
      for (var i = 0; i < spectator.length; i++)
      {
        if (spectator[i] === undefined)
        {
          //Do nothing
        }
        else
        {
          //Add spectators to spectatorstring, also raise amount of spectators by one
          spectatorString += "" + spectator[i].toString() + "\n";
          amountSpectators++;
        }
      }

      //Total players is amount of players. Max players is maximum clients minus spectators
      playerstotal = "" + amountPlayers + "/" + (data.maxclients - data.maxspectators);

      //If undefined, no players
      if (playerString === undefined || playerString === null || playerString === "")
      {
        playerString = "No players!";
        spectatorString = "No spectators!";
      }

      //Total players into string
      playerstotal = playerstotal.toString();

      console.log('Done reloading data!');
      console.log(playerString);
      console.log(spectatorString);

      //Message continues here
      //STRINGS CAN NOT BE EMPTY! Even if string is "", it will crash the bot. 
      //To avoid this, make string to have somekind of text or symbol. " " should work, for example.
      message.channel.send({embed: 
      {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
          },
          title: hostname,
          description: serverip,
          fields: [{
              name: "Map",
              value: map
            },
            {
              name: "Mode",
              value: mode
            },
            {
              name: "Players (" + playerstotal + ")",
              value: playerString
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "Last updated: "
          }
        }
      });
    });
  }
});

// Log our bot in
client.login(token);

