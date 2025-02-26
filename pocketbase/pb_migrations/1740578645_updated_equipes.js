/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ljngfkyto6rhy1c")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hlif4njh",
    "name": "icone",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ljngfkyto6rhy1c")

  // remove
  collection.schema.removeField("hlif4njh")

  return dao.saveCollection(collection)
})
