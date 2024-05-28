require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware')

const PORT = process.env.PORT || 5000;
const app = express();
const http = require('http').Server(app);

const io = require('socket.io')(http,{
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
require('./socket')(io);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use('/api', router);

app.use(errorMiddleware);

const Document = require('./models/document-model');

app.post('/newdocument', (req, res) => {
    console.log('Creating new document!');
    if (req.body.userId) {
      var data = ''
      var tempName = ''
      switch(req.body.template) {
        case 'blank':
          break;
        case 'resolution':
          const {resolution} = require('./templates/templates')
          data = resolution;
          tempName = 'Постановление';
          break;
        case 'order':
          const {order} = require('./templates/templates')
          data = order;
          tempName = 'Приказ';
          break;
        case 'protocol':
          const {protocol} = require('./templates/templates')
          data = protocol;
          tempName = 'Протокол';
          break;
        case 'disposition':
          const {disposition} = require('./templates/templates')
          data = disposition;
          tempName = 'Распоряжение';
          break;
      }
      const newDoc = new Document({
        owner: req.body.userId,
        title: req.body.title,
        password: req.body.password,
        template: tempName,
        content: data,
        createdTime: new Date(),
        lastEditTime: new Date(),
      });
      newDoc.save()
        .then(() => {
          res.json({ success: true });
        })
        .catch((err) => {
          console.log('Could not save document');
          res.json({ success: false, error: err });
        });
    } else {
      console.log('Cannot create document: User not logged in!');
    }
  });

  app.get('/mydocs', (req, res) => {
    console.log('Retrieving your documents...');
    console.log(req.headers.userid);
    if (req.headers.userid) {
      Document.find({ owner: req.headers.userid })
        .then((response) => {
          res.json({ success: true, docs: response });
        })
        .catch((err) => {
          console.log('Could not retrieve your documents');
          res.json({ success: false, error: err });
        });
    } else {
      console.log('Cannot retrieve documents: User not logged in!');
    }
  });

  app.get('/currentDoc', (req, res) => {
    console.log(req.headers.docid);
    if (req.headers.docid) {
      Document.findById(req.headers.docid)
        .then((response) => {
          res.json({success: true, doc: response});
        })
        .catch((err) => {
          console.log('Could not find your document');
          res.json({ success: false, error: err });
        })
    } else {
      console.log('Cannot retrieve documents: User not logged in!');
    }
  });

  app.get('/mycollabdocs', (req, res) => {
    console.log('Retrieving documents you collaborate in...');
    Document.find()
      .then((response) => {
        let collab = response.filter(doc => {
          if (doc.collaboratorList.indexOf(req.user._id) > -1) {
            return true;
          }
          return false;
        });
        res.json({ success: true, docs: collab });
      })
      .catch((err) => {
        console.log(err);
        res.json({ success: false, error: err });
      });
  });

  app.post('/collaborate', (req, res) => {
    Document.findById(req.body.id)
      .then((response) => {
        let newCollabList = [...response.collaboratorList];
        newCollabList.push(req.user._id);
        if(response.password === req.body.password){
          Document.findByIdAndUpdate(req.body.id, { collaboratorList: newCollabList })
            .then((resp) => {
              console.log('User added as collaborator');
              res.json({ success: true });
            })
            .catch((err) => {
              console.log(err);
              res.json({ success: false });
            });
        } else{
          console.log('Password does not match');
          res.json({ success: false });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({ success: false });
      });
  });

  app.post('/save', (req, res) => {
    console.log('Id is: ' + req.body.id);
    let currentDate = new Date();
    const contentUpdate = {
      editorState: req.body.editor,
      saveTime: currentDate,
      username: req.user.username,
      title: req.body.title,
      styles: req.body.styles,
    };
    Document.findById(req.body.id)
      .then((document) => {
        console.log(document);
        let newContent = [...document.content];
        newContent.push(contentUpdate);
        Document.findByIdAndUpdate(req.body.id, { content: newContent })
          .then(() => res.json({ success: true, date: currentDate }))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });
  
  app.post('/savetitle', (req, res) => {
    Document.findByIdAndUpdate(req.body.id, { title: req.body.newTitle })
      .then((response) => {
        console.log('Document renamed');
        res.json({ success: true });
      })
      .catch((err) => {
        console.log('Document not renamed');
        res.json({ success: false });
      });
  });
  
  app.post('/deletedoc', (req, res) => {
    Document.findByIdAndDelete(req.body.id)
      .then((response) => {
        console.log('Document deleted');
        res.json({ success: true });
      })
      .catch((err) => {
        console.log('Document not deleted');
        res.json({ success: false });
      });
  });

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        http.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

start();
