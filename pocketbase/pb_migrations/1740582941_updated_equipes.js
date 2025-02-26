/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ljngfkyto6rhy1c")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wu3w4pxw",
    "name": "jeu_associe",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "5wisw4eoz1xpohs",
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
  collection.schema.removeField("wu3w4pxw")

  return dao.saveCollection(collection)
})
