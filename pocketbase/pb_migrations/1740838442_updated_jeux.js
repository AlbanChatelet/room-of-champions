/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5wisw4eoz1xpohs")

  // remove
  collection.schema.removeField("uwk2kkyl")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5wisw4eoz1xpohs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uwk2kkyl",
    "name": "icone_jeu",
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
})
