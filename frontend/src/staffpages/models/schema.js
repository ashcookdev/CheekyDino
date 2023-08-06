export const schema = {
    "models": {
        "HomePage": {
            "name": "HomePage",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "TopSectionTitle": {
                    "name": "TopSectionTitle",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "TopSectionPic": {
                    "name": "TopSectionPic",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "TopSectionWriting": {
                    "name": "TopSectionWriting",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "EventTitle": {
                    "name": "EventTitle",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "EventPic": {
                    "name": "EventPic",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "EventWriting": {
                    "name": "EventWriting",
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
            "pluralName": "HomePages",
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
                            }
                        ]
                    }
                }
            ]
        },
        "CustomerScreen": {
            "name": "CustomerScreen",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "Message": {
                    "name": "Message",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "Show": {
                    "name": "Show",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "Number": {
                    "name": "Number",
                    "isArray": false,
                    "type": "Int",
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
            "pluralName": "CustomerScreens",
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
        "Extras": {
            "name": "Extras",
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
                "Price": {
                    "name": "Price",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "Kitchen": {
                    "name": "Kitchen",
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
            "pluralName": "Extras",
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
                            }
                        ]
                    }
                }
            ]
        },
        "Breakfast": {
            "name": "Breakfast",
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
                "Price": {
                    "name": "Price",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "WhiteBread": {
                    "name": "WhiteBread",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "BrownBread": {
                    "name": "BrownBread",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "Egg": {
                    "name": "Egg",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "Fried": {
                    "name": "Fried",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "Scrambled": {
                    "name": "Scrambled",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "Sausage": {
                    "name": "Sausage",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "Bacon": {
                    "name": "Bacon",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "HashBrown": {
                    "name": "HashBrown",
                    "isArray": false,
                    "type": "Int",
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
            "pluralName": "Breakfasts",
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
                            }
                        ]
                    }
                }
            ]
        },
        "KidsMenu": {
            "name": "KidsMenu",
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
                "Price": {
                    "name": "Price",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "Description": {
                    "name": "Description",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "Beans": {
                    "name": "Beans",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "Notes": {
                    "name": "Notes",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "Kitchen": {
                    "name": "Kitchen",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "imageSrc": {
                    "name": "imageSrc",
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
            "pluralName": "KidsMenus",
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
                            }
                        ]
                    }
                }
            ]
        },
        "TimeEntry": {
            "name": "TimeEntry",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "Staff": {
                    "name": "Staff",
                    "isArray": true,
                    "type": {
                        "model": "TimeEntryStaff"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": [
                            "timeEntry"
                        ]
                    }
                },
                "StaffID": {
                    "name": "StaffID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "ClockInTime": {
                    "name": "ClockInTime",
                    "isArray": false,
                    "type": "AWSTime",
                    "isRequired": false,
                    "attributes": []
                },
                "ClockOutTime": {
                    "name": "ClockOutTime",
                    "isArray": false,
                    "type": "AWSTime",
                    "isRequired": false,
                    "attributes": []
                },
                "Hours": {
                    "name": "Hours",
                    "isArray": false,
                    "type": "Float",
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
                "ShiftStart": {
                    "name": "ShiftStart",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "ShiftFinish": {
                    "name": "ShiftFinish",
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
            "pluralName": "TimeEntries",
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
        "Staff": {
            "name": "Staff",
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
                "TimeEntries": {
                    "name": "TimeEntries",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "timeentriess": {
                    "name": "timeentriess",
                    "isArray": true,
                    "type": {
                        "model": "TimeEntryStaff"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": [
                            "staff"
                        ]
                    }
                },
                "Role": {
                    "name": "Role",
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
            "pluralName": "Staff",
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
                            }
                        ]
                    }
                }
            ]
        },
        "Confectionary": {
            "name": "Confectionary",
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
                "Price": {
                    "name": "Price",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "Kitchen": {
                    "name": "Kitchen",
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
            "pluralName": "Confectionaries",
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
        "SoftDrinks": {
            "name": "SoftDrinks",
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
                "Price": {
                    "name": "Price",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "Kitchen": {
                    "name": "Kitchen",
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
            "pluralName": "SoftDrinks",
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
        "HotDrinks": {
            "name": "HotDrinks",
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
                "Price": {
                    "name": "Price",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "Syrup": {
                    "name": "Syrup",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "Kitchen": {
                    "name": "Kitchen",
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
            "pluralName": "HotDrinks",
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
                "CafeOrders": {
                    "name": "CafeOrders",
                    "isArray": true,
                    "type": {
                        "model": "CafeOrder"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": [
                            "sessionsID"
                        ]
                    }
                },
                "orderid": {
                    "name": "orderid",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "Age": {
                    "name": "Age",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "ExtraNames": {
                    "name": "ExtraNames",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
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
                "Delieved": {
                    "name": "Delieved",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "sessionsID": {
                    "name": "sessionsID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "Sessionid": {
                    "name": "Sessionid",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "TimeDelivered": {
                    "name": "TimeDelivered",
                    "isArray": false,
                    "type": "AWSTime",
                    "isRequired": false,
                    "attributes": []
                },
                "Notes": {
                    "name": "Notes",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "Kitchen": {
                    "name": "Kitchen",
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
                    "type": "key",
                    "properties": {
                        "name": "bySessions",
                        "fields": [
                            "sessionsID"
                        ]
                    }
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
                "orderID": {
                    "name": "orderID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "sessionID": {
                    "name": "sessionID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "partyID": {
                    "name": "partyID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "delivered": {
                    "name": "delivered",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
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
                "Table": {
                    "name": "Table",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "PartyFoodDelivered": {
                    "name": "PartyFoodDelivered",
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
        },
        "TimeEntryStaff": {
            "name": "TimeEntryStaff",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "timeEntryId": {
                    "name": "timeEntryId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "staffId": {
                    "name": "staffId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "timeEntry": {
                    "name": "timeEntry",
                    "isArray": false,
                    "type": {
                        "model": "TimeEntry"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetNames": [
                            "timeEntryId"
                        ]
                    }
                },
                "staff": {
                    "name": "staff",
                    "isArray": false,
                    "type": {
                        "model": "Staff"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetNames": [
                            "staffId"
                        ]
                    }
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
            "pluralName": "TimeEntryStaffs",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byTimeEntry",
                        "fields": [
                            "timeEntryId"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byStaff",
                        "fields": [
                            "staffId"
                        ]
                    }
                }
            ]
        }
    },
    "enums": {},
    "nonModels": {},
    "codegenVersion": "3.4.4",
    "version": "beb92f3c6b079700a571a8021adb3e48"
};