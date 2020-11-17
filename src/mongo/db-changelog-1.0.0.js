// changeset primaki:0
db.getCollection('_templates').drop();

// changeset primaki:1
db.getCollection('_templates').insert(
  {
    "_id": ObjectId("5d6042f24fe36329f4a3989d"),
    "type": "route",
    "content": {
      "definitions": {
        "identificador": {
          "type": "string",
          "pattern": "[a-f0-9]{24}$",
          "readOnly": true,
          "ref": "defs.schema.json#/definitions/identificador"
        },
        "version": {
          "type": "integer",
          "minimum": 0,
          "readOnly": true,
          "ref": "defs.schema.json#/definitions/version"
        },
        "mpi": {
          "type": "string",
          "pattern": "\\b[0-9a-f]{8}\\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\\b[0-9a-f]{12}\\b",
          "readOnly": true,
          "ref": "defs.schema.json#/definitions/mpi"
        },
        "date": {
          "type": "string",
          "format": "date",
          "ref": "defs.schema.json#/definitions/date"
        },
        "date-time": {
          "type": "string",
          "format": "date-time",
          "ref": "defs.schema.json#/definitions/date-time"
        },
        "estado-civil": {
          "type": "string",
          "enum": [
            "SOLTEIRO",
            "CASADO",
            "VIUVO",
            "SEPARADO_JUDICIALMENTE",
            "DIVORCIADO"
          ],
          "ref": "defs.schema.json#/definitions/estado-civil"
        },
        "grau-instrucao": {
          "type": "string",
          "enum": [
            "ANALFABETO",
            "PRIMARIO_INCOMPLETO",
            "PRIMARIO_COMPLETO",
            "PRIMEIRO_GRAU_INCOMPLETO",
            "PRIMEIRO_GRAU_COMPLETO",
            "SEGUNDO_GRAU_INCOMPLETO",
            "SEGUNDO_GRAU_COMPLETO",
            "SUPERIOR_INCOMPLETO",
            "SUPERIOR_COMPLETO",
            "MESTRADO_COMPLETO",
            "DOUTORADO_COMPLETO"
          ],
          "ref": "defs.schema.json#/definitions/grau-instrucao"
        },
        "sexo": {
          "type": "string",
          "enum": [
            "MASCULINO",
            "FEMININO",
            "NAO_INFORMADO"
          ],
          "ref": "defs.schema.json#/definitions/sexo"
        },
        "cnpj": {
          "type": "string",
          "pattern": "[0-9]{2}.[0-9]{3}.[0-9]{3}\\/[0-9]{4}-[0-9]{2}",
          "ref": "defs.schema.json#/definitions/cnpj"
        },
        "uf": {
          "type": "string",
          "enum": [
            "AC",
            "AL",
            "AP",
            "AM",
            "BA",
            "CE",
            "DF",
            "ES",
            "GO",
            "MA",
            "MT",
            "MS",
            "MG",
            "PA",
            "PB",
            "PR",
            "PE",
            "PI",
            "RJ",
            "RN",
            "RS",
            "RO",
            "RR",
            "SC",
            "SP",
            "SE",
            "TO"
          ],
          "ref": "defs.schema.json#/definitions/uf"
        }
      },
      "schemas": {
        "rootNode": {
          "title": "Template Schema",
          "type": "object",
          "required": [
            "tipoTelefone",
            "ddd",
            "numero"
          ],
          "properties": {
            "_id": {
              "&ref": "defs.schema.json#/definitions/identificador"
            },
            "_v": {
              "&ref": "defs.schema.json#/definitions/version"
            },
            "pessoa": {
              "&ref": "defs.schema.json#/definitions/identificador"
            },
            "tipoTelefone": {
              "type": "string",
              "enum": [
                "PESSOAL",
                "RESIDENCIAL",
                "COMERCIAL",
                "CELULAR"
              ],
              "description": "Tipo do Telefone."
            },
            "ddd": {
              "type": "integer",
              "minLength": 2,
              "description": "Código DDD."
            },
            "numero": {
              "type": "string",
              "description": "Número do fone.",
              "pattern": "[0-9]{6,}"
            },
            "nomeContato": {
              "type": [
                "string",
                "null"
              ],
              "description": "Pessoa de contato, se aplicavél."
            },
            "dataCriacao": {
              "type": "string",
              "description": "Data e hora de criação da tag."
            },
            "criador": {
              "type": "string",
              "description": "Nome do usuário ou pessoal que criou a tag."
            }
          },
          "additionalProperties": false,
          "&id": "http://qualirede.com.br/schemas/template.schema.json",
          "&schema": "http://json-schema.org/draft-07/schema#"
        },
        "create": {
          "title": "Template - Schema - Create",
          "&patch": {
            "source": {
              "&ref": "template.schema.json"
            },
            "with": [
              {
                "op": "remove",
                "path": "/properties/_id"
              },
              {
                "op": "remove",
                "path": "/properties/pessoa"
              },
              {
                "op": "remove",
                "path": "/properties/criador"
              },
              {
                "op": "remove",
                "path": "/properties/dataCriacao"
              }
            ]
          },
          "&id": "http://qualirede.com.br/schemas/template.create.schema.json",
          "&schema": "http://json-schema.org/draft-07/schema#"
        },
        "update": {
          "title": "Template - Schema - Update",
          "&patch": {
            "source": {
              "&ref": "template.schema.json"
            },
            "with": [
              {
                "op": "remove",
                "path": "/required"
              },
              {
                "op": "remove",
                "path": "/properties/_id"
              },
              {
                "op": "remove",
                "path": "/properties/pessoa"
              },
              {
                "op": "remove",
                "path": "/properties/criador"
              },
              {
                "op": "remove",
                "path": "/properties/dataCriacao"
              }
            ]
          },
          "&id": "http://qualirede.com.br/schemas/template.update.schema.json",
          "&schema": "http://json-schema.org/draft-07/schema#"
        }
      },
      "resources": {
        "rootNode": {
          "database_operation": {
            "bucket": "template"
          },
          "resource": "TEMPLATE"
        }
      },
      "operations": {
        "rootStructure": {
          "descricao": "Tem filho mas não é um filho (root node with leaf node) /vacinas/*",
          "childNode": {
            "databaseRestriction": {
              "restriction": {
                "_id": "${param.TEMPLATE_ID}"
              }
            },
            "operationSchema": "",
            "resource": "",
            "singleResource": false
          },
          "rootNode": {
            "adjusters": [
              {
                "methods": [
                  "CREATE"
                ],
                "operation": {
                  "add_field": {
                    "name": "criador",
                    "value": "${user.nome}"
                  }
                }
              },
              {
                "methods": [
                  "CREATE"
                ],
                "operation": {
                  "add_field": {
                    "name": "dataCriacao",
                    "value": "#{new Date()}"
                  }
                }
              }
            ],
            "operationSchema": "",
            "resource": "",
            "singleResource": false
          }
        },
        "parentStructure": {
          "descricao": "É filho e terá filhos (parent node) */vacinas/*",
          "childNode": {
            "databaseRestriction": {
              "aggregate": [
                {
                  "&project": {
                    "pessoa": 0
                  }
                }
              ],
              "restriction": {
                "_id": "${param.TEMPLATE_ID}",
                "pessoa": "${param.MPI}"
              }
            },
            "operationSchema": "",
            "resource": "",
            "singleResource": false
          },
          "parentNode": {
            "adjusters": [
              {
                "methods": [
                  "CREATE"
                ],
                "operation": {
                  "add_field": {
                    "name": "pessoa",
                    "value": "${param.MPI}"
                  }
                }
              },
              {
                "methods": [
                  "CREATE"
                ],
                "operation": {
                  "add_field": {
                    "name": "criador",
                    "value": "${user.nome}"
                  }
                }
              },
              {
                "methods": [
                  "CREATE"
                ],
                "operation": {
                  "add_field": {
                    "name": "dataCriacao",
                    "value": "#{new Date()}"
                  }
                }
              }
            ],
            "databaseRestriction": {
              "aggregate": [
                {
                  "&project": {
                    "pessoa": 0
                  }
                }
              ],
              "restriction": {
                "pessoa": "${param.MPI}"
              }
            },
            "operationSchema": "",
            "resource": "",
            "singleResource": false
          }
        },
        "leafStructure": {
          "descricao": "É filho e não terá filhos (leaf node) */vacinas",
          "childNode": {

          },
          "parentNode": {
            "databaseRestriction": {
              "aggregate": [
                {
                  "&project": {
                    "pessoa": 0
                  }
                }
              ],
              "restriction": {
                "_id": "${param.TEMPLATE_ID}",
                "pessoa": "${param.MPI}"
              }
            },
            "operationSchema": "",
            "resource": "",
            "singleResource": false
          }
        }
      },
      "routes": {
        "rootStructure": {
          "descricao": "Tem filho mas não é um filho (root node with leaf node) /vacinas/*",
          "childNode": {
            "methods": [
              "SEARCH",
              "UPDATE",
              "DELETE"
            ],
            "operation": "",
            "parameters": {
              "TEMPLATE_ID": {
                "field": "TEMPLATE_ID",
                "validation": {
                  "type": "ObjectId"
                }
              }
            },
            "parent": {
              "route": "",
              "validateAccess": true,
              "validateExistence": false
            },
            "path": "/(:TEMPLATE_ID)",
            "version": 1
          },
          "parentNode": {
            "methods": [
              "SEARCH",
              "CREATE"
            ],
            "operation": "",
            "path": "/template",
            "version": 1
          }
        },
        "parentStructure": {
          "descricao": "É filho e terá filhos (parent node) */vacinas/*",
          "childNode": {
            "methods": [
              "SEARCH",
              "UPDATE",
              "DELETE"
            ],
            "operation": "",
            "parameters": {
              "MPI": {
                "field": "MPI",
                "validation": {
                  "type": "string"
                }
              },
              "TEMPLATE_ID": {
                "field": "TEMPLATE_ID",
                "validation": {
                  "type": "ObjectId"
                }
              }
            },
            "parent": {
              "route": "",
              "validateAccess": true,
              "validateExistence": false
            },
            "path": "/(:TEMPLATE_ID)",
            "version": 1
          },
          "parentNode": {
            "methods": [
              "SEARCH",
              "CREATE"
            ],
            "operation": "",
            "parameters": {
              "MPI": {
                "field": "MPI",
                "validation": {
                  "type": "string"
                }
              }
            },
            "parent": {
              "route": ObjectId("5c9d2360382ccf2d4c023b4c"),
              "validateAccess": true,
              "validateExistence": true
            },
            "path": "/template",
            "version": 1
          }
        },
        "leafStructure": {
          "descricao": "É filho e não terá filhos (leaf node) */vacinas",
          "childNode": {

          },
          "parentNode": {
            "methods": [
              "SEARCH"
            ],
            "operation": "",
            "parameters": {
              "MPI": {
                "field": "MPI",
                "validation": {
                  "type": "string"
                }
              }
            },
            "parent": {
              "route": ObjectId("5c9d2360382ccf2d4c023b4c"),
              "validateAccess": true,
              "validateExistence": false
            },
            "path": "/template",
            "version": 1
          }
        }
      }
    }
  }
);