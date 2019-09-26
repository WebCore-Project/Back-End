# BACKEND

EndPoint list:

## Register User
POST https://bw-vacation-planner.herokuapp.com/api/auth/register

**Requirements:**
- unique username 
- password

**Example sending a request to register a new user**
{  
    "username" : "LordOfTheRings",
    "password" : "youWillNeverFindMyPassWord!@#$%12"
}

## Logs User In and Returns Login Token
POST https://bw-vacation-planner.herokuapp.com/api/auth/login

**Requirements:**
- existing username
- password


## Adds a New Vacation
POST https://bw-vacation-planner.herokuapp.com/api/vacations/add

**Requirements:**
- login token
- location 
- title

**Not-required:**
- dates
- description

**Example sending a request to add a new vacation**
{   "location": "Africa",
    "title": "Summer Trip",
    "dates": "July - August",
    "description" : "Have fun!"
}


## Returns list of vacations, for current user
GET https://bw-vacation-planner.herokuapp.com/api/vacations/

**Requirements:**
- login token

## Return vacation from id, for current user
GET https://bw-vacation-planner.herokuapp.com/api/vacations/:vacId

**Requirements:**
- login token
- vacation id(vacId) in url

## Adds user to vacation
POST https://bw-vacation-planner.herokuapp.com/api/vacations/:vacId/adduser

**Requirements:**
- login token
- username to add
- vacation id(vacId) in url

**Example adding a user**
{
    "username": "blue"
}

## Deletes user from vacation
DELETE https://bw-vacation-planner.herokuapp.com/api/vacations/:vacId/deleteuser

**Requirements:**
- login token
- username to delete
- vacation id(vacId) in url

**Example deleting a user**
{
    "username": "blue"
}

## Updates vacation
PUT https://bw-vacation-planner.herokuapp.com/api/vacations/:vacId/update

**Requirements:**
- login token
- location 
- title
- vacation id(vacId) in url


**Not-required:**
- date
- description

**Example sending a request to update existing vacation**
{   
    "location": "Africa",
    "title": "Summer Trip",
    "dates": "July - August",
    "description" : "Have fun!"
}


## Returns a list of comments on the vacation
GET https://bw-vacation-planner.herokuapp.com/api/vacations/:vacId/comments

**Requirements:**
- login token
- vacation id(vacId) in url

## Adds a comment to the the vacation
POST https://bw-vacation-planner.herokuapp.com/api/vacations/:vacId/comments/add

**Requirements:**
- login token
- comment field
- vacation id(vacId) in url

**Example sending a request to add a new comment**
{  
    "comment" : "Lets go somewhere!"
}


## Deletes comment with id from vacation with vacId
DELETE https://bw-vacation-planner.herokuapp.com/api/vacations/:vacId/comments/:id/delete

**Requirements:**
- login token
- comment id in url
- vacation id(vacId) in url


## Returns a list of suggestions on the vacation
GET https://bw-vacation-planner.herokuapp.com/api/vacations/:vacId/suggestions

**Requirements:**
- login token
- vacation id(vacId) in url

## Adds a suggestion to the the vacation
POST https://bw-vacation-planner.herokuapp.com/api/vacations/:vacId/suggestions/add

**Requirements:**
- login token
- suggestion field
- vacation id(vacId) in url

**Example sending a request to add a new suggestion**
{  
    "suggestion" : "Lets go somewhere!"
}

## Deletes suggestion with id from vacation with vacId
DELETE https://bw-vacation-planner.herokuapp.com/api/vacations/:vacId/suggestions/:id/delete

**Requirements:**
- login token
- suggestion id in url
- vacation id(vacId) in url
