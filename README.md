# Pokemon API Data Playground

Express.js project to catch, release and rename pokemons via the [Pokemon API](https://pokeapi.co/).

- Express
- Fs
- Axios
- Uuidv4

---

## URL

_Server_

```
http://localhost:3000
```

---

## Global Response

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

## RESTful Endpoints

### POST /pokemon/seed

> Seed pokemon data

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (201)_

```
{

    "data": [
	        <wild_pokemons>
	       ],
    "message": "Wild Pokemons seeded successfully!",
    "status": "Success"

}
```

_Response (400)_

```
{
    "message": "Wild Pokemons already seeded."
}
```

---

### GET /pokemon/all/wild

> Get all wild pokemons

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{

    "data": [
	        <wild_pokemons>
	       ],
    "status": "Success"

}
```

---

### GET /pokemon/all/my

> Get my pokemon list

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{

    "data": [
	        <my_pokemons>
	       ],
    "status": "Success"

}
```

---

### GET /pokemon/:id

> Get pokemon details

_Request Params_

```
<pokemon_id>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{

    "data": [
	        <pokemon_details>
	       ],
    "status": "Success"

}
```

_Response (404)_

```
{
    "message": "Pokemon not found."
}
```

---

### POST /pokemon/catch/:id

> Catch pokemon by id

_Request Params_

```
<pokemon_id>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (201)_ (If catch succeed)

```
{

    "message": "<name> caught successfully!",
    "myPokemons": [<data_pokemon>]

}
```

_Response (204)_ (If catch failed)

```
{

    "message": "Failed to catch <name>.",
    "myPokemons": [<data_pokemon>]

}
```

_Response (404)_

```
{
    "message": "Pokemon not found in the wild"
}
```

---

### POST /pokemon/release/:id

> Release pokemon by id

_Request Params_

```
<pokemon_id>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (201)_ (If release succeed)

```
{
    "message": "<name> released successfully!",
    "myPokemons": [<data_pokemon>]
}
```

_Response (204)_ (If release failed)

```
{

    "message": "Failed to release <name>.",
    "myPokemons": [<data_pokemon>]

}
```

_Response (404)_

```
{
    "message": "Pokemon not found in your pokemon list."
}
```

---

### PATCH /pokemon/rename/:id

> Rename pokemon by id

_Request Params_

```
<pokemon_id>
```

_Request Header_

```
not needed
```

_Request Body_ (optional)

```
{
  "name": "<name>",
}
```

_Response (200)_

```
{
    "message": "<old_name> renamed to <new_name> successfully!",
    "myPokemons": [<data_pokemon>]
}
```

_Response (404)_

```
{
    "message": "Pokemon not found in your pokemon list."
}
```

_Response (400)_

```
{
    "message": "Name cannot be empty"
}

{
    "message": "Name should be a string"
}

{
    "message": "\"<property>\" is not allowed"
}

{
    "message": "Name should have a minimum length of 3 character"
}
```

---
