const {Schema, model} = require('mongoose')

const DocumentSchema = new Schema({
    content: {
      type: Object,
      default: '',
    },
    owner: {
      type: Schema.ObjectId,
      required: true,
      ref: 'users',
    },
    collaboratorList: {
      type: [{
        type: Schema.ObjectId,
        ref: 'users',
      }],
      default: [],
    },
    title: {
      type: String,
      default: 'Untitled',
    },
    template: {
      type: String,
      default: 'Пустой',
    },
    versions: {
      type: [{
        type: Schema.ObjectId,
        ref: 'documents',
      }],
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
    password: {
      type: String,
    },
    createdTime: {
      type: Date,
    },
    lastEditTime: {
      type: Date,
    },
  });

module.exports = model('Document', DocumentSchema)