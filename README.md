# BookManagement-CRUD operation
#Here I have used the following information:-
             database       - MongoDB compas (local server).
             node           - version(v14.18.3)
             dependencies   - Express js, Mongoose, dotenv, etc.

#endpoints:-/api/book/add
                 -> Here in this API we add a new book record and store it on db. 
                    input request from body param{title,author,summary}
          :-/api/book/view/all
                 -> It's a get request to fetch all the records of the book and display it.
          :-/api/book/view
                 -> It's a get request to fetch the particular book through the unique id.
                    input request from query param{id}
          :-/api/book/update
                 -> It's a post request to update a book record through the unique id.
                    input request from body param{id, title, author, summary}
          :-/api/book/delete
                 -> It's a delete request to delete a book through the unique id(remove from db).
                   input request from query param{id}
                   
#Instructions to set up and run the application locally:-
          1. clone this repo.
          2. In the terminal go to the root directory and npm install through CLI
          3. change the 'DB_URI' from the '.env' file and set your mongoDb URI from your local mongo compass server
          4. if you want to change the port number set it inside the '.env' file.
          5. type 'npm start' in your terminal to run this project.
          
Yh!! all set.
