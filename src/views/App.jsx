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
                "color"                             : "#595959",
            }
        }
    });

    return (
        <div className="container-fluid flex flex-wrap items-center">    
            <div className="md:w-1/2 mt-2 md:mt-0 w-full flex justify-center">
                <View state={jsonEditor}/>
            </div>
            <div className="md:w-1/2 w-full h-screen flex md:p-5 p-2 text-gray-800">
                <div className="border h-full w-full p-2 rounded flex flex-col overflow-auto">
                    <JsonRecursive object={jsonEditor} state={jsonEditor} setState={setJsonEditor} />
                </div>
            </div>
        </div>
    );
}

export default App;