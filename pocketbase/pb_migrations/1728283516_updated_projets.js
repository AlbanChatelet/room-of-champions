/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lvuucy4v0nyqfoa")

  // add
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lvuucy4v0nyqfoa")

  // remove
  collection.schema.removeField("sihvz98r")

  return dao.saveCollection(collection)
})
