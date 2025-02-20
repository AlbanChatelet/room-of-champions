/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("432t207kijqx68n")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kzwgti9q",
    "name": "heure",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("432t207kijqx68n")

  // remove
  collection.schema.removeField("kzwgti9q")

  return dao.saveCollection(collection)
})
