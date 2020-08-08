# delta-force-community-api v0.0.1



- [Auth](#auth)
	- [Authenticate](#authenticate)
	- [Authenticate with Github](#authenticate-with-github)
	- [Authenticate with Google](#authenticate-with-google)
	
- [Home](#home)
	- [Create home](#create-home)
	- [Delete home](#delete-home)
	- [Retrieve home](#retrieve-home)
	- [Retrieve homes](#retrieve-homes)
	- [Update home](#update-home)
	
- [Notes](#notes)
	- [Create notes](#create-notes)
	- [Delete notes](#delete-notes)
	- [Retrieve notes](#retrieve-notes)
	- [Update notes](#update-notes)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user](#update-user)
	


# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|

## Authenticate with Github



	POST /auth/github


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Github user accessToken.</p>							|

## Authenticate with Google



	POST /auth/google


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Google user accessToken.</p>							|

# Home

## Create home



	POST //


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| Title			| 			|  <p>Home's Title.</p>							|
| Discription			| 			|  <p>Home's Discription.</p>							|
| Tags			| 			|  <p>Home's Tags.</p>							|
| Build-State			| 			|  <p>Home's Build-State.</p>							|
| Creator			| 			|  <p>Home's Creator.</p>							|
| Docs			| 			|  <p>Home's Docs.</p>							|
| Org			| 			|  <p>Home's Org.</p>							|
| Org-Website			| 			|  <p>Home's Org-Website.</p>							|

## Delete home



	DELETE ///:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve home



	GET ///:id


## Retrieve homes



	GET //


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update home



	PUT ///:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| Title			| 			|  <p>Home's Title.</p>							|
| Discription			| 			|  <p>Home's Discription.</p>							|
| Tags			| 			|  <p>Home's Tags.</p>							|
| Build-State			| 			|  <p>Home's Build-State.</p>							|
| Creator			| 			|  <p>Home's Creator.</p>							|
| Docs			| 			|  <p>Home's Docs.</p>							|
| Org			| 			|  <p>Home's Org.</p>							|
| Org-Website			| 			|  <p>Home's Org-Website.</p>							|

# Notes

## Create notes



	POST /notes


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| topic			| 			|  <p>Notes's topic.</p>							|
| date			| 			|  <p>Notes's date.</p>							|
| about			| 			|  <p>Notes's about.</p>							|
| context			| 			|  <p>Notes's context.</p>							|
| tags			| 			|  <p>Notes's tags.</p>							|

## Delete notes



	DELETE /notes/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve notes



	GET /notes


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update notes



	PUT /notes/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| topic			| 			|  <p>Notes's topic.</p>							|
| date			| 			|  <p>Notes's date.</p>							|
| about			| 			|  <p>Notes's about.</p>							|
| context			| 			|  <p>Notes's context.</p>							|
| tags			| 			|  <p>Notes's tags.</p>							|

# User

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET /users/:id


## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|


