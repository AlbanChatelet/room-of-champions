/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lvuucy4v0nyqfoa")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sihvz98r",
    "name": "equipeChoisie",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "ljngfkyto6rhy1c",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lvuucy4v0nyqfoa")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sihvz98r",
    "name": "equipeChoisie",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "ljngfkyto6rhy1c",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
