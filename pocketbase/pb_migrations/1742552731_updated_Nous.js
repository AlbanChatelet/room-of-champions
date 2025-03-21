/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pwxztnbxey1xhis")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xlzplozh",
    "name": "portfolio",
    "type": "url",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pwxztnbxey1xhis")

  // remove
  collection.schema.removeField("xlzplozh")

  return dao.saveCollection(collection)
})
