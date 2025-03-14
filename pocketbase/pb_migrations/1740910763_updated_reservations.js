/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("432t207kijqx68n")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ar9uz8xe",
    "name": "participants",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("432t207kijqx68n")

  // remove
  collection.schema.removeField("ar9uz8xe")

  return dao.saveCollection(collection)
})
