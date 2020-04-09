# Backend Project API

* ### Title: Freelance-Website
* ### BaseUri: [Home Page](https://gigsonthego.herokuapp.com/)
* ### GitHub Uri: [Repo link](https://github.com/attainu/Freelancing-website)

___
* ### Developers: **Abhishek Shashank** and **Prakhar Parashar**
* ### Instructor: **Mr. Sundeep Charan Ramkumar**
* ### Mentor: **Mr. Chaitanya Kulkarni**
___
## Overview: 
* ### A basic implementation of a service exchange API.
* ### An employer can hire freelancers for a gig as well as post Job Requirements.
* ### A freelancer can accept Job Proposals as well as create a profile detailing his skills so that he can be hired.

___

## Features   
* ### Seperate Database Collections for Freelancers and Employers to prevent Complexity and Database Polluting.
* ### Implementation of **Passport Local Strategy Authentication** for Login Routes.
* ### **JWT Authentication** for all the protected Routes to prevent Unrestricted Access.
* ### Storing Encrypted Passwords in DB using **BcryptJS** for preventing owner access to user accounts.
* ### Freelancers can create Profiles with option of **Uploading Images**.
* ### Employers can hire freelancers after viewing the complete Profile containing all the details.
* ### Employers can also post Job requirements to which a freelancer can respond by accepting the Proposal after viewing all the details.
* ### Employers can give ratings to the freelancers after the completion of a gig.
* ### A **Customer Support** feature where a user can submit his query/Issue upon which a ticket would be generated.
* ### Email Confirmation to the customer upon raising a ticket using **NodeMailer**.
* ### Options for all the Account, Profile and Job details to be updated as well as deleted.

___

## Endpoints

### 1. /freelancer

* ### /freelancer/register
    * ### POST: 
        * ### Description: Creates a Freelancer Account with name, email password and an accessToken
        * ### Request Content-Type: Application/json
        * ### Response: 201
            * ### Returns the document generated

* ### /freelancer/login
    * ### POST: 
        * ### Description: Logs In to a Freelancer Account with a new Token saved in the DB
        * ### Request Content-Type: Application/json
        * ### Response: 201
            * ### Returns the document generated

* ### /freelancer/update/:freelancerid
    * ### PATCH: 
        * ### Description: Updates the Account Credentials based on the values sent along with the request
        * ### isSecure: TRUE
        * ### Request Content-Type: Application/json
        * ### Request Parameters: Freelancer ID
        * ### Response: 200
            * ### Returns a document containing matched and modified Count

* ### /freelancer/delete/:freelancerid
    * ### DELETE: 
        * ### Description: Removes the freelancer Account from the database
        * ### isSecure: TRUE
        * ### Request Parameters: Freelancer ID
        * ### Response: 200
            * ### Returns a message confirming the deletion


### 2. /employer 

* ### /employer/register
    * ### POST: 
        * ### Description: Creates an Employer Account with a name, email password and an accessToken
        * ### Request Content-Type: Application/json
        * ### Response: 201
            * ### Returns the document generated

* ### /employer/login
    * ### POST: 
        * ### Description: Logs In to a Employer Account with a new Token saved in the DB
        * ### Request Content-Type: Application/json
        * ### Response: 201
            * ### Returns the document generated

* ### /employer/update/:employerid
    * ### PATCH: 
        * ### Description: Updates the Account Credentials based on the values sent along with the request
        * ### isSecure: TRUE
        * ### Request Content-Type: Application/json
        * ### Request Parameters: Employer ID
        * ### Response: 200
            * ### Returns a document containing matched and modified Count

* ### /employer/delete/:employerid
    * ### DELETE: 
        * ### Description: Removes the employer Account from the database
        * ### isSecure: TRUE
        * ### Request Parameters: Employer ID
        * ### Response: 200
            * ### Returns a message confirming the deletion

### 3. /profile

