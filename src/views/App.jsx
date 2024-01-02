import { serialize, deserialize }                                           from "../assets/utils";
import { Page, Text, View, Link, Document, Image, PDFViewer, Font, Canvas }     from "@react-pdf/renderer";
import jp                                                                   from "jsonpath";

function App() {

    const json                                      = {
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
                                    "fontSize"      : 26,
                                    "fontWeight"    : 700,
                                    "fontFamily"    : "Open Sans"
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
    };

    const JsonRecursive     = ({object}) => {
        
        if(typeof(object) === "string"){
            return(
                <article className="w-full flex flex-wrap border py-2 px-2">
                    <span className="w-1/6 px-2 py-1">
                        Valor
                    </span>
                    <input className="w-5/6 px-2 py-1 border rounded shadow-sm" value={object}/>
                </article>
            );
        }

        if(Array.isArray(object)){            
            return object.map(({type, props}, key) => {
                return(
                    <>
                        <details className="border-l ml-4 px-2 py-2 cursor-pointer">
                            <summary className="pb-2 capitalize border px-2 py-2 rounded">{type.toLowerCase()}</summary>
                            <JsonRecursive object={props.children} />
                        </details>
                    </>
                );
            });
        }

        let { type, props } = object;

        return(
            <>
                <details className="px-1 py-2 cursor-pointer">
                    <summary className="pb-2 capitalize">{type.toLowerCase()}</summary>
                    <JsonRecursive object={props.children} />
                </details>
            </>
        );

    };

    return (
        <div className="container-fluid flex items-center">    
            <div className="w-1/2">
                <PDFViewer className="w-full h-screen" style={{backgroundColor: "white"}}>
                    <Document>
                        {deserialize(json)}
                    </Document>
                </PDFViewer>
            </div>
            <div className="w-1/2 h-screen flex p-5">
                <div className="border h-full w-full p-2 rounded flex flex-col">
                    <JsonRecursive object={json} />
                </div>
            </div>
        </div>
    );
}

export default App;