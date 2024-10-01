/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ljngfkyto6rhy1c")

  collection.updateRule = "@request.data.chef_equipe = @request.auth.id && @request.auth.id = chef_equipe"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ljngfkyto6rhy1c")

  collection.updateRule = ""

  return dao.saveCollection(collection)
})
