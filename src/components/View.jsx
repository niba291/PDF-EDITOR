
// IMPORT==================================================================================================================
import { useState, useEffect, useRef }                                          from "react";
import jp                                                                       from "jsonpath";
// ASSETS==================================================================================================================
import { serialize, deserialize }                                               from "../assets/utils";
// COMPONENTS==============================================================================================================
import { PDFViewer, Document }                                                  from "@react-pdf/renderer";
import { Input }                                                                from "./Inputs";
// RENDER==================================================================================================================
export function View({state, view}) {
    // VARIABLES===========================================================================================================

    if(view){
        return (
            <PDFViewer className="w-full h-screen" style={{backgroundColor: "white"}}>
                <Document>
                    {deserialize(state)}
                </Document>
            </PDFViewer>
        );
    }

    return (
        <section className="border mx-2 w-[595px] h-[842px] overflow-hidden">
            {deserialize(JSON.parse(JSON.stringify(state).replace(/VIEW/g, "div").replace(/TEXT/g, "p").replace(/PAGE/g, "section").replace(/IMAGE/g, "img")))}
        </section>
    );
}

function ControllerElement({state, setState, jsonPath, add}){
    // VARIABLES===========================================================================================================
    const [open, setOpen]               = useState(false);
    const ref                           = useRef(null);
    const handleClickOutside            = (event) => {
        if (ref.current && !ref.current.contains(event.target)){
            setOpen(false);
        }
    }
    const addElementEvent               = (type, props) => {
        
        if(jp.value(state, `$${jsonPath}.children`) === undefined){
            jp.value(state, `$${jsonPath}.children`, [
                {
                    "type"  : type,
                    "props" : props
                }
            ]);
        }else{
            jp.value(state, `$${jsonPath}.children`, [...jp.value(state, `$${jsonPath}.children`),
                {
                    "type"  : type,
                    "props" : props
                }
            ]);
        }

        setState({...state});
        setOpen(false);
    }
    // USEEFFECT===========================================================================================================
    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);
    // RENDER==============================================================================================================
    return(
        <div className="float-end -mt-[0.185rem]" ref={ref}>
            <button type="button" className="border px-2 py-1 rounded text-sm hover:bg-gray-100 w-40 mr-1 text-red-500" onClick={() => {
                let path        = jp.paths(state, `$${jsonPath}`)[0];
                let auxKey      = path[path.length - 2];
                let all         = jp.query(state, path.slice(0, -2).join("."))[0];
                let value       = all.filter((item, index) => index !== auxKey);
                jp.value(state, path.slice(0, -2).join("."), value);
                setState({...state});
            }}>Remove element</button>
            {add && <button type="button" className="border px-2 py-1 rounded text-sm hover:bg-gray-100 w-40" onClick={() => {setOpen(!open)}}>Add element</button>}            
            {open && 
                <div className="absolute end-0 z-10 mt-1 rounded-md border border-gray-100 bg-white shadow mr-8 w-40" role="menu">
                    <div className="p-2">
                        <button 
                            className="block rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 w-full" 
                            role="menuitem"
                            onClick={() => {
                                addElementEvent("TEXT", {
                                    "style": {
                                        "margin": "0px",
                                        "padding": "0px",
                                        "fontSize": "14px",
                                        "textDecoration": "none",
                                        "width": "auto",
                                        "height": "auto",
                                        "backgroundColor": "",
                                        "borderRadius": "0px",
                                        "border": "0px solid black",
                                        "fontWeight": "0",
                                        "textAlign": "left",
                                    },
                                    "children": ""
                                });
                            }}
                        >
                            Add Text
                        </button>
                        <button 
                            className="block rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 w-full" 
                            role="menuitem"
                            onClick={() => {
                                addElementEvent("VIEW", {
                                    "style": {
                                        "display": "flex",
                                        "flex": "1",
                                        "flexWrap": "wrap",
                                        "flexDirection": "row",
                                        "alignItems": "start",
                                        "width": "auto",
                                        "height": "auto",
                                        "margin": "0px",
                                        "padding": "0px",
                                        "backgroundColor": "",
                                        "borderRadius": "0px",
                                        "border": "0px solid black",
                                    },
                                });
                            }}
                        >
                            Add View
                        </button>
                    </div>
                </div>
            }            
        </div>
    );
}

