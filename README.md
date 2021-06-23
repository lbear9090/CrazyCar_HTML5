# About
The Crazy Car game for awarding credits. This game must be run within an iframe.

Sample:

# Available Post Message Events
The game will trigger the following post message events:

## The game is loading
Event Data:
```javascript
{
    "game": {
        "status": "loading"
    }
}
```

## The game is now listening for a post message event containing a configuration
Event Data:
```javascript
{
    "game": {
        "status": "configuration-ready"
    }
}
```

## The game has finished loading
Event Data:
```javascript
{
    "game": {
        "status": "loaded"
    }
}
```

## The user has finished the game
Event Data:
```javascript
{
    "game": {
        "status": "complete"
    }
}
```

# Available Configurations
The game will trigger a post message event when it is ready to accept a configuration (see Available Post Message Events section).

## Configuration Example
```javascript
{
    en_game_config: {
        
    }
}
```
