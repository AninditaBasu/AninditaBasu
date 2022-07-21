var petstore = {
  "openapi": "3.0.1",
  "info": {
    "title": "Wayback API",
    "description": "API for Internet Archive's Wayback Machine",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "https://archive.org/"
    }
  ],
  "paths": {
    "/wayback/available": {
      "get": {
        "parameters": [
          {
            "name": "url",
            "in": "query",
            "description": "A single URL to query.",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "timestamp",
            "in": "query",
            "description": "Timestamp requested in ISO 8601 format. The following formats are acceptable:\n - YYYY\n - YYYY-MM\n - YYYY-MM-DD\n - YYYY-MM-DDTHH:mm:SSz\n - YYYY-MM-DD:HH:mm+00:00\n",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "callback",
            "in": "query",
            "description": "Specifies a JavaScript function func, for a JSON-P response. When provided, results are wrapped as `callback(data)`, and the returned MIME type is application/javascript. This causes the caller to automatically run the func with the JSON results as its argument.\n",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "timeout",
            "in": "query",
            "description": "Timeout is the maximum number of seconds to wait for the availability API to get its underlying results from the CDX server. The default value is 5.0.\n",
            "schema": {
              "type": "number",
              "default": 5
            }
          },
          {
            "name": "closest",
            "in": "query",
            "description": "The direction specifies whether to match archived timestamps that are before the provided one, after, or the default either (closest in either direction). Must be before, after, or either. May be overidden by individual requests.\n",
            "schema": {
              "type": "string",
              "default": "either",
              "enum": [
                "either",
                "before",
                "after"
              ]
            }
          },
          {
            "name": "status_code",
            "in": "query",
            "description": "HTTP status codes to filter by. Only results with these codes will be returned\n",
            "schema": {
              "type": "integer",
              "enum": [
                200,
                201,
                202,
                203,
                204,
                205,
                206,
                300,
                301,
                302,
                303,
                304,
                305,
                306,
                307,
                308,
                400,
                401,
                402,
                403,
                404,
                405,
                406,
                407,
                408,
                409,
                410,
                411,
                412,
                413,
                414,
                415,
                416,
                417,
                418,
                421,
                426,
                428,
                429,
                431,
                500,
                501,
                502,
                503,
                504,
                505,
                506,
                507,
                511
              ]
            }
          },
          {
            "name": "tag",
            "in": "query",
            "description": "The optional tag can have any value, and is returned with the results; it can be used to help collate input and output values.\n",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Nominal Availability results",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AvailabilityResults"
                }
              },
              "application/javascript": {
                "schema": {
                  "$ref": "#/components/schemas/AvailabilityResults"
                }
              },
              "applcation/json": {
                "example": {
                  "results": [
                    {
                      "url": "http://www.entish.org",
                      "timestamp": "2016-04-07T19:39:18.000Z",
                      "snapshot": {
                        "status": "200",
                        "url": "http://web.archive.org/web/20160111075133/http://entish.org/",
                        "timestamp": "2016-04-07T19:39:18.000Z"
                      },
                      "tag": "0"
                    },
                    {
                      "url": "http://www.cnn.com/",
                      "snapshot": {
                        "url": "http://web.archive.org/web/20160413132039/http://www.cnn.com/",
                        "timestamp": "2016-04-13T13:20:39.000Z"
                      },
                      "tag": "1"
                    },
                    {
                      "url": "http://www.youcantfindthis.cat",
                      "timestamp": "2016-04-07T19:39:18.000Z",
                      "snapshot": {},
                      "tag": "2"
                    }
                  ]
                }
              }
            }
          },
          "default": {
            "description": "Unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              },
              "application/javascript": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      "post": {
        "parameters": [
          {
            "name": "url",
            "in": "query",
            "description": "A single URL to query.",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "timestamp",
            "in": "query",
            "description": "Timestamp requested in ISO 8601 format. The following formats are acceptable:\n - YYYY\n - YYYY-MM\n - YYYY-MM-DD\n - YYYY-MM-DDTHH:mm:SSz\n - YYYY-MM-DD:HH:mm+00:00\n",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "callback",
            "in": "query",
            "description": "Specifies a JavaScript function func, for a JSON-P response. When provided, results are wrapped as `callback(data)`, and the returned MIME type is application/javascript. This causes the caller to automatically run the func with the JSON results as its argument.\n",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "timeout",
            "in": "query",
            "description": "Timeout is the maximum number of seconds to wait for the availability API to get its underlying results from the CDX server. The default value is 5.0.\n",
            "schema": {
              "type": "number",
              "default": 5
            }
          },
          {
            "name": "closest",
            "in": "query",
            "description": "The direction specifies whether to match archived timestamps that are before the provided one, after, or the default either (closest in either direction). Must be before, after, or either. May be overidden by individual requests.\n",
            "schema": {
              "type": "string",
              "default": "either",
              "enum": [
                "either",
                "before",
                "after"
              ]
            }
          },
          {
            "name": "status_code",
            "in": "query",
            "description": "HTTP status codes to filter by. Only results with these codes will be returned\n",
            "schema": {
              "type": "integer",
              "enum": [
                200,
                201,
                202,
                203,
                204,
                205,
                206,
                300,
                301,
                302,
                303,
                304,
                305,
                306,
                307,
                308,
                400,
                401,
                402,
                403,
                404,
                405,
                406,
                407,
                408,
                409,
                410,
                411,
                412,
                413,
                414,
                415,
                416,
                417,
                418,
                421,
                426,
                428,
                429,
                431,
                500,
                501,
                502,
                503,
                504,
                505,
                506,
                507,
                511
              ]
            }
          },
          {
            "name": "tag",
            "in": "query",
            "description": "The optional tag can have any value, and is returned with the results; it can be used to help collate input and output values.\n",
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AvailabilityRequests"
              }
            },
            "text/csv": {
              "schema": {
                "$ref": "#/components/schemas/AvailabilityRequests"
              }
            },
            "application/x-www-form-urlencoded": {
              "schema": {
                "$ref": "#/components/schemas/AvailabilityRequests"
              }
            }
          },
          "required": false
        },
        "responses": {
          "200": {
            "description": "Nominal Availability results",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AvailabilityResults"
                }
              },
              "application/javascript": {
                "schema": {
                  "$ref": "#/components/schemas/AvailabilityResults"
                }
              },
              "applcation/json": {
                "example": {
                  "results": [
                    {
                      "url": "http://www.entish.org",
                      "timestamp": "2016-04-07T19:39:18.000Z",
                      "snapshot": {
                        "status": "200",
                        "url": "http://web.archive.org/web/20160111075133/http://entish.org/",
                        "timestamp": "2016-04-07T19:39:18.000Z"
                      },
                      "tag": "0"
                    },
                    {
                      "url": "http://www.cnn.com/",
                      "snapshot": {
                        "url": "http://web.archive.org/web/20160413132039/http://www.cnn.com/",
                        "timestamp": "2016-04-13T13:20:39.000Z"
                      },
                      "tag": "1"
                    },
                    {
                      "url": "http://www.youcantfindthis.cat",
                      "timestamp": "2016-04-07T19:39:18.000Z",
                      "snapshot": {},
                      "tag": "2"
                    }
                  ]
                }
              }
            }
          },
          "default": {
            "description": "Unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              },
              "application/javascript": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        },
        "x-codegen-request-body-name": "availabilty_request"
      }
    }
  },
  "components": {
    "schemas": {
      "Snapshot": {
        "type": "object",
        "properties": {
          "url": {
            "type": "string",
            "description": "The URL requested"
          },
          "timestamp": {
            "type": "string",
            "description": "The timestamp of the snapshot in [RFC 3339](http://xml2rfc.ietf.org/public/rfc/html/rfc3339.html) format",
            "format": "dateTime"
          },
          "status": {
            "type": "integer",
            "description": "The HTTP status of the URL requested"
          }
        }
      },
      "AvailabilityResults": {
        "required": [
          "results"
        ],
        "type": "object",
        "properties": {
          "results": {
            "type": "array",
            "description": "A list of results",
            "items": {
              "$ref": "#/components/schemas/ArchivedResult"
            }
          }
        }
      },
      "ArchivedResult": {
        "required": [
          "snapshot",
          "timestamp",
          "url"
        ],
        "type": "object",
        "properties": {
          "url": {
            "type": "string",
            "description": "The URL requested"
          },
          "timestamp": {
            "type": "string",
            "description": "The _intepreted_ timestamp requested, in [RFC 3339](http://xml2rfc.ietf.org/public/rfc/html/rfc3339.html) format",
            "format": "dateTime"
          },
          "tag": {
            "type": "string",
            "description": "The user-supplied tag for use in collation"
          },
          "snapshot": {
            "$ref": "#/components/schemas/Snapshot"
          }
        }
      },
      "AvailabilityRequests": {
        "type": "array",
        "example": [
          {
            "url": "http://www.entish.org",
            "timestamp": "2016-04-07T19:39:18.000Z",
            "tag": "0"
          },
          {
            "url": "http://www.cnn.com/",
            "tag": "1"
          },
          {
            "url": "http://www.youcantfindthis.cat",
            "timestamp": "2016-04-07T19:39:18.000Z",
            "tag": "2"
          }
        ],
        "items": {
          "$ref": "#/components/schemas/AvailabilityRequest"
        }
      },
      "AvailabilityRequest": {
        "required": [
          "url"
        ],
        "type": "object",
        "properties": {
          "url": {
            "type": "string",
            "description": "The URL requested"
          },
          "timestamp": {
            "type": "string",
            "description": "Timestamp requested in ISO 8601 format. The following formats are acceptable: - YYYY - YYYY-MM - YYYY-MM-DD - YYYY-MM-DDTHH:mm:SSz - YYYY-MM-DD:HH:mm+00:00\n"
          },
          "tag": {
            "type": "string",
            "description": "A user-supplied tag, used for collation"
          },
          "closest": {
            "type": "string",
            "description": "The direction to find the closest snapshot to the requested timestamp",
            "enum": [
              "either",
              "after",
              "before"
            ]
          }
        }
      },
      "Error": {
        "type": "object",
        "properties": {
          "code": {
            "type": "integer",
            "format": "integer"
          },
          "message": {
            "type": "string"
          }
        }
      }
    },
    "responses": {
      "AvailabilityResults": {
        "description": "Nominal Availability results",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/AvailabilityResults"
            }
          },
          "application/javascript": {
            "schema": {
              "$ref": "#/components/schemas/AvailabilityResults"
            }
          },
          "applcation/json": {
            "example": {
              "results": [
                {
                  "url": "http://www.entish.org",
                  "timestamp": "2016-04-07T19:39:18.000Z",
                  "snapshot": {
                    "status": "200",
                    "url": "http://web.archive.org/web/20160111075133/http://entish.org/",
                    "timestamp": "2016-04-07T19:39:18.000Z"
                  },
                  "tag": "0"
                },
                {
                  "url": "http://www.cnn.com/",
                  "snapshot": {
                    "url": "http://web.archive.org/web/20160413132039/http://www.cnn.com/",
                    "timestamp": "2016-04-13T13:20:39.000Z"
                  },
                  "tag": "1"
                },
                {
                  "url": "http://www.youcantfindthis.cat",
                  "timestamp": "2016-04-07T19:39:18.000Z",
                  "snapshot": {},
                  "tag": "2"
                }
              ]
            }
          }
        }
      }
    },
    "parameters": {
      "url": {
        "name": "url",
        "in": "query",
        "description": "A single URL to query.",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      "closest": {
        "name": "closest",
        "in": "query",
        "description": "The direction specifies whether to match archived timestamps that are before the provided one, after, or the default either (closest in either direction). Must be before, after, or either. May be overidden by individual requests.\n",
        "schema": {
          "type": "string",
          "default": "either",
          "enum": [
            "either",
            "before",
            "after"
          ]
        }
      },
      "timestamp": {
        "name": "timestamp",
        "in": "query",
        "description": "Timestamp requested in ISO 8601 format. The following formats are acceptable:\n - YYYY\n - YYYY-MM\n - YYYY-MM-DD\n - YYYY-MM-DDTHH:mm:SSz\n - YYYY-MM-DD:HH:mm+00:00\n",
        "schema": {
          "type": "string"
        }
      },
      "callback": {
        "name": "callback",
        "in": "query",
        "description": "Specifies a JavaScript function func, for a JSON-P response. When provided, results are wrapped as `callback(data)`, and the returned MIME type is application/javascript. This causes the caller to automatically run the func with the JSON results as its argument.\n",
        "schema": {
          "type": "string"
        }
      },
      "timeout": {
        "name": "timeout",
        "in": "query",
        "description": "Timeout is the maximum number of seconds to wait for the availability API to get its underlying results from the CDX server. The default value is 5.0.\n",
        "schema": {
          "type": "number",
          "default": 5
        }
      },
      "status_code": {
        "name": "status_code",
        "in": "query",
        "description": "HTTP status codes to filter by. Only results with these codes will be returned\n",
        "schema": {
          "type": "integer",
          "enum": [
            200,
            201,
            202,
            203,
            204,
            205,
            206,
            300,
            301,
            302,
            303,
            304,
            305,
            306,
            307,
            308,
            400,
            401,
            402,
            403,
            404,
            405,
            406,
            407,
            408,
            409,
            410,
            411,
            412,
            413,
            414,
            415,
            416,
            417,
            418,
            421,
            426,
            428,
            429,
            431,
            500,
            501,
            502,
            503,
            504,
            505,
            506,
            507,
            511
          ]
        }
      },
      "tag": {
        "name": "tag",
        "in": "query",
        "description": "The optional tag can have any value, and is returned with the results; it can be used to help collate input and output values.\n",
        "schema": {
          "type": "string"
        }
      }
    }
  }
}

