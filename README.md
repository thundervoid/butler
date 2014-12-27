# GroupMe Butler

Made to troll various GroupMe chats.

Callback URL: https:.//groupmebutler.herokuapp.com

# current functions

1. fetch / retrieve items

  - the butler responds to any messages starting with `butler,`, and
    if it finds certain words like `get, find, show, fetch, etc`, it will
    search to see if it can find another keyword in the message and will
    return an appropriate image (if it exists). 
  
  - All of this is handled via RegEx, see bot.js for information
  
  - will only return the proper response if the user says "please".

2. 'randomized' responses

  - all responses are filtered into categories (positive responses, negative, etc.).
    the bot selects a random response from the appropriate category when
    applicable

  - gives it somewhat of a real person aspect, not one default repsonse
    for each prompt.

3. name correction

  - when anyone mentions eric by name, the bot corrects the user with
    his proper name, Yung Bitch (sorry Eric)


# future implementations

1. ESPN API
  
  - send a message everytime the red wings score

  - send a message everytime the blackhawks get scored on (because eric)


2. jokes

  - ask the butler to tell you a joke

3. random messages

  - just general trolling messages, stupid shit basically

  - make a web interface to control how often random messages are sent
    (up this number during chapter to piss off connor).

4. respond to people with their names
  
  - kinda already doing this, but make it so when the butler responds,
    he calls people by their names (groupme api has a "name" attribute)
      - people may not use real names tho

