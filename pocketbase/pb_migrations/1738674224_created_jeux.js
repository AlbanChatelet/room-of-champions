/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "5wisw4eoz1xpohs",
    "created": "2025-02-04 13:03:44.690Z",
    "updated": "2025-02-04 13:03:44.690Z",
    "name": "jeux",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "xvz6jkzy",
        "name": "image",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [],
          "thumbs": [],
          "maxSelect": 1,
          "maxSize": 5242880,
          "protected": false
        }
      },
      {
        "system": false,
        "id": "sj0ug07h",
        "name": "nom_jeux",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("5wisw4eoz1xpohs");

  return dao.deleteCollection(collection);
})