* ### /profile/add
    * ### POST: 
        * ### Description: Creates the Freelancer Profile with all the details and stores the document in the DB
        * ### isSecure: TRUE
        * ### Request Content-Type: Application/json
        * ### Request File: Image Uploads
        * ### Response: 201
            * ### Returns the document generated

* ### /profile/viewAll
    * ### GET: 
        * ### Description: Displays all the Freelancer Profile documents stored in the DB in a paginated fashion
        * ### Response: 200
            * ### Returns the results after pagination filtering

* ### /profile/view/:freelancerid
    * ### GET: 
        * ### Description: Displays the entire profile details of an individual Freelancer
        * ### Request Parameters: Freelancer ID
        * ### Response: 200
            * ### Returns the document found

* ### /profile/update/:freelancerid
    * ### PATCH: 
        * ### Description: Updates the Profile Details based on the values sent along with the request
        * ### isSecure: TRUE
        * ### Request Content-Type: Application/json
        * ### Request Parameters: Freelancer ID
        * ### Response: 200
            * ### Returns a document containing matched and modified Count

* ### /profile/delete/:freelancerid
    * ### DELETE: 
        * ### Description: Removes the Freelancer Profile from the database
        * ### isSecure: TRUE
        * ### Request Parameters: Freelancer ID
        * ### Response: 200
            * ### Returns a message confirming the deletion


### 4. /job

* ### /job/create
    * ### POST: 
        * ### Description: Creates a new Job Proposal Document with all the details and stores the document in the DB
        * ### isSecure: TRUE
        * ### Request Content-Type: Application/json
        * ### Request File: Image Uploads
        * ### Response: 201
            * ### Returns the document generated

* ### /job/viewAll
    * ### GET: 
        * ### Description: Displays all the Job Proposal documents stored in the DB in a paginated fashion
        * ### Response: 200
            * ### Returns the results after pagination filtering

* ### /job/view/:jobid
    * ### GET: 
        * ### Description: Displays the entire job details of an individual Job Post
        * ### Request Parameters: Job ID
        * ### Response: 200
            * ### Returns the document found

* ### /job/update/:jobid
    * ### PATCH: 
        * ### Description: Updates the Job Details based on the values sent along with the request
        * ### isSecure: TRUE
        * ### Request Content-Type: Application/json
        * ### Request Parameters: Job ID
        * ### Response: 200
            * ### Returns a document containing matched and modified Count

* ### /job/delete/:jobid
    * ### DELETE: 
        * ### Description: Removes the Job Post from the database
        * ### isSecure: TRUE
        * ### Request Parameters: Job ID
        * ### Response: 200
            * ### Returns a message confirming the deletion

### 5. /checkout

* ### /checkout/acceptJob/:employerid
    * ### POST:
        * ### Description: Creates a New Order with the Employer and the Freelancer Details
        * ### isSecure: TRUE
        * ### Request Content-Type: Application/json
        * ### Request Parameters: Employer ID
        * ### Response: 201
            * ### Returns the generated Order Document

* ### /checkout/hireFreelancer/:freelancerid
    * ### POST:
        * ### Description: Creates a New Order with the Employer and the Freelancer Details
        * ### isSecure: TRUE
        * ### Request Content-Type: Application/json
        * ### Request Parameters: Freelancer ID
        * ### Response: 201
            * ### Returns the generated Order Document

### 6. /reviews

* ### /reviews/:freelancerid
    * ### POST:
        * ### Description: Employer can update the ratings field on the Freelancer Profile upon completion of the gig
        * ### isSecure: TRUE
        * ### Request Content-Type: Application/json
        * ### Request Parameters: Freelancer ID
        * ### Response: 200
            * ### Returns a document containing matched and modified Count
    
### 7. /customerSupport

* ### /generateTicket
    * ### POST:
        * ### Description: Raises a new Ticket with the relevant details along with sending a confirmation E-mail to the customer
        * ### Request Content-Type: Application/json
        * ### Response: 201
            * ### Returns the generated ticket Document


