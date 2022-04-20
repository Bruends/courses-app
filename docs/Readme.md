# Docs Summary
- [DB Entity Relationship Diagram](#db-entity-diagram)

- [EndPoints](#endpoints)
  - [Auth Endpoints](#auth-endpoint)
    - [Login](#login-route)
    - [Register](#login-route)
  - [Courses Endpoints](#courses-endpoint-auth-needed)
    - [All Courses](#get---all-courses)
    - [Course by Id](#get---course-by-id)
    - [Save Course](#post---save-course)
    - [Edit Course](#put---edit-course)
    - [Delete Course](#delete---delete-course)


# DB Entity Relationship Diagram
![erd](erd.png)

# Endpoints

## Auth EndPoint

### Register Route

```
Post /auth/register
```
Request Body:
```
{
  "email": "example@email.com",
  "username": "YourUser",	
  "password": "YourPassword"
}
```
response status: 
```
201 created
```

## Login Route

```
Post /auth/login
```
Request body:
```
{
  "username": "YourUser",	
  "password": "YourPassword"
}
```

Response: 
```
{
  "token": "(generated token)"
}
```
# Courses Endpoint (Auth Needed)

## Get - All courses
```
GET /courses
```
request Header: 
```
Authorization: Bearer (token)
```
response: 
```
[
  {
	  "id": 1,
	  "user_id": 2,
	  "name": "Course Name",
	  "link": "https://course.com",
	  "category": "tech",
	  "category_id": 1
  }
]
```

## Get - course by id
```
GET /courses/{id}
```
request Header: 
```
Authorization: Bearer (token)
```
response: 
```
{
  "id": 1,
  "user_id": 2,
  "name": "Course Name",
  "link": "https://course.com",
  "category": "tech",
  "category_id": 1
}

```

## POST - save course
```
POST /courses
```
request Header: 
```
Authorization: Bearer (token)
```
Request Body:  
```
{
  "name": "Course Name",
  "link": "https://course.com",
  "category": "tech"
}
```
response status: 
```
201 created
```

## PUT - Edit Course
```
PUT /courses
```
request Header: 
```
Authorization: Bearer (token)
```
Request Body:  
```
{
  "id": "1"
  "name": "New Course Name",
  "link": "https://course.com",
  "category": "tech"
}
```
response status: 
```
200 success
```

# DELETE - delete course
```
DELETE /courses/{id}
```
request Header: 
```
Authorization: Bearer (token)
```
response status: 
```
200 success
```
