# Blogger
install node js
node version >= 4.0.0

install mongodb 

npm install

npm start

# API

#### Add a new blog post


        POST /blogs
            {
                "title": "This is the title",
                "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "
            }
            
#### Get all blogs with 5 blogs per page


        GET /blogs/?page=1
        This result will show only the blogs title and different paragraphs without the comments
        
#### Get a single blog with paragraphs and comments

        GET /blogs/:id
        The value of id you will get it from the api above. Each paragraph also has an id. This will be needed to add comment to a paragraph
        
#### Add a comment to a paragraph

        POST /blogs/:id/paragraphs/:paraId/comments
        {
            "comment": "This comment is too longasdfasd asdf"
        }