# members-only

Members Only project from The Odin Project (NodeJS).

## About

A message board where only members can view the content/authors of the messages.

Guests have restricted view of the messages, users can post messages but still have restricted view, members have full view of messages, and admins have delete privileges.

Basic CRUD app with authentication functionalities.

## Technologies Used

- [ExpressJS](https://expressjs.com/) for main app
- [MongoDB](https://www.mongodb.com/) for storage ([Mongoose](https://mongoosejs.com/) as ODM)
- [Handlebars](https://handlebarsjs.com/) as template engine
- [Express-validator](https://express-validator.github.io/docs/) middleware for validation + sanitization of input
- [PassportJS](http://www.passportjs.org/) for authentication
- [bcrypt](https://www.npmjs.com/package/bcrypt) for encryption of passwords
- Vanilla CSS for styling

### Misc

The membership password is `topsecret`.