export function JsonRecursive({object, jsonKey, state, setState}) {   

    const eventSetState     = (key, value, style) => {
        if(style){
            let aux         = jp.value(state, `$${key}`); 
            let obj         = {...aux};
            obj[style]      = value
            jp.value(state, `$${key}`, obj);
            console.log(state);
        }else{
            jp.value(state, `$${key}`, value);
        }
        setState({...state});
    };

    if(typeof(object) === "string"){
        return(
            <article className="w-full flex flex-wrap border border-t-0 rounded-b py-2 px-2">
                <Input label="value" value={object} onEvent={(e) => {eventSetState(`${jsonKey}.children`, e.target.value);}}/>
                {/* <span className="w-2/6 px-2">
                    value
                </span>
                <input className="w-4/6 px-2 border rounded" value={object} onInput={(e) => {
                    eventSetState(`${jsonKey}.children`, e.target.value)
                }}/> */}
            </article>
        );
    }

    if(Array.isArray(object)){                    
        
        return object.map(({type, props}, key) => {

            if(type === undefined){
                return;
            }

            return(
                <details className="border-l ml-4 px-2 py-2" key={key}>
                    <summary className="pb-2 capitalize border px-2 py-2 rounded-t cursor-pointer">
                        {type.toLowerCase()}
                        <ControllerElement state={state} setState={setState} jsonPath={`${jsonKey}.children[${key}].props`} add={type !== "TEXT"}></ControllerElement>
                    </summary>
                    <div className="flex flex-wrap w-full border border-t-0 py-2 px-2">
                        <details className="w-full">
                            <summary className="cursor-pointer">Style</summary>
                            {type === "VIEW" && 
                                <>
                                    <div className="border px-2 py-1 rounded flex flex-wrap justify-center mr-1 items-center w-full mt-2">
                                        <h1 className="w-2/6 py-1">Direction</h1>
                                        <div className="w-4/6">
                                            <button 
                                                className={`border px-1 py-1 rounded text-sm hover:bg-gray-100 mr-1 ${props.style.flexDirection === "row" ? "bg-gray-100" : ""}`}
                                                onClick={() => {
                                                    eventSetState(`${jsonKey}.children[${key}].props.style`, "row", "flexDirection");
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                                                    <path fill="currentColor" d="M20.25 3H3.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5M3 9.75A2.25 2.25 0 0 1 5.25 7.5h13.5A2.25 2.25 0 0 1 21 9.75v4.5a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 14.25zM5.25 9a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75H8.5V9zM14 15V9h-4v6zm1.5 0h3.25a.75.75 0 0 0 .75-.75v-4.5a.75.75 0 0 0-.75-.75H15.5zM3.75 19.5h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1 0-1.5"/>
                                                </svg>
                                            </button>
                                            <button 
                                                className={`border px-1 py-1 rounded text-sm hover:bg-gray-100 mr-1 ${props.style.flexDirection === "col" ? "bg-gray-100" : ""}`}
                                                onClick={() => {
                                                    eventSetState(`${jsonKey}.children[${key}].props.style`, "column", "flexDirection");
                                                }}                                                
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                                                    <path fill="currentColor" d="M4.5 3.75v16.5a.75.75 0 0 1-1.5 0V3.75a.75.75 0 0 1 1.5 0M14.25 3a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 14.25 21h-4.5a2.25 2.25 0 0 1-2.25-2.25V5.25A2.25 2.25 0 0 1 9.75 3zM15 5.25a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0-.75.75V8.5h6zM9 14h6v-4H9zm0 1.5v3.25c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75V15.5zm12 4.75V3.75a.75.75 0 0 0-1.5 0v16.5a.75.75 0 0 0 1.5 0"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="border px-2 py-1 flex flex-wrap rounded justify-center mr-1 items-center w-full mt-1">
                                        <h1 className="w-2/6 py-1">align items</h1>
                                        <div className="w-4/6">
                                            <button 
                                                className={`border px-1 py-1 rounded text-sm hover:bg-gray-100 mr-1 ${props.style.alignItems === "start" ? "bg-gray-100" : ""}`}
                                                onClick={() => {
                                                    eventSetState(`${jsonKey}.children[${key}].props.style`, "start", "alignItems");
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                                                    <path fill="currentColor" d="M2.75 3a.75.75 0 0 0 0 1.5h18.5a.75.75 0 0 0 0-1.5zM4 8.25A2.25 2.25 0 0 1 6.25 6h2.5A2.25 2.25 0 0 1 11 8.25v10.5A2.25 2.25 0 0 1 8.75 21h-2.5A2.25 2.25 0 0 1 4 18.75zm2.25-.75a.75.75 0 0 0-.75.75v10.5c0 .414.336.75.75.75h2.5a.75.75 0 0 0 .75-.75V8.25a.75.75 0 0 0-.75-.75zm6.75.75A2.25 2.25 0 0 1 15.25 6h2.5A2.25 2.25 0 0 1 20 8.25v7a2.25 2.25 0 0 1-2.25 2.25h-2.5A2.25 2.25 0 0 1 13 15.25zm2.25-.75a.75.75 0 0 0-.75.75v7c0 .414.336.75.75.75h2.5a.75.75 0 0 0 .75-.75v-7a.75.75 0 0 0-.75-.75z"/>
                                                </svg>
                                            </button>
                                            <button 
                                                className={`border px-1 py-1 rounded text-sm hover:bg-gray-100 mr-1 ${props.style.alignItems === "center" ? "bg-gray-100" : ""}`}
                                                onClick={() => {
                                                    eventSetState(`${jsonKey}.children[${key}].props.style`, "center", "alignItems");
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                                                    <path fill="currentColor" d="M21.25 12.75a.75.75 0 0 0 0-1.5H20v-2.5a2.25 2.25 0 0 0-2.25-2.25h-2.5A2.25 2.25 0 0 0 13 8.75v2.5h-2v-4.5A2.25 2.25 0 0 0 8.75 4.5h-2.5A2.25 2.25 0 0 0 4 6.75v4.5H2.75a.75.75 0 0 0 0 1.5H4v4.5a2.25 2.25 0 0 0 2.25 2.25h2.5A2.25 2.25 0 0 0 11 17.25v-4.5h2v2.5a2.25 2.25 0 0 0 2.25 2.25h2.5A2.25 2.25 0 0 0 20 15.25v-2.5zm-2.75-4v6.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1-.75-.75v-6.5a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75m-9-2v10.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1-.75-.75V6.75A.75.75 0 0 1 6.25 6h2.5a.75.75 0 0 1 .75.75"/>
                                                </svg>
                                            </button>
                                            <button 
                                                className={`border px-1 py-1 rounded text-sm hover:bg-gray-100 mr-1 ${props.style.alignItems === "end" ? "bg-gray-100" : ""}`}
                                                onClick={() => {
                                                    eventSetState(`${jsonKey}.children[${key}].props.style`, "end", "alignItems");
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                                                    <path fill="currentColor" d="M2.75 21a.75.75 0 0 1 0-1.5h18.5a.75.75 0 0 1 0 1.5zM4 15.75A2.25 2.25 0 0 0 6.25 18h2.5A2.25 2.25 0 0 0 11 15.75V5.25A2.25 2.25 0 0 0 8.75 3h-2.5A2.25 2.25 0 0 0 4 5.25zm2.25.75a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75zm6.75-.75A2.25 2.25 0 0 0 15.25 18h2.5A2.25 2.25 0 0 0 20 15.75v-7a2.25 2.25 0 0 0-2.25-2.25h-2.5A2.25 2.25 0 0 0 13 8.75zm2.25.75a.75.75 0 0 1-.75-.75v-7a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v7a.75.75 0 0 1-.75.75z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </>
                            }
                            {type === "TEXT" && 
                                <>
                                    <div className="border px-2 py-1 rounded flex flex-wrap justify-center mr-1 items-center w-full mt-2">
                                        <h1 className="w-2/6 py-1">text align</h1>
                                        <div className="w-4/6">
                                            <button 
                                                className={`border px-1 py-1 rounded text-sm hover:bg-gray-100 mr-1 ${props.style.textAlign === "left" ? "bg-gray-100" : ""}`}
                                                onClick={() => {
                                                    eventSetState(`${jsonKey}.children[${key}].props.style`, "left", "textAlign");
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                                                    <path fill="currentColor" d="M3 2.75a.75.75 0 0 1 1.5 0v18.5a.75.75 0 0 1-1.5 0zM8.25 4A2.25 2.25 0 0 0 6 6.25v2.5A2.25 2.25 0 0 0 8.25 11h10.5A2.25 2.25 0 0 0 21 8.75v-2.5A2.25 2.25 0 0 0 18.75 4zM7.5 6.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75H8.25a.75.75 0 0 1-.75-.75zM8.25 13A2.25 2.25 0 0 0 6 15.25v2.5A2.25 2.25 0 0 0 8.25 20h7a2.25 2.25 0 0 0 2.25-2.25v-2.5A2.25 2.25 0 0 0 15.25 13zm-.75 2.25a.75.75 0 0 1 .75-.75h7a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75h-7a.75.75 0 0 1-.75-.75z"/>
                                                </svg>
                                            </button>
                                            <button 
                                                className={`border px-1 py-1 rounded text-sm hover:bg-gray-100 mr-1 ${props.style.textAlign === "center" ? "bg-gray-100" : ""}`}
                                                onClick={() => {
                                                    eventSetState(`${jsonKey}.children[${key}].props.style`, "center", "textAlign");
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                                                    <path fill="currentColor" d="M11.25 21.25V20h-2.5a2.25 2.25 0 0 1-2.25-2.25v-2.5A2.25 2.25 0 0 1 8.75 13h2.5v-2h-4.5A2.25 2.25 0 0 1 4.5 8.75v-2.5A2.25 2.25 0 0 1 6.75 4h4.5V2.75a.75.75 0 0 1 1.5 0V4h4.5a2.25 2.25 0 0 1 2.25 2.25v2.5A2.25 2.25 0 0 1 17.25 11h-4.5v2h2.5a2.25 2.25 0 0 1 2.25 2.25v2.5A2.25 2.25 0 0 1 15.25 20h-2.5v1.25a.75.75 0 0 1-1.5 0m4-2.75a.75.75 0 0 0 .75-.75v-2.5a.75.75 0 0 0-.75-.75h-6.5a.75.75 0 0 0-.75.75v2.5c0 .414.336.75.75.75zm2-9a.75.75 0 0 0 .75-.75v-2.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v2.5c0 .414.336.75.75.75z"/>
                                                </svg>
                                            </button>
                                            <button 
                                                className={`border px-1 py-1 rounded text-sm hover:bg-gray-100 mr-1 ${props.style.textAlign === "right" ? "bg-gray-100" : ""}`}
                                                onClick={() => {
                                                    eventSetState(`${jsonKey}.children[${key}].props.style`, "right", "textAlign");
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                                                    <path fill="currentColor" d="M21 2.75a.75.75 0 0 0-1.5 0v18.5a.75.75 0 0 0 1.5 0zM15.75 4A2.25 2.25 0 0 1 18 6.25v2.5A2.25 2.25 0 0 1 15.75 11H5.25A2.25 2.25 0 0 1 3 8.75v-2.5A2.25 2.25 0 0 1 5.25 4zm.75 2.25a.75.75 0 0 0-.75-.75H5.25a.75.75 0 0 0-.75.75v2.5c0 .414.336.75.75.75h10.5a.75.75 0 0 0 .75-.75zM15.75 13A2.25 2.25 0 0 1 18 15.25v2.5A2.25 2.25 0 0 1 15.75 20h-7a2.25 2.25 0 0 1-2.25-2.25v-2.5A2.25 2.25 0 0 1 8.75 13zm.75 2.25a.75.75 0 0 0-.75-.75h-7a.75.75 0 0 0-.75.75v2.5c0 .414.336.75.75.75h7a.75.75 0 0 0 .75-.75z"/>
                                                </svg>
                                            </button>
                                            <button 
                                                className={`border px-1 py-1 rounded text-sm hover:bg-gray-100 mr-1 ${props.style.textAlign === "justify" ? "bg-gray-100" : ""}`}
                                                onClick={() => {
                                                    eventSetState(`${jsonKey}.children[${key}].props.style`, "justify", "textAlign");
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                                                    <path fill="currentColor" d="M3.5 17.5a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-11a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1zm1 2.5A2.5 2.5 0 0 1 2 17.5v-11A2.5 2.5 0 0 1 4.5 4h1A2.5 2.5 0 0 1 8 6.5v11A2.5 2.5 0 0 1 5.5 20zm6-2.5a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-11a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1zm1 2.5A2.5 2.5 0 0 1 9 17.5v-11A2.5 2.5 0 0 1 11.5 4h1A2.5 2.5 0 0 1 15 6.5v11a2.5 2.5 0 0 1-2.5 2.5zm7-1.5a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1zm-2.5-1a2.5 2.5 0 0 0 2.5 2.5h1a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 19.5 4h-1A2.5 2.5 0 0 0 16 6.5z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <Input label="text decoration" value={props.style.textDecoration} onEvent={(e) => {eventSetState(`${jsonKey}.children[${key}].props.style`, e.target.value, "textDecoration");}}/>
                                    <Input label="font weight" value={props.style.fontWeight} onEvent={(e) => {eventSetState(`${jsonKey}.children[${key}].props.style`, e.target.value, "fontWeight");}}/>
                                    <Input label="font size" value={props.style.fontSize} onEvent={(e) => {eventSetState(`${jsonKey}.children[${key}].props.style`, e.target.value, "fontSize");}}/>
                                    <Input label="color" value={props.style.color} onEvent={(e) => {eventSetState(`${jsonKey}.children[${key}].props.style`, e.target.value, "color");}}/>
                                </>
                            }
                            <Input label="width" value={props.style.width} onEvent={(e) => {eventSetState(`${jsonKey}.children[${key}].props.style`, e.target.value, "width");}}/>
                            <Input label="height" value={props.style.height} onEvent={(e) => {eventSetState(`${jsonKey}.children[${key}].props.style`, e.target.value, "height");}}/>
                            <Input label="background color" value={props.style.backgroundColor} onEvent={(e) => {eventSetState(`${jsonKey}.children[${key}].props.style`, e.target.value, "backgroundColor");}}/>
                            <Input label="border" value={props.style.border} onEvent={(e) => {eventSetState(`${jsonKey}.children[${key}].props.style`, e.target.value, "border");}}/>
                            {/* <div className="border px-2 py-1 rounded flex flex-wrap justify-center mr-1 items-center w-full mt-1">
                                <h1 className="w-2/6 py-1">border</h1>
                                <div className="w-4/6">
                                    <input type="text" className="w-full border px-2 rounded" defaultValue={props.style.border.split(" ")[0]}/>
                                    <input type="color" className="w-full border px-2 rounded mt-1" defaultValue={props.style.height}/>
                                </div>
                            </div> */}
                            <Input label="border radius" value={props.style.borderRadius} onEvent={(e) => {eventSetState(`${jsonKey}.children[${key}].props.style`, e.target.value, "borderRadius");}}/>
                            <Input label="padding" value={props.style.padding} onEvent={(e) => {eventSetState(`${jsonKey}.children[${key}].props.style`, e.target.value, "padding");}}/>
                            <Input label="margin" value={props.style.margin} onEvent={(e) => {eventSetState(`${jsonKey}.children[${key}].props.style`, e.target.value, "margin");}}/>
                        </details>
                    </div>
                    <JsonRecursive object={props.children} state={state} setState={setState} jsonKey={`${jsonKey}.children[${key}].props`}/>
                </details>
            );
        });
    }

    if(object === undefined){
        return;
    }

    let { type, props } = object;

    return(
        <details className="px-1 py-2">
            <summary className="pb-2 capitalize cursor-pointer">
                {type.toLowerCase()}
                <ControllerElement state={state} setState={setState} jsonPath={`.props`} add={type !== "TEXT"}></ControllerElement>
            </summary>
            <JsonRecursive object={props.children} state={state} setState={setState} jsonKey={".props"}/>
        </details>
    );

}