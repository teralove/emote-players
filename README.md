# Emote Players
Make other players do emotes

### Chat commands:
* !emote [name] [emote]
* !emote [emote]
* !emoteAll [emote]

### Command examples:
* !emote bob dance   - The player named "Bob" will start dancing
* !emote bob 21      - The player named "Bob" will start dancing 
* !emote dance       - The selected player will start dancing
* !emoteall kitchen  - Every Elin will start kitchen dancing
* !emoteall 51    	 - Every Elin will settle

Arguments can be either text (ie "Bob" and "dance") or be IDs ("21" for dance id). Character IDs can also be used.

Commands are not case-sensitive. [slash](https://github.com/baldera-mods/slash) is supported but not required

### Known issues:
* Idle animations will often interrupt emotes. See the [Remove Idles](https://github.com/teralove/remove-idles) mod to fix this.

### Info:
* Client-side only, this means only you can see the emotes. You're not actually forcing others to do emotes.
* Other animations can be played as well. See 'animation_ids.txt' for list of commands and IDs.