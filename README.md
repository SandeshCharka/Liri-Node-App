# Liri-Node-App

## What and Why?

Liri is a command line node app. It will take in certain commands and give back data based off what the command inputs are.

## Overview

The app utilizes a switch function to determine what the command line input is asking. And then proceeds to use the related functions within the app to search the proper databases and/or APIs of the input.

## Instructions

The Liri node app takes in any of these four parameters.

``spotify-this-song`` ``movie-this`` ``concert-this`` ``do-what-it-says``

## Examples

``node liri.js movie-this batman``

![Movie-This for Batman](https://github.com/SandeshCharka/Liri-Node-App/blob/master/images/Movie-This.png)

#### The following is logged and if no movie name is given, the default of "Mr. Nobody" is returned.

  * Title of the movie.
  * Year the movie came out.
  * IMDB Rating of the movie.
  * Rotten Tomatoes Rating of the movie.
  * Country where the movie was produced.
  * Language of the movie.
  * Plot of the movie.
  * Actors in the movie.

``node liri.js concert-this illenium``

![Concert-this for Illenium](https://github.com/SandeshCharka/Liri-Node-App/blob/master/images/Concert-This.png)

* Venue Name
* Venue Location
* Date of the Event

``node liri.js spotify-this-song crawl outta love``

![Concert-this for Illenium](https://github.com/SandeshCharka/Liri-Node-App/blob/master/images/spotify.png)

* Artist(s) name
* Song's name
* Spotify Link
* Album name

## Technologies Used

* Node JS
* Javascript
* OMDB API
* Spotify API
* Bands In Town API
* Moment.JS
* Axios
* Dotenv

## Role in development

Solo developer of application.