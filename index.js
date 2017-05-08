// vers 1.0.0

const format = require('./format.js');

module.exports = function EmoteOthers(dispatch) {
	
	let selectedTargetId = 0;
	let users = []; //[name, cid, race]

    const chatHook = event => {		
		let command = format.stripTags(event.message).split(' ');
		
		if (['!emote'].includes(command[0].toLowerCase())) {
			if (command.length > 2) {
				doEmote(command[1], command[2]);
			} else if (command.length == 2) {
				doEmote(selectedTargetId, command[1]);
			}			
			return false;
		} else if (['!emoteall'].includes(command[0].toLowerCase())) {
			if (command.length > 1) {
				doEmoteEveryone(command[1]);
			}
			return false;
		}
    }
    dispatch.hook('C_CHAT', 1, chatHook)	
	dispatch.hook('C_WHISPER', 1, chatHook)
  	
	// slash support
	try {
		const Slash = require('slash')
		const slash = new Slash(dispatch)
		slash.on('emote', args => args.length > 2 ? doEmote(args[1], args[2]) : doEmote(selectedTargetId, args[1]))
		slash.on('emoteall', args => doEmoteEveryone(args[1]))
	} catch (e) {
		// do nothing because slash is optional
	}
	
	//let targetId, raceId, emoteId;
	function doEmote(target, emote) {
		
		// get character id
		if (isNaN(parseInt(target))) {
			target = getUserId(target.toLowerCase());
			if (target === -1 || target === undefined) {
				systemMessage('Unable to find player');
				return false;
			}
		} else if (target === 0) {
			systemMessage('No player is selected');	
			return false;
		}
		
		// get race
		let raceId = getUserRace(target);
				
		// get emote id
		if (isNaN(parseInt(emote))) {
			emote = getEmoteId(emote.toLowerCase(), raceId);
			if (emote === -1 || emote === undefined) {
				systemMessage('Unable to find emote');
				return false;
			}
		}
	
		dispatch.toClient('S_SOCIAL', 1, { 
			target: target,
			animation: emote, 
		});
	}

	function doEmoteEveryone(emote) {
		for (let i in users) {
			if (doEmote(users[i].cid, emote) == false) {
				// break loop if doEmote cancels the process
				break;
			}
		}
	}

	dispatch.hook('S_TARGET_INFO', 1, (event) => {
		selectedTargetId = event.target;
	})	
		
	dispatch.hook('S_SPAWN_USER', 3, (event) => {
		// add user to list if not present
		let name = event.name.toLowerCase();
		for(let i = 0; i < users.length; i++) {
			if (users[i].name === name) {
				return;				
			}
		}
		users.push({name: name, cid: event.cid, race: Math.floor((event.model - 10101) / 100)});
	})	
	
	dispatch.hook('S_DESPAWN_USER', 1, (event) => {
		// remove user from list if present
		let index = -1;
		for(var i = 0; i < users.length; i++) {
			if (users[i].name === event.name) {
				index = i;
				break;
			}
		}
		if (index > -1) users.splice(index, 1);
	})
		
	function getUserId(name) {
		for(let i = 0; i < users.length; i++) {
			if (users[i].name === name) {
				return users[i].cid;
			}
		}
		return -1;
	}

	function getUserRace(cid) {
		for(let i = 0; i < users.length; i++) {
			if (users[i].cid === cid) {
				return users[i].race;
			}
		}
		return -1;
	}	
		
	function getEmoteId(emote, race) {
		switch (emote) {
			case 'hi':		
			case 'hello':	
			case 'wave':	return 16;
			case 'bow':		return 17;
			case 'sad':		
			case 'cry':		
			case 'sob':		return 18;
			case 'happy':	
			case 'laugh':	
			case 'lol':		return 19;
			case 'win':		
			case 'victory':	return 20;
			case 'dance':	return 21;
			case 'taunt':	
			case 'bringit':	
			case 'comeon':	return 22;
			case 'clap':	
			case 'applaud':	return 23;
			case 'beg':		
			case 'sorry':	return 24;
			case 'think':	
			case 'ponder':	
			case 'hmm':		return 25;
			case 'love':	return 26;
			case 'charge':	
			case 'attack':	return 27;
			case 'point':	
			case 'there':	return 28;
			case 'shy':		return 29;
			case 'angry':
			case 'anger':
			case 'mad':		return 30;
			case 'sit':		return 38;
			// special emotes
			case 'settle':
				if (race === 1) { // human
					return 45;
				} else if (race === 3) { // high elf
					return 47;
				} else if (race === 7) { // castanic
					return 49;
				} else if (race === 9) { // elin
					return 51;
				} else {
					return 1;
				}
			case 'peace':
			case 'v':
				if (race === 1) { // human
					return 46;
				} else if (race === 3) { // high elf
					return 48;
				} else if (race === 7) { // castanic
					return 50;
				} else if (race === 9) { // elin
					return 52;
				} else {
					return 1;
				}
			case 'kitchen':
				if (race === 9) { // elin
					return 44;
				} else {
					return 1;
				}
			case 'sir':
			case 'ma\'am':
			case 'serve':
			case 'servantsbow':
				if (race === 9) { // elin
					return 43;
				} else {
					return 1;
				}			
		}
		return -1;
	}
	
	dispatch.hook('S_SPAWN_ME', 1, (event) => {
		// reset
		users = [];
	})
		
	function systemMessage(msg) {
        dispatch.toClient('S_CHAT', 1, {
            channel: 24,
            authorID: 0,
            unk1: 0,
            gm: 0,
            unk2: 0,
            authorName: '',
            message: ' (emote-players) ' + msg
        });
    }
/* 
	let cid;
	dispatch.hook('S_LOGIN', 1, (event) => {
		cid = event.cid;
	})	
	
	dispatch.hook('S_SOCIAL', 1, (event) => {
		if (cid - event.target == 0)
			console.log('S_SOCIAL target: ' + event.target + ', anim: ' + event.animation );
	})	 	
 */
}