// IMPORT==================================================================================================================
import { createElement }                                                        from "react";
import { Page, Text, View, Link, Document, Image, PDFViewer, Font, Canvas }     from "@react-pdf/renderer";
// COMPONENTS==============================================================================================================
// VARIABLES===============================================================================================================
const types             = {
    "PAGE"              : Page,
    "TEXT"              : Text,
    "VIEW"              : View,
    "LINK"              : Link,
    "DOCUMENT"          : Document,
    "IMAGE"             : Image,
    "PDFVIEWER"         : PDFViewer,
    "FONT"              : Font,
    "CANVAS"            : Canvas
};

Font.register({
    family              : "Open Sans",
    fonts               : [
        {
            src         : "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf" 
        },
        { 
            src         : "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf", 
            fontWeight  : 700 
        }
    ]
});
// FUNCTION================================================================================================================
export const serialize      = (element) => {
    const replacer = (key, value) => {
        switch (key) {
            case "_owner":
            case "_store":
            case "ref":
            case "key":
                return
            default:
                return value
        }
    }

    return JSON.stringify(element, replacer)
};

export const deserialize    = (view) => {

    const render            = (schema) => {
        
        if (schema === null) {
            return null;
        }                

        if (typeof schema === "string") {
            return schema;
        }
        
        const mapper        = (type) => {
            return type in types ? types[type] : type;
        };
    
        const isPlainObject = (maybe) => {
            return (
                maybe !== null &&
                typeof maybe === "object" &&
                Object.prototype.toString.call(maybe) === "[object Object]"
            );
        };
    
        if (!isPlainObject(schema)) {
            throw new Error("schema must be a string or a plain object");
        }
      
        if (!(schema.type && typeof schema.type === "string" && schema.type.trim() !== "")) {
            throw new Error("schema.type must be a non-empty string");
        }
      
        if (schema.props !== undefined && !isPlainObject(schema.props)) {
            throw new Error("schema.props must be a plain object");
        }
      
        let type            = schema.type.trim();
        let props           = schema.props || null;
        let children        = props.children && [].concat(props.children).map(render.bind(createElement));
    
        mapper && (type = mapper(type, props));
    
        return createElement.apply(createElement, [].concat([type, props]).concat(children));
    }
    
    return render(view);

};

