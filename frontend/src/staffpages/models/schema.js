export const schema = {
    "models": {
        "Sessions": {
            "name": "Sessions",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "Name": {
                    "name": "Name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "Email": {
                    "name": "Email",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "TimeslotFrom": {
                    "name": "TimeslotFrom",
                    "isArray": false,
                    "type": "AWSTime",
                    "isRequired": false,
                    "attributes": []
                },
                "TimeslotTo": {
                    "name": "TimeslotTo",
                    "isArray": false,
                    "type": "AWSTime",
                    "isRequired": false,
                    "attributes": []
                },
                "TimeLeft": {
                    "name": "TimeLeft",
                    "isArray": false,
                    "type": "AWSTime",
                    "isRequired": false,
                    "attributes": []
                },
                "TimeArrived": {
                    "name": "TimeArrived",
                    "isArray": false,
                    "type": "AWSTime",
                    "isRequired": false,
                    "attributes": []
                },
                "Date": {
                    "name": "Date",
                    "isArray": false,
                    "type": "AWSDate",
                    "isRequired": false,
                    "attributes": []
                },
                "Table": {
                    "name": "Table",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "Orders": {
                    "name": "Orders",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "Prepaid": {
                    "name": "Prepaid",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "TotalSpent": {
                    "name": "TotalSpent",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "CafeOrderID": {
                    "name": "CafeOrderID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "Adults": {
                    "name": "Adults",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "Children": {
                    "name": "Children",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "Arrived": {
                    "name": "Arrived",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "LeftCenter": {
                    "name": "LeftCenter",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "ExtraTables": {
                    "name": "ExtraTables",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "Telephone": {
                    "name": "Telephone",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Sessions",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "identityClaim": "cognito:username",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "allow": "public",
                                "operations": [
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "CafeOrder": {
            "name": "CafeOrder",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "CreatedTime": {
                    "name": "CreatedTime",
                    "isArray": false,
                    "type": "AWSTime",
                    "isRequired": false,
                    "attributes": []
                },
                "CreatedDate": {
                    "name": "CreatedDate",
                    "isArray": false,
                    "type": "AWSDate",
                    "isRequired": false,
                    "attributes": []
                },
                "Total": {
                    "name": "Total",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "DrinkItems": {
                    "name": "DrinkItems",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "HotItems": {
                    "name": "HotItems",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "Table": {
                    "name": "Table",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "Completed": {
                    "name": "Completed",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "CafeOrders",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "identityClaim": "cognito:username",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Messages": {
            "name": "Messages",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "content": {
                    "name": "content",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSTime",
                    "isRequired": false,
                    "attributes": []
                },
                "email": {
                    "name": "email",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "group": {
                    "name": "group",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Messages",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admin"
                                ],
                                "operations": [
                                    "read",
                                    "create",
                                    "update",
                                    "delete"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "PartHosts"
                                ],
                                "operations": [
                                    "read",
                                    "create"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Staff"
                                ],
                                "operations": [
                                    "read",
                                    "create"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "TeamLeader"
                                ],
                                "operations": [
                                    "read",
                                    "create"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Developer"
                                ],
                                "operations": [
                                    "read",
                                    "create",
                                    "update",
                                    "delete"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "SuperUser"
                                ],
                                "operations": [
                                    "read",
                                    "create",
                                    "update",
                                    "delete"
                                ]
                            },
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "operations": [
                                    "create",
                                    "read"
                                ],
                                "identityClaim": "cognito:username"
                            }
                        ]
                    }
                }
            ]
        },
        "PartyAdultFood": {
            "name": "PartyAdultFood",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "ChickenNugget": {
                    "name": "ChickenNugget",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "CocktailSausage": {
                    "name": "CocktailSausage",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "OnionRings": {
                    "name": "OnionRings",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "FishFingers": {
                    "name": "FishFingers",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "MozzarellaSticks": {
                    "name": "MozzarellaSticks",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "GarlicBread": {
                    "name": "GarlicBread",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "GarlicMushrooms": {
                    "name": "GarlicMushrooms",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "TraySandwiches": {
                    "name": "TraySandwiches",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "PepperoniPizza": {
                    "name": "PepperoniPizza",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "MargheritaPizza": {
                    "name": "MargheritaPizza",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "BBQChickenPizza": {
                    "name": "BBQChickenPizza",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "VegPizza": {
                    "name": "VegPizza",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "AdultFoodComplete": {
                    "name": "AdultFoodComplete",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "PartyAdultFoods",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Staff"
                                ],
                                "operations": [
                                    "read",
                                    "update"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Developer"
                                ],
                                "operations": [
                                    "read",
                                    "create",
                                    "update",
                                    "delete"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "PartHosts"
                                ],
                                "operations": [
                                    "read",
                                    "update",
                                    "create"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "TeamLeader"
                                ],
                                "operations": [
                                    "read",
                                    "create",
                                    "update",
                                    "delete"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "SuperUser"
                                ],
                                "operations": [
                                    "read",
                                    "create",
                                    "update",
                                    "delete"
                                ]
                            },
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "identityClaim": "cognito:username",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "PartyGuests": {
            "name": "PartyGuests",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "ChildName": {
                    "name": "ChildName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "FoodOption": {
                    "name": "FoodOption",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "Allergies": {
                    "name": "Allergies",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "ContactInfoEmail": {
                    "name": "ContactInfoEmail",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "partybookingID": {
                    "name": "partybookingID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "ArrivalTime": {
                    "name": "ArrivalTime",
                    "isArray": false,
                    "type": "AWSTime",
                    "isRequired": false,
                    "attributes": []
                },
                "SweetConeColour": {
                    "name": "SweetConeColour",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "TeddyTasticBear": {
                    "name": "TeddyTasticBear",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "Completed": {
                    "name": "Completed",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "Arrived": {
                    "name": "Arrived",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "PartyGuests",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byPartyBooking",
                        "fields": [
                            "partybookingID"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "identityClaim": "cognito:username",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "PartHosts"
                                ],
                                "operations": [
                                    "read",
                                    "update"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Staff"
                                ],
                                "operations": [
                                    "create",
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Developer"
                                ],
                                "operations": [
                                    "read",
                                    "create",
                                    "update",
                                    "delete"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "SuperUser"
                                ],
                                "operations": [
                                    "read",
                                    "create",
                                    "update",
                                    "delete"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "TeamLeader"
                                ],
                                "operations": [
                                    "read",
                                    "update"
                                ]
                            },
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "PartyBooking": {
            "name": "PartyBooking",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "PartyType": {
                    "name": "PartyType",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "ChildName": {
                    "name": "ChildName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "ChildAge": {
                    "name": "ChildAge",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "PartyDate": {
                    "name": "PartyDate",
                    "isArray": false,
                    "type": "AWSDate",
                    "isRequired": true,
                    "attributes": []
                },
                "PartyTime": {
                    "name": "PartyTime",
                    "isArray": false,
                    "type": "AWSTime",
                    "isRequired": true,
                    "attributes": []
                },
                "NoOfChildren": {
                    "name": "NoOfChildren",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "ThirdPartyContactedDate": {
                    "name": "ThirdPartyContactedDate",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "FoodOptionSelected": {
                    "name": "FoodOptionSelected",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "Total": {
                    "name": "Total",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "PartyGuests": {
                    "name": "PartyGuests",
                    "isArray": true,
                    "type": {
                        "model": "PartyGuests"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": [
                            "partybookingID"
                        ]
                    }
                },
                "AdultHotFoodQty": {
                    "name": "AdultHotFoodQty",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "AdultColdFoodQty": {
                    "name": "AdultColdFoodQty",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "PartyAdultFood": {
                    "name": "PartyAdultFood",
                    "isArray": false,
                    "type": {
                        "model": "PartyAdultFood"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": [
                            "id"
                        ],
                        "targetNames": [
                            "partyBookingPartyAdultFoodId"
                        ]
                    }
                },
                "SweetConesSelected": {
                    "name": "SweetConesSelected",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "CharacterSelected": {
                    "name": "CharacterSelected",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "BearVoiceRecorders": {
                    "name": "BearVoiceRecorders",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "PartyFoodPrepared": {
                    "name": "PartyFoodPrepared",
                    "isArray": false,
                    "type": "AWSTime",
                    "isRequired": false,
                    "attributes": []
                },
                "PartyHostAssigned": {
                    "name": "PartyHostAssigned",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "PartyChildMumArrived": {
                    "name": "PartyChildMumArrived",
                    "isArray": false,
                    "type": "AWSTime",
                    "isRequired": false,
                    "attributes": []
                },
                "PartyFoodTimeDue": {
                    "name": "PartyFoodTimeDue",
                    "isArray": false,
                    "type": "AWSTime",
                    "isRequired": false,
                    "attributes": []
                },
                "PartyFinish": {
                    "name": "PartyFinish",
                    "isArray": false,
                    "type": "AWSTime",
                    "isRequired": false,
                    "attributes": []
                },
                "partybookingID": {
                    "name": "partybookingID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "PartyFoodComplete": {
                    "name": "PartyFoodComplete",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "LeftBranch": {
                    "name": "LeftBranch",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "CurrentGuests": {
                    "name": "CurrentGuests",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "LeftBranchTime": {
                    "name": "LeftBranchTime",
                    "isArray": false,
                    "type": "AWSTime",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "partyBookingPartyAdultFoodId": {
                    "name": "partyBookingPartyAdultFoodId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "PartyBookings",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "identityClaim": "cognito:username",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "PartHosts"
                                ],
                                "operations": [
                                    "read",
                                    "update",
                                    "create"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "TeamLeader"
                                ],
                                "operations": [
                                    "create",
                                    "read",
                                    "update"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "SuperUser"
                                ],
                                "operations": [
                                    "read",
                                    "create",
                                    "update",
                                    "delete"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Staff"
                                ],
                                "operations": [
                                    "create",
                                    "read",
                                    "update"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Developer"
                                ],
                                "operations": [
                                    "read",
                                    "create",
                                    "update",
                                    "delete"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admin"
                                ],
                                "operations": [
                                    "read",
                                    "create",
                                    "update",
                                    "delete"
                                ]
                            },
                            {
                                "allow": "public",
                                "operations": [
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {},
    "nonModels": {},
    "codegenVersion": "3.4.3",
    "version": "af0fa08e54eb06a4cb90e7ec78b86378"
};