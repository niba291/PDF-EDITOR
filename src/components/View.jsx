
// IMPORT==================================================================================================================
import { useState, useEffect, Fragment }                                        from "react";
import jp                                                                       from "jsonpath";
// ASSETS==================================================================================================================
import { serialize, deserialize }                                               from "../assets/utils";
// COMPONENTS==============================================================================================================
import { PDFViewer, Document }                                                  from "@react-pdf/renderer";
// RENDER==================================================================================================================
export function View({state}) {
    // VARIABLES===========================================================================================================    
    return (
        <PDFViewer className="w-full h-screen" style={{backgroundColor: "white"}}>
            <Document>
                {deserialize(state)}
            </Document>
        </PDFViewer>
    );
}

export function JsonRecursive({object, jsonKey}) {

    if(typeof(object) === "string"){
        return(
            <article className="w-full flex flex-wrap border py-2 px-2">
                <span className="w-1/6 px-2 py-1">
                    Valor
                </span>
                <input className="w-5/6 px-2 py-1 border rounded shadow-sm" defaultValue={object} onInput={(e) => {
                    jp.apply(jsonEditor, `$${jsonKey}.children`, () => {
                        return e.target.value;
                    });
                    setJsonEditor({...jsonEditor});
                }}/>
            </article>
        );
    }

    if(Array.isArray(object)){            
        return object.map(({type, props}, key) => {
            return(
                <details className="border-l ml-4 px-2 py-2 cursor-pointer" key={key}>
                    <summary className="pb-2 capitalize border px-2 py-2 rounded">{type.toLowerCase()}</summary>
                    <JsonRecursive object={props.children} jsonKey={`${jsonKey}.children[${key}].props`}/>
                </details>
            );
        });
    }

    let { type, props } = object;

    return(
        <details className="px-1 py-2 cursor-pointer">
            <summary className="pb-2 capitalize">{type.toLowerCase()}</summary>
            <JsonRecursive object={props.children} jsonKey={".props"}/>
        </details>
    );

}