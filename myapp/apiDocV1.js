
/**
 @api {post} /create Create Assignment
 @apiName CreateAssignment
 @apiGroup Assignment

 @apiParam {String} name name of asssignment
 @apiParam {String} description  description of the assignment
 @apiParam {String} type type of assignment
 @apiParam {String[]} tags array of tags identifiers for the assignment

 @apiSuccess {String} url  Url to retrieve the newly created assignment.

 @apiSuccessExample Success-Response:
      HTTP/1.1 201 OK
      {
       "url": "/getAssignment/fakeId"
      }

  @apiError error Bad Parameter:

  @apiErrorExample Error-Response:
      HTTP/1.1 400 Bad Request
      {
        "error": "Bad parameter: Path `name` is required. Path `description` is required."
      }

 */

/**
@api {get} /getAssignment/:id  Get Assignment
@apiName GetAssignment
@apiGroup Assignment

@apiParam {String} id Users unique ID.

@apiSuccess {String} _id unique identifier of the assignment
@apiSuccess {String[]} tags list of tags to identify the assignment
@apiSuccess {String} description short description of the assignment
@apiSuccess {String} name name of the assignment
@apiSuccess {Number} duration the number of the assignments duration
@apiSuccess {String} type classification of the type of assignment
@apiSuccess {Date} created date that the assignment was created

@apiSuccessExample Success-Response:
   HTTP/1.1 200 OK
      {
       	tags: [],
		 _id: 'HFvrFKgM7Ent3G7Dk',
		 description: 'Test assignment description',
		 name: 'Test assignment',
		 duration: 10,
		 type: 'Math assignment',
		 created: '2019-02-18T17:59:20.567Z',
		 __v: 0
      }

@apiError error This assignment does not exist

@apiErrorExample Error-Response:
	 HTTP/1.1 404 Resource Not Found
	      {
	        "error": "This assignment does not exist"
	      }
*/

/**
@api {get} /searchTags/:tag Get Assignments By Tag
@apiName SearchTags
@apiGroup Assignment

@apiParam {String} tag Name of tag you are searching for

@apiSuccess {Array} assignments An array of assignments, refer to /getAssignment for the structure of assignment object

@apiSuccessExample Success-Response:
HTTP/1.1 200 OK
    {
    	assignments: [
			{
				tags: ["geometry"],
				 _id: 'HFvrFKgM7Ent3G7Dk',
				 description: 'Test assignment description',
				 name: 'Test assignment',
				 duration: 10,
				 type: 'Math assignment',
				 created: '2019-02-18T17:59:20.567Z',
				 __v: 0
			},
			{
				tags: ["geometry"],
				 _id: 'HFvrFKgM7Ent3G7Df',
				 description: 'Test assignment description 2',
				 name: 'Test assignment 2',
				 duration: 10,
				 type: 'Math assignment',
				 created: '2019-02-18T17:59:20.567Z',
				 __v: 0
			}
      	]
    }

*/
