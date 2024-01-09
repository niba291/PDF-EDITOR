// IMPORT==================================================================================================================
import { useState }                                                         from "react";
// COMPONENTS==============================================================================================================
import { View, JsonRecursive }                                              from "../components/View";

function App() {
 
    const [view, setView]                           = useState(false);
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
                <View state={jsonEditor} view={view}/>
            </div>
            <div className="md:w-1/2 w-full h-screen flex flex-wrap md:p-5 p-2 text-gray-800">
                <div className="border w-full p-2 rounded mb-2">
                    <button 
                        className="border px-1 py-1 rounded text-sm hover:bg-gray-100 mr-1 capitalize"
                        onClick={() => {
                            setView(!view)
                        }}
                    >
                        change
                    </button>
                </div>
                <div className="border h-[94%] w-full p-2 rounded flex flex-col overflow-auto">
                    <JsonRecursive object={jsonEditor} state={jsonEditor} setState={setJsonEditor} />
                </div>
            </div>
        </div>
    );
}

export default App;