var emptyOpenAPI={"openapi":"3.0.0","info":{"title":"API","version":"1.0.0"}};

var jsonSchemaDraft4 = {
"id": "http://json-schema.org/draft-04/schema#",
"$schema": "http://json-schema.org/draft-04/schema#",
"description": "OpenApi 3.0 schema subset",
"definitions": {
    "schemaArray": {
        "type": "array",
        "minItems": 1,
        "items": { "$ref": "#" }
    },
    "positiveInteger": {
        "type": "integer",
        "minimum": 0
    },
    "positiveIntegerDefault0": {
        "allOf": [ { "$ref": "#/definitions/positiveInteger" }, { "default": 0 } ]
    },
    "simpleTypes": {
        "enum": [ "array", "boolean", "integer", "null", "number", "object", "string" ]
    },
    "stringArray": {
        "type": "array",
        "items": { "type": "string" },
        "minItems": 1,
        "uniqueItems": true
    }
},
"type": "object",
"properties": {
    "id": {
        "type": "string",
        "format": "uri"
    },
    "$schema": {
        "type": "string",
        "format": "uri"
    },
    "title": {
        "type": "string"
    },
    "description": {
        "type": "string"
    },
    "default": {},
    "multipleOf": {
        "type": "number",
        "minimum": 0,
        "exclusiveMinimum": true
    },
    "maximum": {
        "type": "number"
    },
    "exclusiveMaximum": {
        "type": "boolean",
        "format": "checkbox",
        "default": false
    },
    "minimum": {
        "type": "number"
    },
    "exclusiveMinimum": {
        "type": "boolean",
        "format": "checkbox",
        "default": false
    },
    "maxLength": { "$ref": "#/definitions/positiveInteger" },
    "minLength": { "$ref": "#/definitions/positiveIntegerDefault0" },
    "pattern": {
        "type": "string",
        "format": "regex"
    },
    "additionalItems": {
        "anyOf": [
            { "type": "boolean",
              "format": "checkbox"
            },
            { "$ref": "#" }
        ],
        "default": {}
    },
    "items": {
        "anyOf": [
            { "$ref": "#" },
            { "$ref": "#/definitions/schemaArray" }
        ],
        "default": {}
    },
    "maxItems": { "$ref": "#/definitions/positiveInteger" },
    "minItems": { "$ref": "#/definitions/positiveIntegerDefault0" },
    "uniqueItems": {
        "type": "boolean",
        "format": "checkbox",
        "default": false
    },
    "maxProperties": { "$ref": "#/definitions/positiveInteger" },
    "minProperties": { "$ref": "#/definitions/positiveIntegerDefault0" },
    "required": { "$ref": "#/definitions/stringArray" },
    "additionalProperties": {
        "anyOf": [
            { "type": "boolean",
              "format": "checkbox"
            },
            { "$ref": "#" }
        ],
        "default": {}
    },
    "definitions": {
        "type": "object",
        "additionalProperties": { "$ref": "#" },
        "default": {}
    },
    "properties": {
        "type": "object",
        "additionalProperties": { "$ref": "#" },
        "default": {}
    },
    "patternProperties": {
        "type": "object",
        "additionalProperties": { "$ref": "#" },
        "default": {}
    },
    "enum": {
        "type": "array",
        "minItems": 1,
        "uniqueItems": true
    },
    "type": {
        "anyOf": [
            { "$ref": "#/definitions/simpleTypes" },
            {
                "type": "array",
                "items": { "$ref": "#/definitions/simpleTypes" },
                "minItems": 1,
                "uniqueItems": true
            }
        ]
    },
    "allOf": { "$ref": "#/definitions/schemaArray" },
    "anyOf": { "$ref": "#/definitions/schemaArray" },
    "oneOf": { "$ref": "#/definitions/schemaArray" },
    "dependencies": {
        "type": "object",
        "additionalProperties": {
            "anyOf": [
                { "$ref": "#" },
                { "$ref": "#/definitions/stringArray" }
            ]
        }
    },
    "not": { "$ref": "#" }
},
"dependencies": {
    "exclusiveMaximum": [ "maximum" ],
    "exclusiveMinimum": [ "minimum" ]
},
"default": {}};

if (typeof module !== 'undefined') {
  module.exports = {
    petstore: petstore
  };
}
