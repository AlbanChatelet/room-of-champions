/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ljngfkyto6rhy1c")

  collection.viewRule = "@request.auth.id != \"\"\n"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ljngfkyto6rhy1c")

  collection.viewRule = ""

  return dao.saveCollection(collection)
})
