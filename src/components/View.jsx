
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
    console.log(state);
    return (
        // <PDFViewer className="w-full h-screen" style={{backgroundColor: "white"}}>
        //     <Document>
        //         {deserialize(state)}
        //     </Document>
        // </PDFViewer>
        <section className="border mx-2 w-[595px] h-[842px] overflow-hidden">
            {/* {deserialize(JSON.parse(JSON.stringify(state).replace(/VIEW/g, "div").replace(/TEXT/g, "p").replace(/PAGE/g, "section").replace(/IMAGE/g, "img")))} */}
        </section>
    );
}

export function JsonRecursive({object, jsonKey, state, setState}) {

    if(typeof(object) === "string"){
        return(
            <article className="w-full flex flex-wrap border border-t-0 rounded-b py-2 px-2">
                <span className="w-1/6 px-2 py-1">
                    Valor
                </span>
                <input className="w-5/6 px-2 py-1 border rounded shadow-sm" value={object} onInput={(e) => {
                    jp.apply(state, `$${jsonKey}.children`, () => {
                        return e.target.value;
                    });
                    setState({...state});
                }}/>
            </article>
        );
    }

    if(Array.isArray(object)){                    
        
        return object.map(({type, props}, key) => {

            if(type === undefined){
                return;
            }

            return(
                <details className="border-l ml-4 px-2 py-2 cursor-pointer" key={key}>
                    <summary className="pb-2 capitalize border px-2 py-2 rounded-t">
                        {type.toLowerCase()}
                        {type !== "TEXT" && <button type="button" className="border px-2 py-1 rounded float-end text-sm -mt-[0.18rem] hover:bg-gray-50">Añadir elemento</button>}
                    </summary>
                    <article className="w-full flex flex-wrap border border-t-0 py-2 px-2 flex-col">
                        {Object.keys(props).map((item, keyProps) => {

                            if(item === "children"){
                                return;
                            }

                            return (
                                <details key={keyProps} className="pt-1">
                                    <summary>{item}</summary>
                                    {Object.keys(props[item]).map((itemValue, keyValue) => {
                                        return (
                                            <article className="w-full flex flex-wrap pt-2" key={keyValue}>
                                                <span className="w-1/6 px-2 py-1">
                                                    {itemValue}
                                                </span>
                                                <input className="w-5/6 px-2 py-1 border rounded shadow-sm" value={props[item][itemValue]} onInput={(e) => {
                                                    console.log(`$${jsonKey}.children[${key}].props.${item}.${itemValue}`);
                                                    jp.apply(state, `$${jsonKey}.children[${key}].props.${item}.${itemValue}`, () => {
                                                        return (!isNaN(e.target.value.trim()) && e.target.value.trim() !== "" ? parseInt(e.target.value) : e.target.value);
                                                    });
                                                    setState({...state});
                                                }}/>
                                            </article>
                                        );
                                    })}
                                </details>
                            );
                        })}
                    </article>
                    <JsonRecursive object={props.children} state={state} setState={setState} jsonKey={`${jsonKey}.children[${key}].props`}/>
                </details>
            );
        });
    }

    let { type, props } = object;

    return(
        <details className="px-1 py-2 cursor-pointer">
            <summary className="pb-2 capitalize">{type.toLowerCase()}</summary>
            <JsonRecursive object={props.children} state={state} setState={setState} jsonKey={".props"}/>
        </details>
    );

}