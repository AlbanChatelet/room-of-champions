/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ljngfkyto6rhy1c")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xhshfhbw",
    "name": "liste_projets",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "lvuucy4v0nyqfoa",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ljngfkyto6rhy1c")

  // remove
  collection.schema.removeField("xhshfhbw")

  return dao.saveCollection(collection)
})
