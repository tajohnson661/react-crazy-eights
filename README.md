# Crazy Eights

Play crazy eights against the computer


### Setup:
Clone this repo into a new project folder, e.g. `my-react-project`:

```
git clone https://github.com/tajohnson661/react-crazy-eights my-react-project
cd my-react-project
npm install
```



### Serve locally:
```
npm start
```
* Access app at `http://localhost:8000/`


### Tests:
```
TBD
```
### Build & bundle for prod:
```
TBD
```

### Development Notes:

* This application uses react and redux.  It was originally created in elm  [Elm home](http:/elm-lang.org).  Here's the repo for that... [Elm crazy eights](https://github.com/tajohnson661/elm-crazy-eights).  I tried to model my design decisions on what I did in elm, as this was an exercise in using the elm design process in react/redux.  Functional programming techniques are used when it makes sense.
* I used [CSS-Playing-Cards](http://selfthinker.github.com/CSS-Playing-Cards/) by Anika Henke <anika@selfthinker.org> as the starting point for the playing card CSS
* The biggest design issue I've come across in this simple game is where to put the application logic.  I narrowed it down to three possibilities
	* Do the logic in the reducers.  Everything is generally synchronous, so this works, but seems a bit weird to separate out the game logic out into the reducers.
	* Do the logic in the action creators.  Ok, but seems like the same problem as reducers, plus I don't have access to current state directly.
	* Do the logic where I think it belongs... where all of the logic is.  The problem here is that if I want to do a couple of things in serial via different actions, the state in the props isn't updated between the first and second action.  I'm solving this by using setTimeout(, 0) to wait for the next tick to do the 2nd action.  This works, but feels clunky.


### Game Development Notes:

* Dealer only plays an eight if nothing else to play
* If the deck to draw cards from is empty, I refill/shuffle the cards right away instead of when the user needs to draw.  This will help with the UI in showing the current state
* One known situation I don't handle: If the player and dealer hold all the cards in their hands (nothing in the draw pile and nothing in the discard pile), and then the player plays a card, I don't reset the draw pile.  Super edge case, so who cares.

