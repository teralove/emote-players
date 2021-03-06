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
* !emote 38          - The selected player will sit down
* !emoteall dance    - Everyone will start dancing
* !emoteall kitchen  - Every Elin will start kitchen dancing

Arguments can be either text (ie "Bob" and "dance") or be IDs ("21" for dance id).

Commands are not case-sensitive. [slash](https://github.com/baldera-mods/slash) is supported but not required

### Known issues:
* Idle animations will often interrupt emotes. See the [Remove Idles](https://github.com/teralove/remove-idles) mod to fix this.

### Info:
* Client-side only, this means only you can see the emotes. You're not actually forcing others to do emotes.
* Other animations can be played as well. See ['animation_ids.txt'](https://github.com/teralove/emote-players/blob/master/animation_ids.txt) for list of commands and IDs.