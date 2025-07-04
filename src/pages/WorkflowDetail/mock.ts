export const nodes: any[] = [
  {
    "id": "step_c32f2ee5-23ff-4649-b17b-c3a7432bdbe1",
    "type": "step",
    "data": {
      "values": {
        "formData": {
          "name": {
            "_type_": "text",
            "value": "Initial Conversation"
          },
          "description": {
            "_type_": "text",
            "value": "step0: Initial Conversation"
          },
          "conditions": {
            "_type_": "formList"
          }
        },
        "nodeType": "step",
        "autoOpenStepCanvas": false,
        "stepRealData": {
          "nodes": [
            {
              "id": "ui_b82f4b7e-e2df-4a1e-adf2-9884942fadb3",
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
                      "value": "Hello, I am a B2B customer onboarding assistant, please confirm your location or any relevant details that can help us identify where you are purchasing from"
                    },
                    "waitFor": {
                      "_type_": "text",
                      "value": "place_uuid"
                    },
                    "keyword": {
                      "_type_": "text",
                      "value": "{keyword}"
                    },
                    "googleApiKey": {
                      "_type_": "text",
                      "value": "{google_api_key}"
                    }
                  },
                  "nodeType": "ui"
                },
                "connectionTypes": [
                  "source"
                ]
              },
              "position": {
                "x": -311.15393863779093,
                "y": -45.89820217000537
              },
              "measured": {
                "width": 260,
                "height": 149
              },
              "selected": false,
              "dragging": false
            },
            {
              "id": "action_ea78eee3-9b69-4d28-85b2-ae954927c332",
              "type": "action",
              "data": {
                "values": {
                  "formData": {
                    "type": {
                      "_type_": "text",
                      "value": "call_function"
                    },
                    "text": {
                      "_type_": "text",
                      "value": "get_google_place_setting"
                    }
                  },
                  "nodeType": "action"
                },
                "connectionEnable": true,
                "connectionTypes": [
                  "target"
                ]
              },
              "position": {
                "x": 90.01797829994632,
                "y": -12.563870042230574
              },
              "measured": {
                "width": 195,
                "height": 92
              },
              "selected": true,
              "dragging": false
            }
          ],
          "edges": [
            {
              "source": "ui_b82f4b7e-e2df-4a1e-adf2-9884942fadb3",
              "target": "action_ea78eee3-9b69-4d28-85b2-ae954927c332",
              "id": "xy-edge__ui_b82f4b7e-e2df-4a1e-adf2-9884942fadb3-action_ea78eee3-9b69-4d28-85b2-ae954927c332",
              "style": {
                "stroke": "#0143EC",
                "strokeWidth": 2
              },
              "markerEnd": {
                "color": "#0143EC",
                "type": "arrowclosed"
              }
            }
          ]
        }
      },
      "connectionTypes": [
        "source"
      ]
    },
    "position": {
      "x": -234.1323204269848,
      "y": 80.00784101819448
    },
    "measured": {
      "width": 195,
      "height": 72
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "step_eea5c0bf-3e25-4450-bcae-1a2a25fd8917",
    "type": "step",
    "data": {
      "values": {
        "formData": {
          "name": {
            "_type_": "text",
            "value": "Initial Conversation"
          },
          "description": {
            "_type_": "text",
            "value": "step1: Initial Conversation"
          },
          "conditions": {
            "_type_": "formList",
            "value": [
              {
                "condition": "yes"
              },
              {
                "condition": "no_or_unsure"
              },
              {
                "condition": "off_topic"
              }
            ]
          }
        },
        "nodeType": "step",
        "autoOpenStepCanvas": false,
        "stepRealData": {
          "nodes": [
            {
              "id": "branch_45eacced-962c-43f4-a87a-bc7370c4f2b7",
              "type": "branch",
              "data": {
                "values": {
                  "formData": {
                    "name": {
                      "_type_": "text",
                      "value": "step1 start"
                    },
                    "text": {
                      "_type_": "text",
                      "value": "Are you purchasing from us for the first time?"
                    },
                    "conditions": {
                      "_type_": "formList",
                      "value": [
                        {
                          "condition": "yes"
                        },
                        {
                          "condition": "off_topic"
                        }
                      ]
                    }
                  },
                  "nodeType": "branch"
                },
                "connectionTypes": [
                  "source"
                ]
              },
              "position": {
                "x": -193.5,
                "y": -20
              },
              "measured": {
                "width": 260,
                "height": 151
              },
              "selected": false,
              "dragging": false
            },
            {
              "id": "branch_dde0581a-8565-45dd-9b21-d99a0ad8c0fa",
              "type": "branch",
              "data": {
                "values": {
                  "formData": {
                    "name": {
                      "_type_": "text",
                      "value": "Step1 end"
                    },
                    "text": {
                      "_type_": "text",
                      "value": "Would you like to become a wholesale buyer?"
                    },
                    "conditions": {
                      "_type_": "formList",
                      "value": [
                        {
                          "condition": "yes"
                        },
                        {
                          "condition": "no_or_unsure"
                        }
                      ]
                    }
                  },
                  "nodeType": "branch"
                }
              },
              "position": {
                "x": 148.5,
                "y": -116.5
              },
              "measured": {
                "width": 260,
                "height": 151
              },
              "selected": false,
              "dragging": false
            },
            {
              "id": "prompt_1c327b93-9549-482d-9e2e-56b1b8340c8b",
              "type": "prompt",
              "data": {
                "values": {
                  "formData": {
                    "type": {
                      "_type_": "radio",
                      "value": "text"
                    },
                    "text": {
                      "_type_": "text",
                      "value": "I can only help with onboarding and request submission right now. Let's continue the current process."
                    }
                  },
                  "nodeType": "prompt"
                }
              },
              "position": {
                "x": 164.43621761017735,
                "y": 100.93407667932769
              },
              "measured": {
                "width": 260,
                "height": 111
              },
              "selected": true,
              "dragging": false
            }
          ],
          "edges": [
            {
              "source": "branch_45eacced-962c-43f4-a87a-bc7370c4f2b7",
              "sourceHandle": "yes",
              "target": "branch_dde0581a-8565-45dd-9b21-d99a0ad8c0fa",
              "id": "xy-edge__branch_45eacced-962c-43f4-a87a-bc7370c4f2b7yes-branch_dde0581a-8565-45dd-9b21-d99a0ad8c0fa",
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
              "source": "branch_45eacced-962c-43f4-a87a-bc7370c4f2b7",
              "sourceHandle": "off_topic",
              "target": "prompt_1c327b93-9549-482d-9e2e-56b1b8340c8b",
              "id": "xy-edge__branch_45eacced-962c-43f4-a87a-bc7370c4f2b7off_topic-prompt_1c327b93-9549-482d-9e2e-56b1b8340c8b",
              "style": {
                "stroke": "#0143EC",
                "strokeWidth": 2
              },
              "markerEnd": {
                "color": "#0143EC",
                "type": "arrowclosed"
              }
            }
          ]
        }
      }
    },
    "position": {
      "x": 32.656906097353556,
      "y": 36.58368039413979
    },
    "measured": {
      "width": 193,
      "height": 162
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "step_0c37c9c6-433b-4d4d-b43d-b464cfd07263",
    "type": "step",
    "data": {
      "values": {
        "formData": {
          "name": {
            "_type_": "text",
            "value": "Onboarding – Profile-Based Question Intake"
          },
          "description": {
            "_type_": "text",
            "value": "step2: Onboarding – Profile-Based Question Intake"
          },
          "conditions": {
            "_type_": "formList"
          }
        },
        "nodeType": "step",
        "autoOpenStepCanvas": false,
        "stepRealData": {
          "nodes": [
            {
              "id": "action_998bb8c6-776c-4e6e-b690-ee3b9330d0e0",
              "type": "action",
              "data": {
                "values": {
                  "formData": {
                    "type": {
                      "_type_": "text",
                      "value": "call_function"
                    },
                    "text": {
                      "_type_": "text",
                      "value": "get_question_group"
                    }
                  },
                  "nodeType": "action"
                },
                "connectionTypes": [
                  "source"
                ]
              },
              "position": {
                "x": -227,
                "y": -24
              },
              "measured": {
                "width": 161,
                "height": 92
              },
              "selected": false,
              "dragging": false
            },
            {
              "id": "ui_62d0ac34-e875-49dd-bb8e-e53a8250152d",
              "type": "ui",
              "data": {
                "values": {
                  "formData": {
                    "name": {
                      "_type_": "select",
                      "value": "QuestionGroup",
                      "label": "Question Group"
                    },
                    "text": {
                      "_type_": "text",
                      "value": "Please enter  form"
                    },
                    "waitFor": {
                      "_type_": "text",
                      "value": "all_required_responses"
                    },
                    "questionGroupUuid": {
                      "_type_": "text",
                      "value": "{question_group_uuid}"
                    }
                  },
                  "nodeType": "ui"
                }
              },
              "position": {
                "x": 45.5,
                "y": -13.5
              },
              "measured": {
                "width": 160,
                "height": 73
              },
              "selected": true,
              "dragging": false
            }
          ],
          "edges": [
            {
              "source": "action_998bb8c6-776c-4e6e-b690-ee3b9330d0e0",
              "target": "ui_62d0ac34-e875-49dd-bb8e-e53a8250152d",
              "id": "xy-edge__action_998bb8c6-776c-4e6e-b690-ee3b9330d0e0-ui_62d0ac34-e875-49dd-bb8e-e53a8250152d",
              "style": {
                "stroke": "#0143EC",
                "strokeWidth": 2
              },
              "markerEnd": {
                "color": "#0143EC",
                "type": "arrowclosed"
              }
            }
          ]
        }
      }
    },
    "position": {
      "x": 257.78138550614386,
      "y": -106.70240114957446
    },
    "measured": {
      "width": 260,
      "height": 104
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "step_91c3ea32-fbd2-4991-a264-6cd663936f59",
    "type": "step",
    "data": {
      "values": {
        "formData": {
          "name": {
            "_type_": "text",
            "value": "Compile & Submit Responses"
          },
          "description": {
            "_type_": "text",
            "value": "step3: Compile & Submit Responses"
          },
          "conditions": {
            "_type_": "formList"
          }
        },
        "nodeType": "step",
        "autoOpenStepCanvas": false,
        "stepRealData": {
          "nodes": [
            {
              "id": "transform_520c627b-7a99-4b16-9525-34f6b4104e67",
              "type": "transform",
              "data": {
                "values": {
                  "formData": {
                    "type": {
                      "_type_": "text",
                      "value": "structure_input"
                    },
                    "text": {
                      "_type_": "text",
                      "value": "json"
                    }
                  },
                  "nodeType": "transform"
                },
                "connectionTypes": [
                  "source"
                ]
              },
              "position": {
                "x": -175.5,
                "y": -25.5
              },
              "measured": {
                "width": 160,
                "height": 92
              },
              "selected": false,
              "dragging": false
            },
            {
              "id": "action_46a20881-11db-44b4-ba34-e3b31247cb99",
              "type": "action",
              "data": {
                "values": {
                  "formData": {
                    "type": {
                      "_type_": "text",
                      "value": "call_function"
                    },
                    "text": {
                      "_type_": "text",
                      "value": "data_collect"
                    }
                  },
                  "nodeType": "action"
                }
              },
              "position": {
                "x": 91,
                "y": -25
              },
              "measured": {
                "width": 160,
                "height": 92
              },
              "selected": true,
              "dragging": false
            }
          ],
          "edges": [
            {
              "source": "transform_520c627b-7a99-4b16-9525-34f6b4104e67",
              "target": "action_46a20881-11db-44b4-ba34-e3b31247cb99",
              "id": "xy-edge__transform_520c627b-7a99-4b16-9525-34f6b4104e67-action_46a20881-11db-44b4-ba34-e3b31247cb99",
              "style": {
                "stroke": "#0143EC",
                "strokeWidth": 2
              },
              "markerEnd": {
                "color": "#0143EC",
                "type": "arrowclosed"
              }
            }
          ]
        }
      }
    },
    "position": {
      "x": 586.4939466252163,
      "y": -139.87802223106087
    },
    "measured": {
      "width": 254,
      "height": 72
    },
    "selected": true,
    "dragging": false
  },
  {
    "id": "step_61b30ee1-fc76-472d-8fa2-cf4c81ba6de3",
    "type": "step",
    "data": {
      "values": {
        "formData": {
          "name": {
            "_type_": "text",
            "value": "Handle Request Submission"
          },
          "description": {
            "_type_": "text",
            "value": "step4: Handle Request Submission"
          },
          "conditions": {
            "_type_": "formList"
          }
        },
        "nodeType": "step",
        "autoOpenStepCanvas": false,
        "stepRealData": {
          "nodes": [
            {
              "id": "branch_f841b76f-0040-4afd-97a2-529c2f77183f",
              "type": "branch",
              "data": {
                "values": {
                  "formData": {
                    "name": {
                      "_type_": "text",
                      "value": "step4 start node"
                    },
                    "text": {
                      "_type_": "text",
                      "value": "Do you have any requests to submit to our team? Please say 'no' if not, or describe your request in detail."
                    },
                    "conditions": {
                      "_type_": "formList",
                      "value": [
                        {
                          "condition": "onboarding_skipped"
                        },
                        {
                          "condition": "has_request"
                        }
                      ]
                    }
                  },
                  "nodeType": "branch"
                },
                "connectionTypes": [
                  "source"
                ]
              },
              "position": {
                "x": -299.2572260660605,
                "y": -33.78848910458781
              },
              "measured": {
                "width": 260,
                "height": 170
              },
              "selected": false,
              "dragging": false
            },
            {
              "id": "prompt_6faa78a0-3abe-4abb-99f8-7528b24ae8df",
              "type": "prompt",
              "data": {
                "values": {
                  "formData": {
                    "type": {
                      "_type_": "radio",
                      "value": "text"
                    },
                    "text": {
                      "_type_": "text",
                      "value": "Please provide your email. Also, your first name and last name."
                    }
                  },
                  "nodeType": "prompt"
                }
              },
              "position": {
                "x": 32.35480739449338,
                "y": -11.568214396331044
              },
              "measured": {
                "width": 260,
                "height": 92
              },
              "selected": false,
              "dragging": false
            },
            {
              "id": "action_bf9cfe86-14d7-4d05-8330-48cf946369eb",
              "type": "action",
              "data": {
                "values": {
                  "formData": {
                    "type": {
                      "_type_": "text",
                      "value": "call_function"
                    },
                    "text": {
                      "_type_": "text",
                      "value": "get_contact"
                    }
                  },
                  "nodeType": "action"
                }
              },
              "position": {
                "x": 363.9668408550473,
                "y": -13.347939688074284
              },
              "measured": {
                "width": 160,
                "height": 92
              },
              "selected": false,
              "dragging": false
            },
            {
              "id": "transform_26289fa5-70e4-4673-be7f-ab65053eefce",
              "type": "transform",
              "data": {
                "values": {
                  "formData": {
                    "type": {
                      "_type_": "text",
                      "value": "summarize"
                    },
                    "text": {
                      "_type_": "text",
                      "value": "title"
                    }
                  },
                  "nodeType": "transform"
                }
              },
              "position": {
                "x": 32.63120314124525,
                "y": 155.72596302753323
              },
              "measured": {
                "width": 160,
                "height": 92
              },
              "selected": false,
              "dragging": false
            },
            {
              "id": "transform_be2130f3-2bd2-448e-a067-4b9418ed7db6",
              "type": "transform",
              "data": {
                "values": {
                  "formData": {
                    "type": {
                      "_type_": "text",
                      "value": "detail"
                    },
                    "text": {
                      "_type_": "text",
                      "value": "full_response"
                    }
                  },
                  "nodeType": "transform"
                }
              },
              "position": {
                "x": 296.920408965116,
                "y": 155.72596302753323
              },
              "measured": {
                "width": 160,
                "height": 92
              },
              "selected": false,
              "dragging": false
            },
            {
              "id": "action_f9c341d3-571d-405e-af13-d8511ee23110",
              "type": "action",
              "data": {
                "values": {
                  "formData": {
                    "type": {
                      "_type_": "text",
                      "value": "call_function"
                    },
                    "text": {
                      "_type_": "text",
                      "value": "submit_request"
                    }
                  },
                  "nodeType": "action"
                }
              },
              "position": {
                "x": 517.6063451412775,
                "y": 155.72596302753323
              },
              "measured": {
                "width": 160,
                "height": 92
              },
              "selected": false,
              "dragging": false
            },
            {
              "id": "prompt_7794b2a4-4d5d-4bfe-b42f-77d524074e6d",
              "type": "prompt",
              "data": {
                "values": {
                  "formData": {
                    "type": {
                      "_type_": "radio",
                      "value": "text"
                    },
                    "text": {
                      "_type_": "text",
                      "value": "We've recorded your request and a member of our team will follow up shortly."
                    }
                  },
                  "nodeType": "prompt"
                }
              },
              "position": {
                "x": 737.0956852220073,
                "y": -6.22903852110133
              },
              "measured": {
                "width": 260,
                "height": 111
              },
              "selected": true,
              "dragging": false
            }
          ],
          "edges": [
            {
              "source": "branch_f841b76f-0040-4afd-97a2-529c2f77183f",
              "sourceHandle": "onboarding_skipped",
              "target": "prompt_6faa78a0-3abe-4abb-99f8-7528b24ae8df",
              "id": "xy-edge__branch_f841b76f-0040-4afd-97a2-529c2f77183fonboarding_skipped-prompt_6faa78a0-3abe-4abb-99f8-7528b24ae8df",
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
              "source": "prompt_6faa78a0-3abe-4abb-99f8-7528b24ae8df",
              "target": "action_bf9cfe86-14d7-4d05-8330-48cf946369eb",
              "id": "xy-edge__prompt_6faa78a0-3abe-4abb-99f8-7528b24ae8df-action_bf9cfe86-14d7-4d05-8330-48cf946369eb",
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
              "source": "branch_f841b76f-0040-4afd-97a2-529c2f77183f",
              "sourceHandle": "has_request",
              "target": "transform_26289fa5-70e4-4673-be7f-ab65053eefce",
              "id": "xy-edge__branch_f841b76f-0040-4afd-97a2-529c2f77183fhas_request-transform_26289fa5-70e4-4673-be7f-ab65053eefce",
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
              "source": "transform_26289fa5-70e4-4673-be7f-ab65053eefce",
              "target": "transform_be2130f3-2bd2-448e-a067-4b9418ed7db6",
              "id": "xy-edge__transform_26289fa5-70e4-4673-be7f-ab65053eefce-transform_be2130f3-2bd2-448e-a067-4b9418ed7db6",
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
              "source": "transform_be2130f3-2bd2-448e-a067-4b9418ed7db6",
              "target": "action_f9c341d3-571d-405e-af13-d8511ee23110",
              "id": "xy-edge__transform_be2130f3-2bd2-448e-a067-4b9418ed7db6-action_f9c341d3-571d-405e-af13-d8511ee23110",
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
              "source": "action_bf9cfe86-14d7-4d05-8330-48cf946369eb",
              "target": "prompt_7794b2a4-4d5d-4bfe-b42f-77d524074e6d",
              "id": "xy-edge__action_bf9cfe86-14d7-4d05-8330-48cf946369eb-prompt_7794b2a4-4d5d-4bfe-b42f-77d524074e6d",
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
              "source": "action_f9c341d3-571d-405e-af13-d8511ee23110",
              "target": "prompt_7794b2a4-4d5d-4bfe-b42f-77d524074e6d",
              "id": "xy-edge__action_f9c341d3-571d-405e-af13-d8511ee23110-prompt_7794b2a4-4d5d-4bfe-b42f-77d524074e6d",
              "style": {
                "stroke": "#0143EC",
                "strokeWidth": 2
              },
              "markerEnd": {
                "color": "#0143EC",
                "type": "arrowclosed"
              }
            }
          ]
        }
      }
    },
    "position": {
      "x": 577.039159476713,
      "y": 229.7609174616746
    },
    "measured": {
      "width": 246,
      "height": 72
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "step_21ff4957-df4e-41ea-9726-13240474a770",
    "type": "step",
    "data": {
      "values": {
        "formData": {
          "name": {
            "_type_": "text",
            "value": "Final Step – Offer and Wrap-Up"
          },
          "description": {
            "_type_": "text",
            "value": "step5: Final Step – Offer and Wrap-Up"
          },
          "conditions": {
            "_type_": "formList"
          }
        },
        "nodeType": "step",
        "autoOpenStepCanvas": false,
        "stepRealData": {
          "nodes": [
            {
              "id": "branch_e7dc5c83-7c5e-453b-b444-a5aaa6a30558",
              "type": "branch",
              "data": {
                "values": {
                  "formData": {
                    "name": {
                      "_type_": "text",
                      "value": "step5 start node"
                    },
                    "text": {
                      "_type_": "text",
                      "value": "Thanks for your time! Let us know if you need anything else."
                    },
                    "conditions": {
                      "_type_": "formList",
                      "value": [
                        {
                          "condition": "onboarding_completed"
                        },
                        {
                          "condition": "not_new_customer"
                        }
                      ]
                    }
                  },
                  "nodeType": "branch"
                },
                "connectionTypes": [
                  "source"
                ]
              },
              "position": {
                "x": -237,
                "y": -35
              },
              "measured": {
                "width": 260,
                "height": 151
              },
              "selected": false,
              "dragging": false
            },
            {
              "id": "prompt_b61fd2a7-4939-4820-9761-5454e8fb1e16",
              "type": "prompt",
              "data": {
                "values": {
                  "formData": {
                    "type": {
                      "_type_": "radio",
                      "value": "prompt"
                    },
                    "prompt": {
                      "_type_": "text",
                      "value": "Display assigned sales representative's name and contact info"
                    }
                  },
                  "nodeType": "prompt"
                }
              },
              "position": {
                "x": 102.0699388648573,
                "y": -104.92700437800806
              },
              "measured": {
                "width": 260,
                "height": 111
              },
              "selected": false,
              "dragging": false
            },
            {
              "id": "prompt_fcd58f02-4011-4ff5-8e39-a33d8d9f93e0",
              "type": "prompt",
              "data": {
                "values": {
                  "formData": {
                    "type": {
                      "_type_": "radio",
                      "value": "prompt"
                    },
                    "prompt": {
                      "_type_": "text",
                      "value": "Would you like to schedule a meeting with your assigned sales rep?"
                    }
                  },
                  "nodeType": "prompt"
                }
              },
              "position": {
                "x": 105.98957205400117,
                "y": 41.13250654085039
              },
              "measured": {
                "width": 260,
                "height": 111
              },
              "selected": true,
              "dragging": false
            }
          ],
          "edges": [
            {
              "source": "branch_e7dc5c83-7c5e-453b-b444-a5aaa6a30558",
              "sourceHandle": "onboarding_completed",
              "target": "prompt_b61fd2a7-4939-4820-9761-5454e8fb1e16",
              "id": "xy-edge__branch_e7dc5c83-7c5e-453b-b444-a5aaa6a30558onboarding_completed-prompt_b61fd2a7-4939-4820-9761-5454e8fb1e16",
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
              "source": "branch_e7dc5c83-7c5e-453b-b444-a5aaa6a30558",
              "sourceHandle": "not_new_customer",
              "target": "prompt_fcd58f02-4011-4ff5-8e39-a33d8d9f93e0",
              "id": "xy-edge__branch_e7dc5c83-7c5e-453b-b444-a5aaa6a30558not_new_customer-prompt_fcd58f02-4011-4ff5-8e39-a33d8d9f93e0",
              "style": {
                "stroke": "#0143EC",
                "strokeWidth": 2
              },
              "markerEnd": {
                "color": "#0143EC",
                "type": "arrowclosed"
              }
            }
          ]
        }
      }
    },
    "position": {
      "x": 966.89481978814,
      "y": 41.827128176014526
    },
    "measured": {
      "width": 260,
      "height": 91
    },
    "selected": false,
    "dragging": false
  }
];
export const edges: any[] = [
  {
    "source": "step_c32f2ee5-23ff-4649-b17b-c3a7432bdbe1",
    "target": "step_eea5c0bf-3e25-4450-bcae-1a2a25fd8917",
    "id": "xy-edge__step_c32f2ee5-23ff-4649-b17b-c3a7432bdbe1-step_eea5c0bf-3e25-4450-bcae-1a2a25fd8917",
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
    "source": "step_eea5c0bf-3e25-4450-bcae-1a2a25fd8917",
    "sourceHandle": "yes",
    "target": "step_0c37c9c6-433b-4d4d-b43d-b464cfd07263",
    "id": "xy-edge__step_eea5c0bf-3e25-4450-bcae-1a2a25fd8917yes-step_0c37c9c6-433b-4d4d-b43d-b464cfd07263",
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
    "source": "step_0c37c9c6-433b-4d4d-b43d-b464cfd07263",
    "target": "step_91c3ea32-fbd2-4991-a264-6cd663936f59",
    "id": "xy-edge__step_0c37c9c6-433b-4d4d-b43d-b464cfd07263-step_91c3ea32-fbd2-4991-a264-6cd663936f59",
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
    "source": "step_91c3ea32-fbd2-4991-a264-6cd663936f59",
    "target": "step_61b30ee1-fc76-472d-8fa2-cf4c81ba6de3",
    "id": "xy-edge__step_91c3ea32-fbd2-4991-a264-6cd663936f59-step_61b30ee1-fc76-472d-8fa2-cf4c81ba6de3",
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
    "source": "step_61b30ee1-fc76-472d-8fa2-cf4c81ba6de3",
    "target": "step_61b30ee1-fc76-472d-8fa2-cf4c81ba6de3",
    "id": "xy-edge__step_61b30ee1-fc76-472d-8fa2-cf4c81ba6de3-step_61b30ee1-fc76-472d-8fa2-cf4c81ba6de3",
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
    "source": "step_61b30ee1-fc76-472d-8fa2-cf4c81ba6de3",
    "target": "step_21ff4957-df4e-41ea-9726-13240474a770",
    "id": "xy-edge__step_61b30ee1-fc76-472d-8fa2-cf4c81ba6de3-step_21ff4957-df4e-41ea-9726-13240474a770",
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
    "source": "step_eea5c0bf-3e25-4450-bcae-1a2a25fd8917",
    "sourceHandle": "no_or_unsure",
    "target": "step_61b30ee1-fc76-472d-8fa2-cf4c81ba6de3",
    "id": "xy-edge__step_eea5c0bf-3e25-4450-bcae-1a2a25fd8917no_or_unsure-step_61b30ee1-fc76-472d-8fa2-cf4c81ba6de3",
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
    "source": "step_eea5c0bf-3e25-4450-bcae-1a2a25fd8917",
    "sourceHandle": "off_topic",
    "target": "step_61b30ee1-fc76-472d-8fa2-cf4c81ba6de3",
    "id": "xy-edge__step_eea5c0bf-3e25-4450-bcae-1a2a25fd8917off_topic-step_61b30ee1-fc76-472d-8fa2-cf4c81ba6de3",
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