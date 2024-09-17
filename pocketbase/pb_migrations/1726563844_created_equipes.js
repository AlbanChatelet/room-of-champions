/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ljngfkyto6rhy1c",
    "created": "2024-09-17 09:04:04.165Z",
    "updated": "2024-09-17 09:04:04.165Z",
    "name": "equipes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "z9da6gnb",
        "name": "nom",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "nptweczg",
        "name": "description",
        "type": "editor",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "convertUrls": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ljngfkyto6rhy1c");

  return dao.deleteCollection(collection);
})
