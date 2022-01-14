gra wzorowana na Geoguesser

run aplication https://denekd.github.io/geoguesser/

stack technologiczny: React, react-router-dom, react-redux-firebase, redux-firestore, @react-google-maps/api, random-streetview

## Applications features:

-
- aplikacja wykorzystuje firebase jako baze danych do przechowywania top Scores uzytkowników,
- aplikacja posiada system rejestracji i logowania użytkowników
-

## Authentication:

- możliwość rejestracji nowych użytkowników i logowania
- poprzez firebase authentication, Sign-in method: Email/Password
- for lazy uzers:

  email: user1@test.com  
   password: pass1234

  email: user2@gmail.com  
   password: pass1234

## State management:

- redux
- react-redux-firebase - reducery firebase i firestore nasłuchuja zmian w firebase,
