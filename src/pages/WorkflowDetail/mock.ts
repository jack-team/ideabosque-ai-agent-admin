export const nodes: any[] = [
  {
    "id": "branch_bd2bea47-1d1b-49a7-a392-81bb8caac509",
    "type": "branch",
    "data": {
      "values": {
        "formData": {
          "branchName": {
            "_type_": "text",
            "value": "Start with..."
          },
          "text": {
            "_type_": "text",
            "value": "Hello, Are you a new business buyer?"
          },
          "conditions": {
            "_type_": "formList",
            "value": [
              {
                "label": "If yes",
                "condition": "yes"
              },
              {
                "label": "Otherwise",
                "condition": "otherwise"
              }
            ]
          }
        },
        "schemas": [
          {
            "title": "Branch Name",
            "name": "branchName",
            "rules": [
              {
                "required": true
              }
            ]
          },
          {
            "title": "Text",
            "name": "text",
            "rules": [
              {
                "required": true
              }
            ]
          },
          {
            "name": "conditions",
            "valueType": "formList",
            "initialValue": [
              {}
            ],
            "columns": [
              {
                "valueType": "group",
                "columns": [
                  {
                    "title": "Condition Label",
                    "name": "label",
                    "rules": [
                      {
                        "required": true
                      }
                    ]
                  },
                  {
                    "title": "Condition Code",
                    "name": "condition",
                    "rules": [
                      {
                        "required": true
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        "nodeType": "branch"
      },
      "connectionTypes": [
        "source"
      ]
    },
    "position": {
      "x": -691.6856848259472,
      "y": -110.2837182204613
    },
    "measured": {
      "width": 259,
      "height": 132
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "branch_5046950b-ebd2-4d34-be17-de674bec2ddc",
    "type": "branch",
    "data": {
      "values": {
        "formData": {
          "branchName": {
            "_type_": "text",
            "value": "Ask question..."
          },
          "text": {
            "_type_": "text",
            "value": "Great! Would you like to onboard as a new business buyer?"
          },
          "conditions": {
            "_type_": "formList",
            "value": [
              {
                "label": "If yes",
                "condition": "yes"
              }
            ]
          }
        },
        "schemas": [
          {
            "title": "Branch Name",
            "name": "branchName",
            "rules": [
              {
                "required": true
              }
            ]
          },
          {
            "title": "Text",
            "name": "text",
            "rules": [
              {
                "required": true
              }
            ]
          },
          {
            "name": "conditions",
            "valueType": "formList",
            "initialValue": [
              {}
            ],
            "columns": [
              {
                "valueType": "group",
                "columns": [
                  {
                    "title": "Condition Label",
                    "name": "label",
                    "rules": [
                      {
                        "required": true
                      }
                    ]
                  },
                  {
                    "title": "Condition Code",
                    "name": "condition",
                    "rules": [
                      {
                        "required": true
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        "nodeType": "branch"
      }
    },
    "position": {
      "x": -142.4522484483958,
      "y": -171.17784898673415
    },
    "measured": {
      "width": 260,
      "height": 121
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "branch_2a87f584-ec86-452d-b332-3b53645d0fa4",
    "type": "branch",
    "data": {
      "values": {
        "formData": {
          "branchName": {
            "_type_": "text",
            "value": "Request submission..."
          },
          "text": {
            "_type_": "text",
            "value": "Do you have any requests to submit to our team? Please say 'no' if not, or describe your request in detail."
          },
          "conditions": {
            "_type_": "formList",
            "value": [
              {
                "label": "Yes",
                "condition": "yes"
              }
            ]
          }
        },
        "schemas": [
          {
            "title": "Branch Name",
            "name": "branchName",
            "rules": [
              {
                "required": true
              }
            ]
          },
          {
            "title": "Text",
            "name": "text",
            "rules": [
              {
                "required": true
              }
            ]
          },
          {
            "name": "conditions",
            "valueType": "formList",
            "initialValue": [
              {}
            ],
            "columns": [
              {
                "valueType": "group",
                "columns": [
                  {
                    "title": "Condition Label",
                    "name": "label",
                    "rules": [
                      {
                        "required": true
                      }
                    ]
                  },
                  {
                    "title": "Condition Code",
                    "name": "condition",
                    "rules": [
                      {
                        "required": true
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        "nodeType": "branch"
      },
      "connectionEnable": true,
      "connectionTypes": [
        "target"
      ]
    },
    "position": {
      "x": 218.1686612974995,
      "y": 215.61525222590546
    },
    "measured": {
      "width": 260,
      "height": 110
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "ui_f3fa1cb4-3cca-413e-8174-2b89badd9276",
    "type": "ui",
    "data": {
      "values": {
        "formData": {
          "name": {
            "_type_": "select",
            "value": "GooglePlace",
            "label": "Google Place"
          },
          "text": {
            "_type_": "text",
            "value": "Hello, I am a B2B customer onboarding assistant, please share your geo information or any relevant details that can help us identify your location."
          },
          "waitFor": {
            "_type_": "text",
            "value": "palce_uuid"
          },
          "keyword": {
            "_type_": "text",
            "value": "establishment"
          },
          "googleApiKey": {
            "_type_": "text",
            "value": "AIzaSyD8hKTUTxuhhFKZERlASRC60_ABvvgwcck"
          }
        },
        "schemas": [
          {
            "valueType": "select",
            "title": "Component",
            "name": "name",
            "rules": [
              {
                "required": true,
                "message": "Please select Component"
              }
            ],
            "valueEnum": {
              "UploadFile": "Upload File",
              "GooglePlace": "Google Place",
              "QuestionGroup": "Question Group"
            }
          },
          {
            "dependencys": [
              {
                "name": "name",
                "values": [
                  "UploadFile",
                  "GooglePlace",
                  "QuestionGroup"
                ],
                "renders": [
                  {
                    "title": "Text",
                    "name": "text",
                    "tooltip": "Description information of the selection component."
                  },
                  {
                    "title": "Wait For",
                    "name": "waitFor",
                    "tooltip": "Wait for the data output by the UI component.",
                    "rules": [
                      {
                        "required": true
                      }
                    ]
                  }
                ]
              },
              {
                "name": "name",
                "values": [
                  "UploadFile"
                ],
                "renders": [
                  {
                    "title": "Question",
                    "name": "question"
                  },
                  {
                    "title": "Contact uuid",
                    "name": "contactUuid",
                    "rules": [
                      {
                        "required": true
                      }
                    ]
                  }
                ]
              },
              {
                "name": "name",
                "values": [
                  "GooglePlace"
                ],
                "renders": [
                  {
                    "title": "Keyword",
                    "name": "keyword",
                    "tooltip": "The default search keywords for Google Place.",
                    "rules": [
                      {
                        "required": true
                      }
                    ]
                  },
                  {
                    "title": "Google Api Key",
                    "name": "googleApiKey",
                    "rules": [
                      {
                        "required": true
                      }
                    ]
                  }
                ]
              },
              {
                "name": "name",
                "values": [
                  "QuestionGroup"
                ],
                "renders": [
                  {
                    "title": "Question Group uuid",
                    "name": "questionGroupUuid",
                    "rules": [
                      {
                        "required": true
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        "nodeType": "ui"
      }
    },
    "position": {
      "x": 396.6369683321207,
      "y": -93.86353254167548
    },
    "measured": {
      "width": 260,
      "height": 149
    },
    "selected": true,
    "dragging": false
  }
];

export const edges: any[] = [
  {
    "source": "branch_bd2bea47-1d1b-49a7-a392-81bb8caac509",
    "sourceHandle": "yes",
    "target": "branch_5046950b-ebd2-4d34-be17-de674bec2ddc",
    "id": "xy-edge__branch_bd2bea47-1d1b-49a7-a392-81bb8caac509yes-branch_5046950b-ebd2-4d34-be17-de674bec2ddc",
    "style": {
      "stroke": "#0143EC",
      "strokeWidth": 2
    },
    "markerEnd": {
      "color": "#0143EC",
      "type": "arrowclosed"
    }
  },
  {
    "source": "branch_bd2bea47-1d1b-49a7-a392-81bb8caac509",
    "sourceHandle": "otherwise",
    "target": "branch_2a87f584-ec86-452d-b332-3b53645d0fa4",
    "id": "xy-edge__branch_bd2bea47-1d1b-49a7-a392-81bb8caac509otherwise-branch_2a87f584-ec86-452d-b332-3b53645d0fa4",
    "style": {
      "stroke": "#0143EC",
      "strokeWidth": 2
    },
    "markerEnd": {
      "color": "#0143EC",
      "type": "arrowclosed"
    }
  },
  {
    "source": "branch_5046950b-ebd2-4d34-be17-de674bec2ddc",
    "sourceHandle": "yes",
    "target": "branch_2a87f584-ec86-452d-b332-3b53645d0fa4",
    "id": "xy-edge__branch_5046950b-ebd2-4d34-be17-de674bec2ddcyes-branch_2a87f584-ec86-452d-b332-3b53645d0fa4",
    "style": {
      "stroke": "#0143EC",
      "strokeWidth": 2
    },
    "markerEnd": {
      "color": "#0143EC",
      "type": "arrowclosed"
    }
  },
  {
    "source": "branch_5046950b-ebd2-4d34-be17-de674bec2ddc",
    "sourceHandle": "yes",
    "target": "ui_f3fa1cb4-3cca-413e-8174-2b89badd9276",
    "id": "xy-edge__branch_5046950b-ebd2-4d34-be17-de674bec2ddcyes-ui_f3fa1cb4-3cca-413e-8174-2b89badd9276",
    "style": {
      "stroke": "#0143EC",
      "strokeWidth": 2
    },
    "markerEnd": {
      "color": "#0143EC",
      "type": "arrowclosed"
    }
  }
];