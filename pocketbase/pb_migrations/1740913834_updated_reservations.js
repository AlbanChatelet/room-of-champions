/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("432t207kijqx68n")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rkaz3tao",
    "name": "jeu_creneau",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "5wisw4eoz1xpohs",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("432t207kijqx68n")

  // remove
  collection.schema.removeField("rkaz3tao")

  return dao.saveCollection(collection)
})
