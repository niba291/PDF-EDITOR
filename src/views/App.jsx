// IMPORT==================================================================================================================
import { useState }                                                         from "react";
// COMPONENTS==============================================================================================================
import { View, JsonRecursive }                                              from "../components/View";

function App() {
 
    // const [jsonEditor, setJsonEditor]               = useState({
    //     "type"                                      : "PAGE",
    //     "props"                                     : {
    //         "size"                                  : "A4",
    //         "style"                                 : {
    //             "padding"                           : "20px",
    //             "color"                             : "#595959"
    //         },
    //         "children"                              : [
    //             {
    //                 "type"                          : "VIEW",
    //                 "props"                         : {
    //                     "style"                     : {
    //                         "display"               : "flex",
    //                         "flexDirection"         : "row",
    //                         "alignItems"            : "center"
    //                     },
    //                     "children"                  : [
    //                         {
    //                             "type"              : "TEXT",
    //                             "props"             : {
    //                                 "style"         : {
    //                                     "fontSize"  : 26,
    //                                     "fontWeight": 700,
    //                                     "fontFamily": "Open Sans"
    //                                 },
    //                                 "children"      : "Test 1"
    //                             }
    //                         }
    //                     ]
    //                 }
    //             },
    //             {
    //                 "type"                          : "VIEW",
    //                 "props"                         : {
    //                     "style"                     : {
    //                         "display"               : "flex",
    //                         "flexDirection"         : "row",
    //                         "alignItems"            : "center"
    //                     },
    //                     "children"                  : [
    //                         {
    //                             "type"              : "TEXT",
    //                             "props"             : {
    //                                 "style"         : {
    //                                 "fontSize"      : 26,
    //                                 "fontWeight"    : 700,
    //                                 "fontFamily"    : "Open Sans"
    //                                 },
    //                                 "children"      : "Test 2"
    //                             }
    //                         }
    //                     ]
    //                 }
    //             }
    //         ]
    //     }
    // });
    const [jsonEditor, setJsonEditor]               = useState({
        "type": "PAGE",
        "props": {
            "size": "A4",
            "style": {
            "padding": "20px",
            "color": "#595959"
            },
            "pageNumber": 1,
            "wrap": false,
            "children": [
            {
                "type": "VIEW",
                "props": {
                "style": {
                    "display": "flex",
                    "flexDirection": "row",
                    "alignItems": "center"
                },
                "children": [
                    {
                    "type": "TEXT",
                    "props": {
                        "style": {
                        "fontSize": 26,
                        "fontWeight": 700,
                        "fontFamily": "Open Sans"
                        },
                        "children": "Nibaldo Chavez"
                    }
                    },
                    {
                    "type": "TEXT",
                    "props": {
                        "style": {
                        "fontSize": 16,
                        "paddingLeft": "10px",
                        "paddingTop": "9px"
                        },
                        "children": "Desarrollador full stack"
                    }
                    }
                ]
                }
            },
            {
                "type": "VIEW",
                "props": {
                "children": [
                    {
                    "type": "VIEW",
                    "props": {
                        "style": {
                        "display": "flex",
                        "flexDirection": "row",
                        "alignItems": "center",
                        "paddingTop": "5px"
                        },
                        "children": [
                        {
                            "type": "LINK",
                            "props": {
                            "src": "mailto:nibaldochavezp@gmail.com",
                            "style": {
                                "width": "50%",
                                "fontSize": 12,
                                "textDecoration": "none",
                                "display": "flex",
                                "flexDirection": "row",
                                "alignItems": "center"
                            },
                            "children": [
                                {
                                "type": "IMAGE",
                                "props": {
                                    "src": "https://img.icons8.com/material-rounded/48/new-post.png",
                                    "style": {
                                    "width": "15px",
                                    "marginRight": "5px"
                                    }
                                }
                                },
                                {
                                "type": "TEXT",
                                "props": {
                                    "style": {
                                    "color": "#595959"
                                    },
                                    "children": "nibaldochavezp@gmail.com"
                                }
                                }
                            ]
                            }
                        },
                        {
                            "type": "LINK",
                            "props": {
                            "src": "https://github.com/niba291",
                            "style": {
                                "width": "50%",
                                "fontSize": 12,
                                "textDecoration": "none",
                                "display": "flex",
                                "flexDirection": "row",
                                "alignItems": "center"
                            },
                            "children": [
                                {
                                "type": "IMAGE",
                                "props": {
                                    "src": "https://img.icons8.com/material-outlined/48/000000/github.png",
                                    "style": {
                                    "width": "15px",
                                    "marginRight": "5px"
                                    }
                                }
                                },
                                {
                                "type": "TEXT",
                                "props": {
                                    "style": {
                                    "color": "#595959"
                                    },
                                    "children": "Github"
                                }
                                }
                            ]
                            }
                        }
                        ]
                    }
                    },
                    {
                    "type": "VIEW",
                    "props": {
                        "style": {
                        "display": "flex",
                        "flexDirection": "row",
                        "alignItems": "center",
                        "paddingTop": "5px"
                        },
                        "children": [
                        {
                            "type": "LINK",
                            "props": {
                            "src": "https://www.linkedin.com/in/nibaldochzvez/",
                            "style": {
                                "width": "50%",
                                "fontSize": 12,
                                "textDecoration": "none",
                                "display": "flex",
                                "flexDirection": "row",
                                "alignItems": "center"
                            },
                            "children": [
                                {
                                "type": "IMAGE",
                                "props": {
                                    "src": "https://img.icons8.com/ios-glyphs/60/linkedin.png",
                                    "style": {
                                    "width": "15px",
                                    "marginRight": "5px"
                                    }
                                }
                                },
                                {
                                "type": "TEXT",
                                "props": {
                                    "style": {
                                    "color": "#595959"
                                    },
                                    "children": "Linkedin"
                                }
                                }
                            ]
                            }
                        },
                        {
                            "type": "LINK",
                            "props": {
                            "src": "https://github.com/niba291",
                            "style": {
                                "width": "50%",
                                "fontSize": 12,
                                "textDecoration": "none",
                                "display": "flex",
                                "flexDirection": "row",
                                "alignItems": "center"
                            },
                            "children": [
                                {
                                "type": "IMAGE",
                                "props": {
                                    "src": "https://img.icons8.com/ios-glyphs/60/portfolio.png",
                                    "style": {
                                    "width": "15px",
                                    "marginRight": "5px"
                                    }
                                }
                                },
                                {
                                "type": "TEXT",
                                "props": {
                                    "style": {
                                    "color": "#595959"
                                    },
                                    "children": "Portafolio"
                                }
                                }
                            ]
                            }
                        }
                        ]
                    }
                    },
                    {
                    "type": "VIEW",
                    "props": {
                        "style": {
                        "display": "flex",
                        "flexDirection": "row",
                        "alignItems": "center",
                        "paddingTop": "5px",
                        "paddingBottom": "10px",
                        "borderBottom": "1px solid #E5E7EB"
                        },
                        "children": [
                        {
                            "type": "VIEW",
                            "props": {
                            "style": {
                                "width": "50%",
                                "fontSize": 12,
                                "textDecoration": "none",
                                "display": "flex",
                                "flexDirection": "row",
                                "alignItems": "center"
                            },
                            "children": [
                                {
                                "type": "IMAGE",
                                "props": {
                                    "src": "https://img.icons8.com/ios-filled/50/building.png",
                                    "style": {
                                    "width": "15px",
                                    "marginRight": "5px"
                                    }
                                }
                                },
                                {
                                "type": "TEXT",
                                "props": {
                                    "children": "Santiago, chile"
                                }
                                }
                            ]
                            }
                        },
                        {
                            "type": "VIEW",
                            "props": {
                            "style": {
                                "width": "50%",
                                "fontSize": 12,
                                "textDecoration": "none",
                                "display": "flex",
                                "flexDirection": "row",
                                "alignItems": "center"
                            },
                            "children": [
                                {
                                "type": "IMAGE",
                                "props": {
                                    "src": "https://img.icons8.com/ios-glyphs/60/phone--v1.png",
                                    "style": {
                                    "width": "15px",
                                    "marginRight": "5px"
                                    }
                                }
                                },
                                {
                                "type": "TEXT",
                                "props": {
                                    "children": "+56972501753"
                                }
                                }
                            ]
                            }
                        }
                        ]
                    }
                    }
                ]
                }
            },
            {
                "type": "VIEW",
                "props": {
                "style": {
                    "paddingTop": "10px",
                    "paddingBottom": "10px",
                    "borderBottom": "1px solid #E5E7EB"
                },
                "children": [
                    {
                    "type": "TEXT",
                    "props": {
                        "style": {
                        "fontSize": 14,
                        "fontWeight": 700,
                        "textAlign": "center",
                        "fontFamily": "Open Sans",
                        "paddingBottom": "5px"
                        },
                        "children": "Perfil"
                    }
                    },
                    {
                    "type": "TEXT",
                    "props": {
                        "style": {
                        "fontSize": 12,
                        "fontFamily": "Open Sans"
                        },
                        "children": "Desarrollador Full Stack con experiencia en la creación y mejora de soluciones tecnológicas \ninnovadoras. Mi enfoque integral abarca desde el desarrollo del back-end hasta la interfaz de usuario (front-end), permitiéndome ofrecer soluciones robustas y centradas en el usuario."
                    }
                    }
                ]
                }
            },
            {
                "type": "VIEW",
                "props": {
                "style": {
                    "paddingTop": "10px",
                    "paddingBottom": "10px",
                    "borderBottom": "1px solid #E5E7EB"
                },
                "children": [
                    {
                    "type": "TEXT",
                    "props": {
                        "style": {
                        "fontSize": 14,
                        "fontWeight": 700,
                        "textAlign": "center",
                        "fontFamily": "Open Sans",
                        "paddingBottom": "5px"
                        },
                        "children": "Habilidades"
                    }
                    },
                    {
                    "type": "TEXT",
                    "props": {
                        "style": {
                        "fontSize": 12,
                        "fontFamily": "Open Sans",
                        "textAlign": "center"
                        },
                        "children": [
                        "PYTHON | PHP | C# | JAVA | JAVASCRIPT | MYSQL | REACT | REACT-NATIVE | LARAVEL | DJANGO ",
                        "\n",
                        " FLASK | JQUERY | BOOTSTRAP | TAILWINDS CSS | GIT | MONGODB | SQL | ORACLE"
                        ]
                    }
                    }
                ]
                }
            },
            {
                "type": "VIEW",
                "props": {
                "style": {
                    "paddingTop": "10px",
                    "paddingBottom": "10px",
                    "borderBottom": "1px solid #E5E7EB"
                },
                "children": [
                    {
                    "type": "TEXT",
                    "props": {
                        "style": {
                        "fontSize": 14,
                        "fontWeight": 700,
                        "textAlign": "center",
                        "fontFamily": "Open Sans",
                        "paddingBottom": "5px"
                        },
                        "children": "Profesional"
                    }
                    },
                    {
                    "type": "VIEW",
                    "props": {
                        "style": {
                        "display": "flex",
                        "flexDirection": "row",
                        "alignItems": "center",
                        "paddingBottom": "10px"
                        },
                        "children": [
                        {
                            "type": "VIEW",
                            "props": {
                            "style": {
                                "width": "30%",
                                "display": "flex",
                                "flexDirection": "row",
                                "alignItems": "center"
                            },
                            "children": {
                                "type": "TEXT",
                                "props": {
                                "style": {
                                    "fontSize": 12,
                                    "fontFamily": "Open Sans",
                                    "textAlign": "center"
                                },
                                "children": "Marzo 2023 - Actualmente"
                                }
                            }
                            }
                        },
                        {
                            "type": "VIEW",
                            "props": {
                            "style": {
                                "width": "70%",
                                "fontSize": 12,
                                "textDecoration": "none"
                            },
                            "children": [
                                {
                                "type": "VIEW",
                                "props": {
                                    "style": {
                                    "display": "flex",
                                    "flexDirection": "row",
                                    "alignItems": "center",
                                    "paddingBottom": "5px"
                                    },
                                    "children": [
                                    {
                                        "type": "TEXT",
                                        "props": {
                                        "style": {
                                            "fontSize": 13,
                                            "fontWeight": 700,
                                            "fontFamily": "Open Sans"
                                        },
                                        "children": "ACHL SPA"
                                        }
                                    },
                                    {
                                        "type": "TEXT",
                                        "props": {
                                        "style": {
                                            "fontSize": 12,
                                            "paddingLeft": "5px",
                                            "paddingTop": "2px"
                                        },
                                        "children": "Desarrollador full stack"
                                        }
                                    }
                                    ]
                                }
                                },
                                {
                                "type": "TEXT",
                                "props": {
                                    "style": {
                                    "fontSize": 12,
                                    "fontFamily": "Open Sans"
                                    },
                                    "children": [
                                    "- Desarrollo de API de facturación electrónica",
                                    "\n",
                                    "- Desarrollo del front-end con react en una aplicación punto de venta",
                                    "\n",
                                    "- Creación de API para conectarse a google sheets",
                                    "\n",
                                    "- Organización del equipo para para implementar nuevas tecnologías"
                                    ]
                                }
                                }
                            ]
                            }
                        }
                        ]
                    }
                    },
                    {
                    "type": "VIEW",
                    "props": {
                        "style": {
                        "display": "flex",
                        "flexDirection": "row",
                        "alignItems": "center",
                        "paddingBottom": "10px"
                        },
                        "children": [
                        {
                            "type": "VIEW",
                            "props": {
                            "style": {
                                "width": "30%",
                                "display": "flex",
                                "flexDirection": "row",
                                "alignItems": "center"
                            },
                            "children": {
                                "type": "TEXT",
                                "props": {
                                "style": {
                                    "fontSize": 12,
                                    "fontFamily": "Open Sans",
                                    "textAlign": "center"
                                },
                                "children": "Mayo 2022 - Marzo 2023"
                                }
                            }
                            }
                        },
                        {
                            "type": "VIEW",
                            "props": {
                            "style": {
                                "width": "70%",
                                "fontSize": 12,
                                "textDecoration": "none"
                            },
                            "children": [
                                {
                                "type": "VIEW",
                                "props": {
                                    "style": {
                                    "display": "flex",
                                    "flexDirection": "row",
                                    "alignItems": "center",
                                    "paddingBottom": "5px"
                                    },
                                    "children": [
                                    {
                                        "type": "TEXT",
                                        "props": {
                                        "style": {
                                            "fontSize": 13,
                                            "fontWeight": 700,
                                            "fontFamily": "Open Sans"
                                        },
                                        "children": "TIC NETWORKS AND SECURITY LTDA"
                                        }
                                    },
                                    {
                                        "type": "TEXT",
                                        "props": {
                                        "style": {
                                            "fontSize": 12,
                                            "paddingLeft": "5px",
                                            "paddingTop": "2px"
                                        },
                                        "children": "Desarrollador full stack"
                                        }
                                    }
                                    ]
                                }
                                },
                                {
                                "type": "TEXT",
                                "props": {
                                    "style": {
                                    "fontSize": 12,
                                    "fontFamily": "Open Sans"
                                    },
                                    "children": [
                                    "- Desarrollo front-end de una aplicación GPS",
                                    "\n",
                                    "- Creación de modulos en una aplicación de redes",
                                    "\n",
                                    "- Desarrollo de API en Whatssap",
                                    "\n",
                                    "- Creación de back-end para crear georeferencias",
                                    "\n",
                                    "- Notificaciones push movil"
                                    ]
                                }
                                }
                            ]
                            }
                        }
                        ]
                    }
                    },
                    {
                    "type": "VIEW",
                    "props": {
                        "style": {
                        "display": "flex",
                        "flexDirection": "row",
                        "alignItems": "center"
                        },
                        "children": [
                        {
                            "type": "VIEW",
                            "props": {
                            "style": {
                                "width": "30%",
                                "display": "flex",
                                "flexDirection": "row",
                                "alignItems": "center"
                            },
                            "children": {
                                "type": "TEXT",
                                "props": {
                                "style": {
                                    "fontSize": 12,
                                    "fontFamily": "Open Sans",
                                    "textAlign": "center"
                                },
                                "children": "Agosto  2021 - Marzo 2022"
                                }
                            }
                            }
                        },
                        {
                            "type": "VIEW",
                            "props": {
                            "style": {
                                "width": "70%",
                                "fontSize": 12,
                                "textDecoration": "none"
                            },
                            "children": [
                                {
                                "type": "VIEW",
                                "props": {
                                    "style": {
                                    "display": "flex",
                                    "flexDirection": "row",
                                    "alignItems": "center",
                                    "paddingBottom": "5px"
                                    },
                                    "children": [
                                    {
                                        "type": "TEXT",
                                        "props": {
                                        "style": {
                                            "fontSize": 13,
                                            "fontWeight": 700,
                                            "fontFamily": "Open Sans"
                                        },
                                        "children": "CONTALINE S.A"
                                        }
                                    },
                                    {
                                        "type": "TEXT",
                                        "props": {
                                        "style": {
                                            "fontSize": 12,
                                            "paddingLeft": "5px",
                                            "paddingTop": "2px"
                                        },
                                        "children": "Desarrollador full stack"
                                        }
                                    }
                                    ]
                                }
                                },
                                {
                                "type": "TEXT",
                                "props": {
                                    "style": {
                                    "fontSize": 12,
                                    "fontFamily": "Open Sans"
                                    },
                                    "children": [
                                        "- Scraping a boleta electrónica implementado en API",
                                        "\n",
                                        "- Mantención de programa administratio de la empresa",
                                        "\n",
                                        "- Desarrollo de modulos de boleta y factura electrónica",
                                        "\n",
                                        "- Diseño y desarrollo de alerta para los cliente",
                                        "\n",
                                        "- Codificación de XML",
                                        "\n"
                                        ]
                                    }
                                }
                            ]
                            }
                        }
                        ]
                    }
                    }
                ]
                }
            },
            {
                "type": "VIEW",
                "props": {
                "style": {
                    "paddingTop": "10px",
                    "paddingBottom": "10px",
                    "borderBottom": "1px solid #E5E7EB"
                },
                "children": [
                    {
                    "type": "TEXT",
                    "props": {
                        "style": {
                        "fontSize": 14,
                        "fontWeight": 700,
                        "textAlign": "center",
                        "fontFamily": "Open Sans",
                        "paddingBottom": "10px"
                        },
                        "children": "Lenguajes"
                    }
                    },
                    {
                    "type": "VIEW",
                    "props": {
                        "style": {
                        "display": "flex",
                        "flexDirection": "row",
                        "alignItems": "center",
                        "paddingBottom": "5px"
                        },
                        "children": [
                        {
                            "type": "TEXT",
                            "props": {
                            "style": {
                                "fontSize": 12,
                                "paddingLeft": "5px",
                                "paddingTop": "2px",
                                "width": "20%"
                            },
                            "children": "Español (nativo)"
                            }
                        },
                        {
                            "type": "TEXT",
                            "props": {
                            "style": {
                                "fontSize": 12,
                                "paddingLeft": "5px",
                                "paddingTop": "2px",
                                "width": "20%"
                            },
                            "children": "Inglés (B1)"
                            }
                        }
                        ]
                    }
                    }
                ]
                }
            },
            {
                "type": "VIEW",
                "props": {
                "style": {
                    "paddingTop": "10px"
                },
                "children": [
                    {
                    "type": "TEXT",
                    "props": {
                        "style": {
                        "fontSize": 14,
                        "fontWeight": 700,
                        "textAlign": "center",
                        "fontFamily": "Open Sans",
                        "paddingBottom": "10px"
                        },
                        "children": "Educación"
                    }
                    },
                    {
                    "type": "VIEW",
                    "props": {
                        "style": {
                        "display": "flex",
                        "flexDirection": "row",
                        "alignItems": "center",
                        "paddingBottom": "10px"
                        },
                        "children": [
                        {
                            "type": "VIEW",
                            "props": {
                            "style": {
                                "width": "30%",
                                "display": "flex",
                                "flexDirection": "row",
                                "alignItems": "center"
                            },
                            "children": {
                                "type": "TEXT",
                                "props": {
                                "style": {
                                    "fontSize": 12,
                                    "fontFamily": "Open Sans",
                                    "textAlign": "center"
                                },
                                "children": "Marzo 2019 - Agosto 2021"
                                }
                            }
                            }
                        },
                        {
                            "type": "VIEW",
                            "props": {
                            "style": {
                                "width": "70%",
                                "fontSize": 12,
                                "textDecoration": "none"
                            },
                            "children": {
                                "type": "VIEW",
                                "props": {
                                "style": {
                                    "display": "flex",
                                    "flexDirection": "row",
                                    "alignItems": "center"
                                },
                                "children": [
                                    {
                                    "type": "TEXT",
                                    "props": {
                                        "style": {
                                        "fontSize": 13,
                                        "fontWeight": 700,
                                        "fontFamily": "Open Sans"
                                        },
                                        "children": "Inacap"
                                    }
                                    },
                                    {
                                    "type": "TEXT",
                                    "props": {
                                        "style": {
                                        "fontSize": 12,
                                        "paddingLeft": "5px",
                                        "paddingTop": "2px"
                                        },
                                        "children": "Analista programador"
                                    }
                                    }
                                ]
                                }
                            }
                            }
                        }
                        ]
                    }
                    }
                ]
                }
            }
            ]
        }
    });

    return (
        <div className="container-fluid flex items-center">    
            <div className="w-1/2 flex justify-center">
                <View state={jsonEditor}/>
            </div>
            <div className="w-1/2 h-screen flex p-5 text-gray-800">
                <div className="border h-full w-full p-2 rounded flex flex-col">
                    <JsonRecursive object={jsonEditor} state={jsonEditor} setState={setJsonEditor} />
                </div>
            </div>
        </div>
    );
}

export default App;