// IMPORT==================================================================================================================
import { useState }                                                         from "react";
// COMPONENTS==============================================================================================================
import { View, JsonRecursive }                                              from "../components/View";

function App() {
 
    const [jsonEditor, setJsonEditor]               = useState({
        "type"                                      : "PAGE",
        "props"                                     : {
            "size"                                  : "A4",
            "style"                                 : {
                "padding"                           : "20px",
                "color"                             : "#595959"
            },
            "pageNumber"                            : 1,
            "children"                              : [
                {
                    "type"                          : "VIEW",
                    "props"                         : {
                        "style"                     : {
                            "display"               : "flex",
                            "flexDirection"         : "row",
                            "alignItems"            : "center"
                        },
                        "children"                  : [
                            {
                                "type"              : "TEXT",
                                "props"             : {
                                    "style"         : {
                                        "fontSize"  : 26,
                                        "fontWeight": 700,
                                        "fontFamily": "Open Sans"
                                    },
                                    "children"      : "Test 1"
                                }
                            }
                        ]
                    }
                },
                {
                    "type"                          : "VIEW",
                    "props"                         : {
                        "style"                     : {
                            "display"               : "flex",
                            "flexDirection"         : "row",
                            "alignItems"            : "center"
                        },
                        "children"                  : [
                            {
                                "type"              : "TEXT",
                                "props"             : {
                                    "style"         : {
                                    "fontSize"      : 26,
                                    "fontWeight"    : 700,
                                    "fontFamily"    : "Open Sans"
                                    },
                                    "children"      : "Test 2"
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
            <div className="w-1/2">
                <View state={jsonEditor}/>
            </div>
            <div className="w-1/2 h-screen flex p-5">
                <div className="border h-full w-full p-2 rounded flex flex-col">
                    <JsonRecursive object={jsonEditor} />
                </div>
            </div>
        </div>
    );
}

export default App;